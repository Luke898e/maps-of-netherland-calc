import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-[linear-gradient(180deg,#1a5696_0%,#13457f_100%)] text-primary-foreground shadow-[0_14px_30px_-16px_rgba(15,63,121,0.8)] hover:-translate-y-0.5 hover:brightness-105 focus-visible:ring-2 focus-visible:ring-primary/40",
  outline:
    "border border-[#c5d9f3] bg-white/95 text-[#143e74] shadow-[0_8px_22px_-18px_rgba(20,66,124,0.65)] hover:-translate-y-0.5 hover:bg-[#eef5ff] focus-visible:ring-2 focus-visible:ring-primary/40",
  ghost: "text-[#17467f] hover:bg-[#eaf2ff] focus-visible:ring-2 focus-visible:ring-primary/40"
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-11 px-4 py-2 text-sm",
  sm: "h-9 px-3 text-sm",
  lg: "h-12 px-6 text-base"
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-[transform,background-color,color,box-shadow,filter] duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
