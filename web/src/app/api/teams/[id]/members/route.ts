import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getSessionUser } from "@/lib/auth";
import { userInTeam } from "@/lib/user";
import query from "@/lib/query";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: teamId } = await params;
    const user = await getSessionUser(await headers());

    if (!user || !userInTeam(teamId, user.id)) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 },
      );
    }

    const members = await query.members.getByTeamId(teamId);

    return NextResponse.json({
      members,
    });
  } catch (err) {
    // TODO: Log error
    return NextResponse.json(
      {
        error: "An Unexpected error occurred.",
      },
      { status: 500 },
    );
  }
}
