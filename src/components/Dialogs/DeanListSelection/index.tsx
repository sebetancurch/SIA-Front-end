import { Button } from "@/components/ui/button";
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
import { User } from "@/types/user";
import ProfessorsList from "@/components/Dialogs/DeanListSelection/ProfessorsList";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import * as React from "react";
import { useFormContext } from "react-hook-form";

export function DeanListDialog() {
  const { control, setValue } = useFormContext();
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (selectedUser) {
      setValue("dean", selectedUser.id);
    }
  }, [selectedUser, setValue]);

  return (
    <FormField
      control={control}
      name="dean"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
            Dean
          </FormLabel>
          <Dialog>
            <DialogTrigger asChild>
              <Input
                className="cursor-pointer"
                placeholder="Dean"
                {...field}
                value={
                  selectedUser
                    ? `${selectedUser?.firstName} ${selectedUser?.lastName}`
                    : ""
                }
                readOnly
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1500px]">
              <DialogHeader>
                <DialogTitle>Users</DialogTitle>
                <DialogDescription>Select a user.</DialogDescription>
              </DialogHeader>
              <ProfessorsList
                selectedUser={selectedUser}
                setSelectedUser={setSelectedUser}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" disabled={!selectedUser}>
                    Save changes
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
