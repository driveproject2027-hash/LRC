import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Button variants — LAYA design system.
 *
 * Rounded-sm rectangles, no gradient fills, no lift-on-hover shadows.
 * Solid → primary action. Outline → secondary. Ghost → tertiary/inline.
 */
const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-none font-sans text-small font-semibold tracking-wider uppercase",
    "ring-offset-background",
    "transition-all duration-300 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-logo-blue to-violet-400 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:from-logo-blue/90 hover:to-violet-400/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-border-default bg-surface-raised text-content-primary hover:bg-stone-100 hover:border-border-strong",
        secondary: "bg-secondary text-secondary-foreground hover:bg-stone-200",
        ghost: "text-content-secondary hover:bg-stone-100 hover:text-content-primary",
        link: "text-content-brand underline-offset-4 hover:underline p-0 h-auto",
        /* Legacy aliases retained so existing pages keep compiling. */
        hero: "bg-gradient-to-r from-logo-blue to-violet-400 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:from-logo-blue/90 hover:to-violet-400/90",
        "hero-outline": "border border-border-inverse text-content-inverse bg-transparent hover:bg-ivory-50/10",
        nature: "bg-gradient-to-r from-logo-blue to-violet-400 text-white shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:from-logo-blue/90 hover:to-violet-400/90",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 rounded-none px-4",
        lg: "h-12 px-8",
        xl: "h-14 rounded-none px-10 text-body",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
