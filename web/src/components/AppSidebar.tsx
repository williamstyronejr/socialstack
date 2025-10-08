"use client";

import { type User } from "better-auth";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Calendar, Home, Inbox, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import UserButton from "./UserButton";

// Menu items.
const items = [
  {
    title: "Teams",
    url: "",
    icon: Home,
  },
  {
    title: "Projects",
    url: "/projects",
    icon: Inbox,
  },
  {
    title: "Ideas",
    url: "/ideas",
    icon: Calendar,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export default function AppSidebar({
  user,
  teamId,
}: {
  user: User;
  teamId: string;
}) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="px-4 py-2">
        <SidebarHeader>
          <Link href="/dashboard" className="text-2xl font-bold">
            SocialStack
          </Link>
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={`/teams/${teamId}${item.url}`}
                      data-active={pathname === `/teams/${teamId}${item.url}`}
                      className="data-[active=true]:bg-gray-200 px-2 py-1"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserButton user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
