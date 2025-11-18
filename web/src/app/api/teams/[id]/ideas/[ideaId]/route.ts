import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { userInTeam } from "@/lib/user";
import { updateIdeaSchema } from "@/lib/validation";
import db from "@/lib/db";
import { idea } from "@/lib/schema";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string; ideaId: string }> }
) {
  try {
    const { id: teamId, ideaId } = await params;
    const user = await getSessionUser(await headers());

    if (!user || !(await userInTeam(teamId, user.id))) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const validation = updateIdeaSchema.safeParse(await request.json());

    if (!validation.success) {
      return NextResponse.json(
        { errors: z.treeifyError(validation.error).properties },
        { status: 400 }
      );
    }

    await db.update(idea).set(validation.data).where(eq(idea.id, ideaId));

    return NextResponse.json({});
  } catch (err) {
    // TODO: Log error to Sentry
    return NextResponse.json(
      {
        error: "An unknown error occurred.",
      },
      { status: 500 }
    );
  }
}
