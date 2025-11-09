import { count, eq, asc } from "drizzle-orm";
import { team, teamMember, project, task, idea } from "./schema";
import db from "./db";

const query = {
  teams: {
    getTeams: async (userId: string) =>
      await db
        .select({
          id: team.id,
          name: team.name,
          description: team.description,
          createdAt: team.createdAt,
          updatedAt: team.updatedAt,
          displayImage: team.displayImage,
          projectCount: count(project.id),
          memberCount: count(teamMember.userId),
        })
        .from(team)
        .leftJoin(teamMember, eq(team.id, teamMember.teamId))
        .leftJoin(project, eq(team.id, project.teamId))
        .where(eq(teamMember.userId, userId))
        .groupBy(team.id, project.id, teamMember.userId),
    createTeam: async (name: string, description: string, ownerId: string) =>
      await db.transaction(async (tx) => {
        const [teamData] = await tx
          .insert(team)
          .values({
            name,
            description,
          })
          .returning();

        await tx.insert(teamMember).values({
          teamId: teamData.id,
          userId: ownerId,
          role: "owner",
        });

        return teamData;
      }),
  },
  ideas: {
    getIdeasByTeamId: async (teamId: string) =>
      await db
        .select()
        .from(idea)
        .where(eq(idea.teamId, teamId))
        .orderBy(asc(idea.createdAt)),
  },
  projects: {
    getProjectsByTeamId: async (teamId: string) =>
      await db
        .select({
          id: project.id,
          name: project.name,
          description: project.description,
          priority: project.priority,
          dueDate: project.dueDate,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          taskCount: count(task.id),
        })
        .from(project)
        .where(eq(project.teamId, teamId))
        .leftJoin(task, eq(project.id, task.projectId))
        .groupBy(project.id, task.id)
        .orderBy(asc(project.createdAt)),
  },
};

export default query;
