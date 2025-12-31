import * as React from "react";

type ButtonVariant = "primary" | "outline" | "ghost";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded px-3 py-1.5 text-sm font-medium " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60";

  const variants: Record<ButtonVariant, string> = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-700",
    outline: "border border-gray-300 bg-white text-slate-900 hover:bg-gray-100",
    ghost: "bg-transparent text-slate-900 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      className={cx(base, variants[variant], className)}
      {...props}
    />
  );
}
