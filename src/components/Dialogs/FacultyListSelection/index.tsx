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
import { Faculty } from "@/types/faculty";
import FacultyList from "@/components/Dialogs/FacultyListSelection/FacultyList";

export function FacultyListDialog() {
  const { control, setValue } = useFormContext();
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | undefined>(
    undefined,
  );

  useEffect(() => {
    if (selectedFaculty) {
      setValue("faculty", selectedFaculty.id);
    }
  }, [selectedFaculty, setValue]);

  return (
    <FormField
      control={control}
      name="faculty"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel className="mb-2.5 block font-medium text-black dark:text-white">
            Faculty
          </FormLabel>
          <Dialog>
            <DialogTrigger asChild>
              <Input
                className="cursor-pointer"
                placeholder="Faculty"
                {...field}
                value={selectedFaculty ? selectedFaculty.name : ""}
                readOnly
              />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[1500px]">
              <DialogHeader>
                <DialogTitle>Faculty</DialogTitle>
                <DialogDescription>Select a faculty.</DialogDescription>
              </DialogHeader>
              <FacultyList
                selectedFaculty={selectedFaculty}
                setSelectedFaculty={setSelectedFaculty}
              />
              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" disabled={!selectedFaculty}>
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
