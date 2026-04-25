import { cn } from "@/lib/utils";
import { type VariantProps, cva } from "class-variance-authority";
import type * as React from "react";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-ocean text-white",
        secondary: "border-transparent bg-sand text-palm",
        outline: "border-border text-palm bg-transparent",
        gf: "border-transparent bg-emerald-100 text-emerald-800",
        v: "border-transparent bg-lime-100 text-lime-800",
        vegan: "border-transparent bg-green-100 text-green-800",
        spicy: "border-transparent bg-orange-100 text-orange-800",
        shellfish: "border-transparent bg-blue-100 text-blue-800",
        market: "border-transparent bg-reef text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
