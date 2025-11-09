import { NextResponse } from "next/server";
import { z } from "zod";
import { headers } from "next/headers";
import { getSessionUser } from "@/lib/auth";
import query from "@/lib/query";
import { createProjectSchema } from "@/lib/validation";
import db from "@/lib/db";
import { project } from "@/lib/schema";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: teamId } = await params;

    const projects = await query.projects.getProjectsByTeamId(teamId);

    return NextResponse.json({ projects });
  } catch (err) {
    // TODO: Log error to Sentry
    return NextResponse.json(
      { error: "Internal Server Error" },
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
    const { name } = await request.json();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const validation = createProjectSchema.safeParse({ name });

    if (!validation.success) {
      return NextResponse.json(
        { errors: z.treeifyError(validation.error).properties },
        { status: 400 }
      );
    }

    await db.insert(project).values({
      name,
      teamId,
    });

    return NextResponse.json({});
  } catch (err) {
    // TODO: Log error to Sentry
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
