import * as React from "react"
import { cn } from "~/lib/tw-merge"

interface ChipProps extends React.HTMLAttributes<HTMLDivElement> {
  selected?: boolean;
  children: React.ReactNode;
}

export function Chip({ 
  selected = false, 
  className, 
  children,
  ...props 
}: ChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center  justify-center p-2 text-sm   transition-colors cursor-pointer",
        "hover:bg-primary-foreground/10",
        selected && "bg-primary-foreground/10 border-primary-foreground/40",
        !selected && "border-border",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}