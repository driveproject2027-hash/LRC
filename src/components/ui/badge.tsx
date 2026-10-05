import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/* Badges are metadata, not buttons: square-ish corners, label type, no hover. */
const badgeVariants = cva(
  "inline-flex items-center rounded-xs border px-2 py-0.5 text-label font-semibold uppercase tracking-label transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-border-subtle bg-stone-100 text-content-secondary",
        destructive: "border-transparent bg-destructive text-destructive-foreground",
        outline: "border-border-subtle text-content-secondary",
        /* Brand accents for tagging content (categories, programme areas) */
        brand: "border-forest-200 bg-forest-50 text-forest-800",
        accent: "border-violet-200 bg-violet-100 text-violet-800",
        warm: "border-clay-200 bg-clay-200/40 text-clay-800",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
