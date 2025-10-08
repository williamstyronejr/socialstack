"use client";

import ConfirmationDialog from "@/components/ConfirmationDialog";
import { Button } from "@/components/ui/button";
import { deleteUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  return (
    <section className="">
      <header className="mb-4 bg-white p-4 border-b border-gray-200">
        <h1 className="text-3xl font-bold">Account Settings</h1>
      </header>

      <div className="bg-white p-4 rounded-md mx-6">
        <div>
          <h2 className="text-2xl font-bold">Account</h2>

          <div>
            <div className="pb-4">
              <div>Delete Account</div>
              <div className="text-gray-500 text-sm">
                Delete your account and all associated data.
              </div>
            </div>

            <ConfirmationDialog
              title="Delete Account"
              confirmationText="Delete Account"
              onConfirm={async () => {
                await deleteUser();
                router.push("/");
              }}
            >
              <Button variant="destructive">Delete Account</Button>
            </ConfirmationDialog>
          </div>
        </div>
      </div>
    </section>
  );
}
