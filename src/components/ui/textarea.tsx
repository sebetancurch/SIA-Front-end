import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-lg border border-stroke bg-transparent bg-white px-3 py-4 pr-6 text-sm text-black outline-none ring-offset-white placeholder:text-slate-500 focus:border-primary focus-visible:shadow-none focus-visible:outline-none focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus:border-primary dark:focus-visible:ring-slate-300",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
