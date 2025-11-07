import { count, eq } from "drizzle-orm";
import { team, teamMember, project } from "./schema";
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
};

export default query;
