"use client";
import { InferSelectModel } from "drizzle-orm";
import { useQuery } from "@tanstack/react-query";
import { idea } from "@/lib/schema";

type Idea = InferSelectModel<typeof idea>;

export default function IdeaList({
  initialIdeas,
  teamId,
}: {
  initialIdeas: Idea[];
  teamId: string;
}) {
  const { data: ideas } = useQuery({
    queryKey: ["ideas"],
    queryFn: async () => {
      const res = await fetch(`/api/teams/${teamId}/ideas`);

      if (!res.ok) return [];

      return (await res.json()).ideas as Idea[];
    },
    initialData: initialIdeas,
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {ideas.length === 0 ? (
        <div className="text-center text-gray-500 col-span-full text-lg font-medium">
          No ideas found
        </div>
      ) : null}

      {ideas.map((idea) => (
        <div key={idea.id}>{idea.name}</div>
      ))}
    </div>
  );
}
