"use client";

import { InferSelectModel } from "drizzle-orm";
import { useQuery } from "@tanstack/react-query";
import { project } from "@/lib/schema";

type Project = InferSelectModel<typeof project> & {
  taskCount: number;
};

/**
 * Priority: none, low, medium, high
 * due date
 * status
 * order: (stored order in db that users changes by dragging)
 * task completions (0/10)
 */

function ProjectListView({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.length === 0 ? (
        <div className="text-center text-gray-500 col-span-full text-lg font-medium">
          No projects found
        </div>
      ) : null}

      {projects.map((project) => (
        <div key={project.id} className="flex items-center justify-between">
          <div>
            {project.name}
            {project.priority !== "none" ? (
              <span className="text-sm text-gray-500">{project.priority}</span>
            ) : null}
            {project.dueDate ? (
              <span className="text-sm text-gray-500">
                {new Date(project.dueDate).toLocaleDateString()}
              </span>
            ) : null}
            {project.taskCount} tasks
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ProjectList({
  initialProjects,
  teamId,
}: {
  initialProjects: Project[];
  teamId: string;
}) {
  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await fetch(`/api/teams/${teamId}/projects`);
      return (await res.json()).projects as Project[];
    },
    initialData: initialProjects,
  });

  return (
    <div className="">
      <ProjectListView projects={projects} />
    </div>
  );
}
