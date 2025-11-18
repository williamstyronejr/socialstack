import { redirect } from "next/navigation";
import { headers } from "next/headers";
import query from "@/lib/query";
import { getSessionUser } from "@/lib/auth";
import UpdateTeamForm from "./UpdateTeamForm";
import DeleteForms from "./DeleteForms";
import TransferForm from "./TransferForm";

async function getData(teamId: string) {
  const user = await getSessionUser(await headers());

  const team = await query.teams.getTeamById(teamId);

  if (!team) return redirect("/dashboard");
  return {
    team,
  };
}

export default async function TeamSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: teamId } = await params;
  const { team } = await getData(teamId);

  return (
    <section>
      <header className="mb-4 bg-white p-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold">Team Settings</h1>
      </header>

      <div className="bg-white p-4 rounded-md mx-6">
        <UpdateTeamForm teamId={teamId} team={team} />

        <div>
          <h2 className="text-2xl font-bold">Team</h2>

          <TransferForm teamId={teamId} />
          <DeleteForms teamId={teamId} />
        </div>
      </div>
    </section>
  );
}
