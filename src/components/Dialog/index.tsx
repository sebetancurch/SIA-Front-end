import clsx from "clsx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./DialogElements";
import { type ClassValue } from "clsx";

interface Props {
  trigger: React.ReactNode;
  footer: React.ReactNode;
  content: React.ReactNode;
  title: string;
  description?: string;
  className: ClassValue;
}

export function DialogDemo({
  trigger,
  footer,
  content,
  title,
  description,
  className,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={clsx(className)}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter>{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
