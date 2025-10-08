"use client";

import { useState } from "react";
import {
  DialogTrigger,
  DialogTitle,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogDescription,
  DialogClose,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function ConfirmationDialog({
  title,
  children,
  confirmationText,
  onConfirm,
}: {
  title: string;
  children: React.ReactNode;
  confirmationText: string;
  onConfirm: () => void;
}) {
  const [input, setInput] = useState("");

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogTitle>{title}</DialogTitle>

        <div className="pb-4">
          <DialogDescription>
            <label htmlFor="confirm" className="block pb-2">
              To confirm, please type{" "}
              <span className="font-bold">{confirmationText}</span> below.
            </label>

            <Input
              id="confirm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </DialogDescription>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            disabled={input === confirmationText}
            onClick={onConfirm}
          >
            {confirmationText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
