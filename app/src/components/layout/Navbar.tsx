import { NavLink } from "react-router-dom";
import { ROUTES } from "@/constants";
import { cn } from "@/lib/utils";

const links = [
  { to: ROUTES.PUBLIC, label: "View" },
  { to: ROUTES.DASHBOARD, label: "Dashboard" },
];

export function Navbar() {
  return (
    <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-100 bg-white/80 px-5 py-3 backdrop-blur">
      <span className="text-sm font-semibold tracking-tight text-gray-900">Translations</span>
      <div className="flex gap-1">
        {links.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              cn(
                "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors",
                isActive ? "bg-gray-100 text-gray-900" : "text-gray-400 hover:text-gray-700",
              )
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
