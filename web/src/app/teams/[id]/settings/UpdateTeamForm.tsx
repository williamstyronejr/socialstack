"use client";

import z from "zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateTeamSchema } from "@/lib/validation";

type Team = {
  id: string;
  name: string;
  description?: string;
};

export default function UpdateTeamForm({
  teamId,
  team,
}: {
  teamId: string;
  team: Team;
}) {
  const { data, mutate: updateTeam } = useMutation({
    mutationFn: async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const formData = new FormData(evt.target as HTMLFormElement);
      const params = Object.fromEntries(formData);
      const validation = updateTeamSchema.safeParse(params);

      if (!validation.success) {
        return {
          errors: z.treeifyError(validation.error).properties,
        };
      }

      const response = await fetch(`/api/teams/${teamId}/settings`, {
        method: "POST",
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const data = await response.json();
          return {
            errors: data.errors,
          };
        }

        throw new Error("An unexpected error occurred.");
      }

      return {};
    },
    onSuccess: (data) => {
      if (data?.errors) return;
      toast.success("Team Updated Successfully");
    },
    onError: () => {
      toast.error("An unexpected error occurred.");
    },
  });

  return (
    <div className="">
      <h3 className="text-xl font-bold pb-4">Team Details</h3>

      <form onSubmit={updateTeam}>
        <div className="py-2">
          <Input
            name="name"
            defaultValue={team.name}
            error={data?.errors?.name?.errors}
          />

          <div className="py-2" />

          <Textarea
            name="description"
            defaultValue={team.description}
            error={data?.errors?.description?.errors}
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 cursor-pointer"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
}
