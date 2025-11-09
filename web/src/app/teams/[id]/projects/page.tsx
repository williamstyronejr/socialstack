import { headers } from "next/headers";
import { redirect } from "next/navigation";
import query from "@/lib/query";
import { getSessionUser } from "@/lib/auth";
import ProjectList from "./ProjectList";
import CreateProject from "@/components/CreateProject";

async function getData(teamId: string) {
  const user = await getSessionUser(await headers());

  if (!user) redirect("/signin");

  const projects = await query.projects.getProjectsByTeamId(teamId);

  return { projects };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: teamId } = await params;
  const { projects } = await getData(teamId);

  return (
    <section>
      <header className="mb-4 bg-white p-4 border-b border-gray-200 flex flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">Projects</h1>

        <CreateProject teamId={teamId} />
      </header>

      <div className="bg-white p-4 rounded-md mx-6">
        <div>
          <h2 className="text-2xl font-bold">Projects</h2>
        </div>

        <ProjectList initialProjects={projects} teamId={teamId} />
      </div>
    </section>
  );
}
