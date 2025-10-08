"use client";

import { useState } from "react";
import MenuIcon from "./icons/MenuIcon";
import {
  Sidebar,
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
  SidebarMenu,
} from "./ui/sidebar";

export default function NavMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="">
      <nav className="hidden md:flex items-center justify-between gap-4">
        {children}
      </nav>

      <button
        className="block md:hidden relative cursor-pointer size-6 z-20"
        onClick={() => setIsOpen(!isOpen)}
      >
        <MenuIcon className="size-6" />
      </button>

      <div
        className={`md:hidden bg-white h-screen px-8 pt-20 pb-6 z-10 absolute top-0 right-0 ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
