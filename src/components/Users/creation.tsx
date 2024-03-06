import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus } from "react-icons/fa";
import UserForm from "@/components/Users/form";

const CreationDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <FaPlus className="mr-2 h-4 w-4" />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-auto sm:max-w-5xl">
        <DialogHeader>
          <DialogTitle>Create user</DialogTitle>
        </DialogHeader>
        <UserForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreationDialog;
