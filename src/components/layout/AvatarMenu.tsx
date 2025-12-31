import { useEffect, useId, useRef, useState } from "react";

type MenuItem = {
  label: string;
  onClick: () => void;
  tone?: "default" | "danger";
};

export function AvatarMenu({
  name = "Matty",
  email = "matty@example.com",
  items
}: {
  name?: string;
  email?: string;
  items: MenuItem[];
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    function onMouseDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!open) return;
      if (menuRef.current?.contains(t)) return;
      if (btnRef.current?.contains(t)) return;
      setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, [open]);

  const initials = name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase())
    .join("");

  return (
    <div className="relative">
      <button
        ref={btnRef}
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-2 py-1.5 text-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="hidden text-slate-700 md:inline">{name}</span>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-900 text-xs font-semibold text-white">
          {initials || "U"}
        </span>
      </button>

      {open ? (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg"
        >
          <div className="border-b border-slate-100 px-4 py-3">
            <div className="text-sm font-semibold text-slate-900">{name}</div>
            <div className="text-xs text-slate-500">{email}</div>
          </div>

          <div className="py-1">
            {items.map((it) => {
              const tone =
                it.tone === "danger"
                  ? "text-red-700 hover:bg-red-50"
                  : "text-slate-700 hover:bg-slate-50";

              return (
                <button
                  key={it.label}
                  role="menuitem"
                  type="button"
                  className={`w-full px-4 py-2 text-left text-sm ${tone}`}
                  onClick={() => {
                    setOpen(false);
                    it.onClick();
                  }}
                >
                  {it.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
