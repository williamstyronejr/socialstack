"use client";

import { useState } from "react";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
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
import { createTeamSchema } from "@/lib/validation";

export default function CreateTeam() {
  const [open, setOpen] = useState(false);
  const { data, mutate: createTeam } = useMutation({
    mutationFn: async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      const formData = new FormData(evt.target as HTMLFormElement);
      const data = Object.fromEntries(formData);
      const validationResult = createTeamSchema.safeParse(data);

      if (!validationResult.success) {
        // console.log(z.treeifyError(validationResult.error));
        console.log(z.treeifyError(validationResult.error).properties);

        return {
          errors: z.treeifyError(validationResult.error).properties,
        };
      }

      const res = await fetch("/api/teams", {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const result = await res.json();

          return {
            errors: result.errors,
          };
        }

        throw new Error("Failed to create team");
      }

      return {
        success: true,
      };
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ["teams"] });
    },
    onSuccess: () => {
      setOpen(false);
    },
    onError: () => {
      toast.error("An unknown error occurred.");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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

        <form onSubmit={createTeam}>
          <div>
            <div className="flex flex-col gap-4 pb-4">
              <div>
                <Input
                  name="name"
                  type="text"
                  placeholder="Team Name"
                  error={data ? data.errors?.name?.errors : undefined}
                />
              </div>

              <div>
                <Textarea
                  name="description"
                  placeholder="Description"
                  className="h-24"
                />
              </div>
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
