import DeleteForms from "./DeleteForms";

export default async function TeamSettingsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: teamId } = await params;

  return (
    <section>
      <header className="mb-4 bg-white p-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold">Team Settings</h1>
      </header>

      <div className="bg-white p-4 rounded-md mx-6">
        <div>
          <h2 className="text-2xl font-bold">Team</h2>
        </div>

        <div>
          <h2 className="text-2xl font-bold">Team</h2>
        </div>

        <div>
          <h2 className="text-2xl font-bold"></h2>

          <DeleteForms teamId={teamId} />
        </div>
      </div>
    </section>
  );
}
