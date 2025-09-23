"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function UserButton() {
  const router = useRouter();
  return (
    <div>
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
    </div>
  );
}
