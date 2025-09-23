import { headers } from "next/headers";
import UserButton from "@/components/UserButton";
import { getSessionUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headersList = await headers();
  const user = await getSessionUser(headersList);

  if (!user) return redirect("/signin");

  return (
    <div>
      <div>
        <h1>Dashboard</h1>

        <UserButton />
      </div>

      <div>{children}</div>
    </div>
  );
}
