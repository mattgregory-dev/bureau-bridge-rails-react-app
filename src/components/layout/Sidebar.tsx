import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.webp";
import { Link } from "react-router-dom";
import {
  Squares2X2Icon,
  ChartBarIcon,
  ClockIcon,
  BugAntIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

const linkBase = "block rounded-md px-3 py-2 text-sm font-semibold transition";
const linkInactive = "hover:bg-slate-200";
const linkActive = "bg-blue-500 hover:bg-blue-500 text-white font-semibold";

export function Sidebar() {
  return (
    <aside className="hidden w-64 flex-shrink-0 border-r bg-white md:flex md:flex-col">
      <div className="px-4 py-4 border-b mb-3">
        <div className="flex flex-col items-center gap-0">
          <Link to="/snapshot" className="block">
            <img
              src={logo}
              alt="BureauBridge"
              className="w-[187px] h-auto"
            />
          </Link>
          <div>
            <div className="text-base text-slate-600 italic font-semibold">
              Credit rediness for life goals
            </div>
          </div>
        </div>
      </div>

      <nav className="pb-4 px-2">
        <NavLink to="/snapshot" 
          className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
            <div className="flex items-center gap-2">
              <Squares2X2Icon className="h-5 w-5" />
              Credit Snapshot
            </div>
        </NavLink>
        <NavLink to="/readiness"
          className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
            <div className="flex items-center gap-2">
              <ChartBarIcon className="h-5 w-5" />
              Readiness
            </div>
        </NavLink>
        <NavLink to="/history"
          className={({ isActive }) => `${linkBase} ${isActive ? linkActive : linkInactive}`}>
            <div className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5" />
              Metrics History
            </div>
        </NavLink>
      </nav>
      <div className="mt-auto px-2 pb-8">
        <div className="mb-2 border-t pt-2">
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? linkActive : linkInactive}`
              }
            >
              <div className="flex items-center gap-2">
                <Cog6ToothIcon className="h-5 w-5" />
                Settings
              </div>
            </NavLink>
            <a
              href="/debug?debug=1"
              className="block rounded-md px-3 py-2 text-sm font-semibold transition hover:bg-slate-100"
            >
            <div className="flex items-center gap-2">
              <BugAntIcon className="h-5 w-5" />
              Debug
            </div>
          </a>
        </div>
      </div>
    </aside>
  );
}
