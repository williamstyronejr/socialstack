"use client";

import Link from "next/link";
import Image from "next/image";
import { InferSelectModel } from "drizzle-orm";
import { team } from "@/lib/schema";
import { useQuery } from "@tanstack/react-query";

type Team = InferSelectModel<typeof team> & {
  memberCount: number;
  projectCount: number;
};

export default function TeamList({ initialTeams }: { initialTeams: Team[] }) {
  const { data: teams } = useQuery({
    queryKey: ["teams"],
    queryFn: async () => {
      const res = await fetch("/api/teams");
      if (!res.ok) {
        throw new Error("Failed to fetch teams");
      }
      return (await res.json()).teams as Team[];
    },
    initialData: initialTeams,
  });

  return (
    <>
      {teams.map((team) => (
        <div
          key={team.id}
          className="bg-white p-4 rounded-md shadow-md group border border-gray-200 hover:border-primary transition-all duration-300"
        >
          <Link href={`/teams/${team.id}`}>
            <div className="flex flex-row items-center gap-2 group-hover:text-primary">
              <div className="w-10 h-10 rounded-full bg-gray-300 relative">
                <Image
                  src={team.displayImage}
                  alt={team.name}
                  fill
                  className="rounded-full"
                />
              </div>
              <div className="text-lg font-bold grow group-hover:text-primary">
                {team.name}
              </div>
            </div>

            <div className="text-gray-500 pt-2 pb-4">{team.description}</div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Members</span>
                <span className="font-medium">{team.memberCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Upcoming Posts</span>
                <span className="font-medium">{team.projectCount}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Started</span>
                <span className="font-medium">
                  {new Date(team.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </>
  );
}
