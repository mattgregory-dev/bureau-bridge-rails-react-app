import { AvatarMenu } from "./AvatarMenu";

export function TopNav({
  title = "Dashboard"
}: {
  title?: string;
}) {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Left: page title */}
        <div className="flex items-center gap-3">
          <div>
            <div className="text-lg font-semibold text-blue-700">
              {title}
            </div>
            <div className="hidden text-sm font-semibold text-slate-600">
              Credit Snapshot + Readiness
            </div>
          </div>
        </div>

        {/* Right: avatar menu */}
        <div className="flex items-center gap-2">
          <AvatarMenu
            name="Matty"
            email="matty@example.com"
            items={[
              {
                label: "Settings",
                onClick: () => {
                  window.location.href = "/settings";
                }
              },
              {
                label: "Log out",
                tone: "danger",
                onClick: async () => {
                  await fetch("/api/logout", {
                    method: "POST",
                    credentials: "include"
                  });
                  window.location.href = "/login";
                }
              }
            ]}
          />
        </div>
      </div>
    </header>
  );
}
