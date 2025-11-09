import { headers } from "next/headers";
import { redirect } from "next/navigation";
import query from "@/lib/query";
import { getSessionUser } from "@/lib/auth";
import IdeaList from "./IdeaList";
import CreateIdea from "@/components/CreateIdea";

async function getData(teamId: string) {
  const user = await getSessionUser(await headers());

  if (!user) redirect("/signin");

  const ideas = await query.ideas.getIdeasByTeamId(teamId);

  return { ideas };
}

export default async function IdeasPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: teamId } = await params;
  const { ideas } = await getData(teamId);

  return (
    <section>
      <header className="flex flex-row justify-between items-center mb-4 bg-white p-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold">Ideas</h1>

        <CreateIdea teamId={teamId} />
      </header>

      <div className="bg-white p-4 rounded-md mx-6">
        <IdeaList initialIdeas={ideas} teamId={teamId} />
      </div>
    </section>
  );
}
