import z from "zod";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getSessionUser } from "@/lib/auth";
import query from "@/lib/query";
import { createTeamSchema } from "@/lib/validation";

export async function GET(request: Request) {
  try {
    const user = await getSessionUser(await headers());

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const teams = await query.teams.getTeams(user.id);

    return NextResponse.json({ teams });
  } catch (err) {
    // TODO: Log error to Sentry
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getSessionUser(await headers());
    const { name, description } = await request.json();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const validation = createTeamSchema.safeParse({ name, description });

    if (!validation.success) {
      return NextResponse.json(
        { errors: z.treeifyError(validation.error).properties },
        { status: 400 }
      );
    }

    const team = await query.teams.createTeam(name, description, user.id);

    return NextResponse.json({ team });
  } catch (err) {
    // TODO: Log error to Sentry
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
