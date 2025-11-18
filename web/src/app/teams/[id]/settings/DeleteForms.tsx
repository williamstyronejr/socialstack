"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function DeleteDataForm({ teamId }: { teamId: string }) {
  const [open, setOpen] = useState(false);

  const { mutate: deleteData } = useMutation({
    mutationFn: async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const res = await fetch(`/api/teams/${teamId}/data`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to delete data");
      }

      return { success: true };
    },
    onSuccess: () => {
      toast.success("Data deleted successfully");
      setOpen(false);
    },
    onError: () => {
      toast.error("An unexpected error occurred.");
    },
  });

  return (
    <div>
      <div className="pb-4">
        <h2 className="text-xl font-bold">Delete Data</h2>
        <div className="text-sm text-gray-500">
          This will delete all data for this team. This action cannot be undone.
        </div>
      </div>

      <div className="pb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="text-right cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Delete Data
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Data</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this data?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <form onSubmit={deleteData}>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive">Delete</Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function DeleteTeamForm({ teamId }: { teamId: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { mutate: deleteData } = useMutation({
    mutationFn: async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const res = await fetch(`/api/teams/${teamId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete team");
      }

      return { success: true };
    },
    onSuccess: (data, variables, onMutateResult, context) => {
      toast.success("Team deleted successfully");
      context.client.invalidateQueries({ queryKey: ["teams"] });
      router.push("/dashboard");
      setOpen(false);
    },
    onError: () => {
      toast.error("An unexpected error occurred.");
    },
  });

  return (
    <div>
      <div className="pb-4">
        <h2 className="text-xl font-bold ">Delete Team</h2>

        <div className="text-sm text-slate-500">
          This action cannot be undone. All data associated with the team will
          be permanently deleted.
        </div>
      </div>

      <div className="">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="text-right cursor-pointer bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Delete Team
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Team</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this team? This action is
                irreversible and will delete all data associated with the team.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <form onSubmit={deleteData}>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button variant="destructive">Delete</Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
export default function DeleteForms({ teamId }: { teamId: string }) {
  return (
    <div>
      <DeleteDataForm teamId={teamId} />

      <DeleteTeamForm teamId={teamId} />
    </div>
  );
}
