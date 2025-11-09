import { NextResponse } from "next/server";
import { headers } from "next/headers";
import z from "zod";
import { getSessionUser } from "@/lib/auth";
import { userInTeam } from "@/lib/user";
import query from "@/lib/query";
import { createIdeaSchema } from "@/lib/validation";
import db from "@/lib/db";
import { idea } from "@/lib/schema";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: teamId } = await params;
    const user = await getSessionUser(await headers());

    if (!user || !(await userInTeam(teamId, user.id)))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const ideas = await query.ideas.getIdeasByTeamId(teamId);

    return NextResponse.json({ ideas });
  } catch (err) {
    // TODO: Log error to Sentry
    return NextResponse.json(
      { error: "An unknown error occurred." },
      { status: 500 }
    );
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: teamId } = await params;
    const user = await getSessionUser(await headers());

    if (!user || !(await userInTeam(teamId, user.id)))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const validation = createIdeaSchema.safeParse(await request.json());

    if (!validation.success) {
      return NextResponse.json(
        {
          errors: z.treeifyError(validation.error).properties,
        },
        { status: 400 }
      );
    }

    await db.insert(idea).values({
      name: validation.data.name,
      description: validation.data.description,
      teamId,
      creatorId: user.id,
    });

    return NextResponse.json({});
  } catch (err) {
    // TODO: Log error to Sentry
    console.log(err);
    return NextResponse.json(
      {
        error: "An unknown error occurred",
      },
      { status: 500 }
    );
  }
}
