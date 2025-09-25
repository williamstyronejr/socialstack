"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { type User } from "better-auth";
import { signOut } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export default function UserButton({ user }: { user: User }) {
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="w-full flex gap-2 items-center hover:bg-gray-100 p-2 rounded-md cursor-pointer">
          <div className="w-6 h-6 rounded-full bg-gray-200 relative">
            <Image
              src={user.image || ""}
              alt={user.name}
              fill
              className="rounded-full"
            />
          </div>
          <div>{user.name}</div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="start" side="right">
        <DropdownMenuItem>
          <Link href="/dashboard/settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <button
            type="button"
            className="cursor-pointer"
            onClick={async () =>
              await signOut({
                fetchOptions: {
                  onSuccess: () => {
                    router.push("/");
                  },
                },
              })
            }
          >
            Sign Out
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
