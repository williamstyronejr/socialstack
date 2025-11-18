import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { getSessionUser } from "@/lib/auth";
import { userInTeam } from "@/lib/user";
import db from "@/lib/db";
import { teamMember } from "@/lib/schema";
import z from "zod";

const schema = z.object({
  newOwner: z.string(),
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: teamId } = await params;
    const user = await getSessionUser(await headers());

    if (!user || !(await userInTeam(teamId, user.id))) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }

    const validation = schema.safeParse(await request.json());
    if (!validation.success) {
      return NextResponse.json(
        {
          error: "An unexpected error occurred.",
        },
        { status: 500 },
      );
    }

    await db.transaction(async (tx) => {
      await tx
        .update(teamMember)
        .set({ role: "member" })
        .where(
          and(eq(teamMember.userId, user.id), eq(teamMember.teamId, teamId)),
        );

      await tx
        .update(teamMember)
        .set({ role: "owner" })
        .where(
          and(
            eq(teamMember.userId, validation.data.newOwner),
            eq(teamMember.teamId, teamId),
          ),
        );
    });

    return NextResponse.json({});
  } catch (err) {
    // TODO: Log error
    return NextResponse.json(
      {
        error: "An unexpected error occurred.",
      },
      {
        status: 500,
      },
    );
  }
}
