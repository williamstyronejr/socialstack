import { headers } from "next/headers";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    teamId: string;
  };
}) {
  const headersList = await headers();
  const { teamId } = await params;
  const user = await getSessionUser(headersList);

  if (!user) return redirect("/signin");

  return (
    <SidebarProvider>
      <main className="flex flex-row w-full">
        <AppSidebar user={user} teamId={teamId} />

        <div className="bg-gray-100 grow">{children}</div>
      </main>
    </SidebarProvider>
  );
}
