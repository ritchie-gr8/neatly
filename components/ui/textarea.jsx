import * as React from "react"

import { cn } from "@/lib/utils"

const Textarea = React.forwardRef(function Textarea({
  className,
  ...props
}, ref) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground",
        "focus-visible:border-inherit focus-visible:ring-0",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content",
        "min-h-16 w-full rounded-md border bg-transparent px-3 py-2",
        "text-base shadow-xs transition-[color,box-shadow] outline-none",
        "focus-visible:ring-[0px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props} />
  );
});

export { Textarea }
