import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[132px] w-full rounded-[24px] border border-white/10 bg-black/25 px-4 py-4 text-sm leading-7 text-[color:var(--color-foreground)] placeholder:text-[color:var(--color-muted)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.04)] outline-none transition-colors duration-300 focus:border-[color:var(--color-accent-gold)] focus:bg-black/35",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
