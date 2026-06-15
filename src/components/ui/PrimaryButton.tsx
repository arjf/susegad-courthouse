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
}

const variantStyles: Record<string, string> = {
  accent1: "bg-accent1 text-primary-foreground hover:bg-accent1/80 border-accent1",
  accent2: "bg-accent2 text-primary-foreground hover:bg-accent2/80 border-accent2",
  outline: "border-accent1 text-accent1 bg-transparent hover:bg-accent1/10",
};

export default function PrimaryButton({
  text,
  variant = "accent1",
  size = "default",
  onClick,
  disabled = false,
  className,
}: PrimaryButtonProps) {
  return (
    <Button
      className={cn(variantStyles[variant], "font-body tracking-wide rounded-full", className)}
      size={size === "lg" ? "lg" : size === "sm" ? "sm" : "default"}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </Button>
  );
}
