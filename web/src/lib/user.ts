import db from "./db";
import { and, eq } from "drizzle-orm";
import { teamMember } from "./schema";

export async function userInTeam(teamId: string, userId: string) {
  const member = await db.query.teamMember.findFirst({
    where: and(eq(teamMember.teamId, teamId), eq(teamMember.userId, userId)),
  });

  return !!member;
}
