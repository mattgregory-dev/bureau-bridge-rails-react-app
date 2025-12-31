import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

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
    "inline-flex items-center justify-center rounded-md " +
    "px-4 py-2 text-base font-semibold " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600",

    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-200",

    outline:
      "border border-gray-300 bg-white text-slate-900 hover:bg-gray-100",

    ghost:
      "bg-transparent text-slate-900 hover:bg-gray-100",
  };

  return (
    <button
      type={type}
      className={cx(base, variants[variant], className)}
      {...props}
    />
  );
}
