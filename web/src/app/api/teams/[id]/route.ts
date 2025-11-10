import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { team } from "@/lib/schema";
import { userInTeam } from "@/lib/user";
import db from "@/lib/db";

export async function DELETE(
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

    await db.delete(team).where(eq(team.id, teamId));

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
