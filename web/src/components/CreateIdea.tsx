"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { createIdeaSchema } from "@/lib/validation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function CreateIdea({ teamId }: { teamId: string }) {
  const [open, setOpen] = useState(false);
  const { data, mutate: createIdea } = useMutation({
    mutationFn: async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const formData = new FormData(evt.target as HTMLFormElement);
      const validation = createIdeaSchema.safeParse(
        Object.fromEntries(formData)
      );

      if (!validation.success) {
        return {
          errors: z.treeifyError(validation.error).properties,
        };
      }

      const res = await fetch(`/api/teams/${teamId}/ideas`, {
        method: "POST",
        body: JSON.stringify(validation.data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          return {
            errors: (await res.json()).errors,
          };
        }

        throw new Error("Failed to create idea");
      }

      return {};
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ["ideas"] });
    },
    onSuccess: (data) => {
      if (data?.errors) return;
      setOpen(false);
    },
    onError: () => {
      toast.error("An unexpected error occurred.");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
        Create Idea
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Idea</DialogTitle>
          <DialogDescription>
            Create a new idea to get started
          </DialogDescription>

          <form onSubmit={createIdea}>
            <div>
              <Input
                name="name"
                type="text"
                placeholder="Idea Name"
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

            <div>
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 cursor-pointer"
              >
                Create Idea
              </button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
