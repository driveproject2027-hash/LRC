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
        default: "bg-[#7664B5] hover:bg-[#5B4698] text-white shadow-none transition-colors",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-[#E7E4E9] bg-white text-[#24232A] hover:text-[#7664B5] hover:bg-[#F0ECF8] transition-colors",
        secondary: "border border-[#E7E4E9] bg-[#FCFBF8] text-[#24232A] hover:text-[#7664B5] hover:bg-[#F0ECF8] transition-colors",
        ghost: "text-content-secondary hover:bg-[#F0ECF8] hover:text-[#7664B5] transition-colors",
        link: "text-[#7664B5] hover:text-[#5B4698] underline-offset-4 hover:underline p-0 h-auto",
        /* Legacy aliases retained so existing pages keep compiling. */
        hero: "bg-[#7664B5] hover:bg-[#5B4698] text-white shadow-none transition-colors",
        "hero-outline": "border border-[#E7E4E9] bg-white text-[#24232A] hover:text-[#7664B5] hover:bg-[#F0ECF8] transition-colors",
        nature: "bg-[#7664B5] hover:bg-[#5B4698] text-white shadow-none transition-colors",
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
