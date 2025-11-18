"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

type Member = {
  id: string;
  name: string;
  email: string;
  role: string;
};

function LoadingSelector({
  teamId,
  onSelect,
}: {
  teamId: string;
  onSelect: (val: string) => void;
}) {
  const { data, error, isLoading } = useQuery({
    queryKey: ["members", teamId],
    queryFn: async () => {
      const response = await fetch(`/api/teams/${teamId}/members`);

      if (!response.ok) {
        throw new Error("An unexpected error occurred.");
      }

      const data = (await response.json()) as { members: Member[] };
      return data.members;
    },
  });

  return (
    <div>
      <NativeSelect
        aria-label="Select A Member"
        onChange={(evt) => onSelect(evt.currentTarget.value)}
      >
        <NativeSelectOption value="">Select A Member</NativeSelectOption>
        {data
          ? data.map((member) => (
              <NativeSelectOption key={member.id} value={member.id}>
                {member.name}
              </NativeSelectOption>
            ))
          : null}
      </NativeSelect>
    </div>
  );
}

export default function TransferForm({ teamId }: { teamId: string }) {
  const [selectedMember, setSelectedMember] = useState<string>("");

  const { mutate: transferOwnership } = useMutation({
    mutationFn: async (evt: React.FormEvent<HTMLFormElement>) => {
      evt.preventDefault();

      const res = await fetch(`/api/teams/${teamId}/settings/transfer`, {
        method: "POST",
        body: JSON.stringify({ newOwner: selectedMember }),
      });

      if (!res.ok) {
        throw new Error("An unexpected error occurred.");
      }

      return {};
    },
  });

  return (
    <div>
      <form onSubmit={transferOwnership}>
        <h2 className="text-xl font-bold">Transfer Team</h2>
        <p className="text-gray-600">
          Select a team member to transfer this team to.
        </p>

        <LoadingSelector
          onSelect={(val: string) => {
            setSelectedMember(val);
          }}
          teamId={teamId}
        />

        <div className="text-right">
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-gray-400 disabled:text-gray-600"
            type="submit"
            disabled={selectedMember === ""}
          >
            Transfer Team
          </button>
        </div>
      </form>
    </div>
  );
}
