"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import z from "zod";
import { toast } from "react-toastify";
import { createProjectSchema } from "@/lib/validation";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function CreateProject({ teamId }: { teamId: string }) {
  const [open, setOpen] = useState(false);

  const { data, mutate: createProject } = useMutation({
    mutationFn: async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();
      const formData = new FormData(evt.target as HTMLFormElement);
      const data = Object.fromEntries(formData);
      const validationResult = createProjectSchema.safeParse(data);

      if (!validationResult.success) {
        return {
          errors: z.treeifyError(validationResult.error).properties,
        };
      }

      const res = await fetch(`/api/teams/${teamId}/projects`, {
        method: "POST",
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to create project");
      }
    },
    onSettled: (data, error, variables, onMutateResult, context) => {
      context.client.invalidateQueries({ queryKey: ["projects"] });
    },
    onSuccess: (data) => {
      if (data?.errors) return;
      setOpen(false);
    },
    onError: (error) => {
      toast.error("An unknown error occurred.");
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          Create New Project
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Project</DialogTitle>
          <DialogDescription>
            Create a new project to get started
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={createProject}>
          <div>
            <Input
              name="name"
              type="text"
              placeholder="Project Name"
              error={data ? data.errors?.name?.errors : undefined}
            />
          </div>

          <div>
            <button
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 cursor-pointer"
              type="submit"
            >
              Create Project
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
