import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import db from "@/lib/db";
import { getSessionUser } from "@/lib/auth";
import { idea, project } from "@/lib/schema";
import { userInTeam } from "@/lib/user";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getSessionUser(await headers());
    const { id: teamId } = await params;

    if (!user || !(await userInTeam(teamId, user.id))) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    await db.transaction(async (tx) => {
      await Promise.allSettled([
        tx.delete(idea).where(eq(idea.teamId, teamId)),
        tx.delete(project).where(eq(project.teamId, teamId)),
      ]);
    });

    return NextResponse.json({});
  } catch (err) {
    // TODO: Log error to Sentry
    return NextResponse.json(
      {
        error: "An unexpected error occurred.",
      },
      { status: 500 }
    );
  }
}
