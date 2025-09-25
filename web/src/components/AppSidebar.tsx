import { type User } from "better-auth";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
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
    url: "/",
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
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarFooter>
          <UserButton user={user} />
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
