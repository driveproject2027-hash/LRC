import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-none border border-border-subtle bg-surface-raised px-3.5 py-2 text-small text-content-primary ring-offset-background transition-colors duration-fast file:border-0 file:bg-transparent file:text-small file:font-medium file:text-content-primary placeholder:text-content-muted focus-visible:outline-none focus-visible:border-[#7664B5] focus-visible:ring-2 focus-visible:ring-[#7664B5]/20 focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
