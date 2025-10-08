"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function CreateTeam() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Team created");
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          Create New Team
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Team</DialogTitle>
          <DialogDescription>
            Create a new team to get started
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="flex flex-col gap-4 pb-4">
              <Input name="team" type="text" placeholder="Team Name" />

              <Textarea
                name="description"
                placeholder="Description"
                className="h-24"
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 cursor-pointer"
              >
                Create Team
              </button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
