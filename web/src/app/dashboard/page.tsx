import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { getSessionUser } from "@/lib/auth";
import CreateTeam from "@/components/CreateTeam";

export async function getData() {
  const user = await getSessionUser(await headers());

  return {
    teams: [
      {
        id: "1",
        name: "Team 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
        image: user?.image,
        memberCount: 4,
        upcomingProjects: 2,
        description: "Team 1 description",
      },
      {
        id: "2",
        name: "Team 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
        image: user?.image,
        memberCount: 4,
        upcomingProjects: 2,
        description: "Team 1 description",
      },
      {
        id: "3",
        name: "Team 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
        image: user?.image,
        memberCount: 4,
        upcomingProjects: 2,
        description: "Team 1 description",
      },
      {
        id: "4",
        name: "Team 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
        image: user?.image,
        memberCount: 4,
        upcomingProjects: 2,
        description: "Team 1 description",
      },
      {
        id: "5",
        name: "Team 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
        image: user?.image,
        memberCount: 4,
        upcomingProjects: 2,
        description: "Team 1 description",
      },
      {
        id: "6",
        name: "Team 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
        image: user?.image,
        memberCount: 4,
        upcomingProjects: 2,
        description: "Team 1 description",
      },
      {
        id: "7",
        name: "Team 1",
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
        image: user?.image,
        memberCount: 4,
        upcomingProjects: 2,
        description: "Team 1 description",
      },
    ],
  };
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

        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-white p-4 rounded-md shadow-md group border border-gray-200 hover:border-primary transition-all duration-300"
          >
            <Link href={`/teams/${team.id}`}>
              <div className="flex flex-row items-center gap-2 group-hover:text-primary">
                <div className="w-10 h-10 rounded-full bg-gray-300 relative">
                  <Image
                    src={team.image}
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
                  <span className="font-medium">{team.upcomingProjects}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Started</span>
                  <span className="font-medium">
                    {team.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
