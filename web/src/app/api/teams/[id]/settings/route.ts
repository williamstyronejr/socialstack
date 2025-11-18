import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { updateTeamSchema } from "@/lib/validation";
import z from "zod";
import { userInTeam } from "@/lib/user";
import db from "@/lib/db";
import { team } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  },
) {
  try {
    const { id: teamId } = await params;
    const user = await getSessionUser(await headers());
    const validation = updateTeamSchema.safeParse(await request.json());

    if (!validation.success) {
      return NextResponse.json(
        {
          errors: z.treeifyError(validation.error).errors,
        },
        { status: 400 },
      );
    }

    if (!user || !(await userInTeam(teamId, user.id))) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    await db.update(team).set(validation.data).where(eq(team.id, teamId));

    return NextResponse.json({});
  } catch (err) {
    // TODO: Log error to Sentry
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 },
    );
  }
}
