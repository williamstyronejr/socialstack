import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/auth";
import query from "@/lib/query";
import CreateTeam from "@/components/CreateTeam";
import TeamList from "./TeamList";

export async function getData() {
  const user = await getSessionUser(await headers());

  if (!user) redirect("/signin");

  const teams = await query.teams.getTeams(user.id);

  return { teams };
}

export default async function DashboardPage() {
  const { teams } = await getData();

  return (
    <section className="container px-4 md:px-6 max-w-7xl mx-auto">
      <header className="mb-4 flex flex-row justify-between items-center py-8">
        <h1 className="text-3xl font-bold">Your Teams</h1>

        <CreateTeam />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-4">
        {teams.length === 0 && (
          <div className="text-center text-gray-500">No teams found</div>
        )}

        <TeamList initialTeams={teams} />
      </div>
    </section>
  );
}
