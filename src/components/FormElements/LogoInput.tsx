"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  iconComponent: React.ReactNode;
}

const LogoInput = React.forwardRef<HTMLInputElement, Props>(
  ({ className, label, iconComponent, ...props }, ref) => {
    return (
      <div className="mb-4">
        <label className="mb-2.5 block font-medium text-black dark:text-white">
          {label}
        </label>
        <div className="relative">
          <input
            className={cn(
              "w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
              className,
            )}
            ref={ref}
            {...props}
          />
          <span className="absolute right-4 top-4">{iconComponent}</span>
        </div>
      </div>
    );
  },
);
LogoInput.displayName = "LogoInput";

export { LogoInput };
