"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  iconComponent?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ className, iconComponent, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          className={cn(
            "w-full rounded-lg border border-stroke bg-transparent py-4 pr-6 text-black outline-none focus:border-primary focus-visible:shadow-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary",
            {
              "pl-12": iconComponent !== undefined,
              "pl-6": iconComponent === undefined,
            },
            className,
          )}
          ref={ref}
          {...props}
        />
        <span className="absolute left-4 top-5">{iconComponent}</span>
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
