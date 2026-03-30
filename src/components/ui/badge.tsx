import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.28em]",
  {
    variants: {
      variant: {
        default:
          "border-white/10 bg-white/6 text-[color:var(--color-muted)] backdrop-blur-md",
        accent:
          "border-[color:var(--color-accent-gold)]/30 bg-[color:var(--color-accent-gold)]/10 text-[color:var(--color-accent-gold)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
