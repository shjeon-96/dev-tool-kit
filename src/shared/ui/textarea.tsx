import * as React from "react";
import { cn } from "@/shared/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** aria-labelledby for accessibility when label is separate */
  "aria-labelledby"?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, readOnly, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 transition-[color,box-shadow]",
          readOnly &&
            "bg-muted/50 cursor-default focus-visible:ring-0 focus-visible:border-input",
          className,
        )}
        ref={ref}
        readOnly={readOnly}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
