"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PrimaryButtonProps {
  text: string;
  variant?: "accent1" | "accent2" | "outline";
  size?: "sm" | "default" | "lg";
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  href?: string;
  type?: "submit" | "button";
  ariaLabel?: string;
}

const variantStyles: Record<string, string> = {
  accent1: "bg-accent1 text-primary-foreground hover:bg-accent1/80 border-accent1",
  accent2: "bg-accent2 text-primary-foreground hover:bg-accent2/80 border-accent2",
  outline: "border-accent1 text-accent1 bg-transparent hover:bg-accent1/10",
};

const sizeMap: Record<string, "sm" | "default" | "lg"> = { sm: "sm", default: "default", lg: "lg" };

export default function PrimaryButton({
  text,
  variant = "accent1",
  size = "default",
  onClick,
  disabled = false,
  className,
  href,
  type = "button",
  ariaLabel,
}: PrimaryButtonProps) {
  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={ariaLabel}
        className={cn(
          variantStyles[variant],
          "font-body tracking-wide rounded-full inline-flex shrink-0 items-center justify-center border transition-all select-none",
          size === "lg" ? "h-9 px-2.5 text-sm" : size === "sm" ? "h-7 px-2.5 text-[0.8rem]" : "h-8 px-2.5 text-sm",
          className
        )}
      >
        {text}
      </a>
    );
  }

  return (
    <Button
      className={cn(variantStyles[variant], "font-body tracking-wide rounded-full", className)}
      size={sizeMap[size]}
      onClick={onClick}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
    >
      {text}
    </Button>
  );
}
