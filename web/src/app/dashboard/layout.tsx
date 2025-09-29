import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import UserButton from "@/components/UserButton";
import { getSessionUser } from "@/lib/auth";
import NavMenu from "@/components/NavMenu";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSessionUser(await headers());

  if (!user) return redirect("/signin");

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold">SocialStack</h1>

          <div className="">
            <NavMenu>
              <div className="flex md:flex-row flex-col items-center gap-4 h-full">
                <Link href="/dashboard">Teams</Link>
                <Link href="/dashboard/settings">Settings</Link>

                <div className="grow" />
                <UserButton user={user} />
              </div>
            </NavMenu>
          </div>
        </div>
      </header>

      <main className="bg-gray-100">{children}</main>
    </>
  );
}
