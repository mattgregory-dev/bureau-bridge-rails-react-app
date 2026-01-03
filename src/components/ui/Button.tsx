import * as React from "react";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "tableHeader";

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
    "px-4 py-1.5 text-base font-semibold " +
    "focus:outline-none focus:ring-none focus:ring-indigo-100 disabled:opacity-60";

    // "inline-flex items-center justify-center rounded-md " +
    // "px-4 py-1.5 text-base font-semibold " +
    // "focus:outline-none " +
    // "focus-visible:ring-2 focus-visible:ring-blue-500/40 " +
    // "focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
    // "disabled:opacity-60";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-blue-500 text-white hover:bg-blue-600",

    secondary:
      "bg-slate-100 text-slate-900 hover:bg-slate-200",

    outline:
      "border border-gray-300 bg-white text-slate-900 hover:bg-gray-100",

    ghost:
      "bg-transparent text-slate-900 hover:bg-gray-100",

    tableHeader:
      "bg-slate-100 text-slate-900 hover:bg-slate-200 px-[7px] py-[7px] text-xs border border-[#d0e2f6]",
  };

  return (
    <button
      type={type}
      className={cx(base, variants[variant], className)}
      {...props}
    />
  );
}
