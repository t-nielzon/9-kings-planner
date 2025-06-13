import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

const navigationItems = [
  {
    path: "/",
    label: "Home",
    icon: "🏠",
  },
  {
    path: "/planner",
    label: "Kingdom Planner",
    icon: "⚔️",
  },
  {
    path: "/cards",
    label: "Card Database",
    icon: "🃏",
  },
];

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="bg-stone-900/90 backdrop-blur-lg border-b border-stone-700 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center gap-3 text-xl font-bold text-nothing-300 hover:text-nothing-200 transition-colors"
          >
            <div className="w-8 h-8 bg-nothing-600 rounded-lg flex items-center justify-center">
              👑
            </div>
            <span className="hidden sm:block">9 Kings Planner</span>
          </Link>

          <div className="flex items-center gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={clsx(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
                  location.pathname === item.path
                    ? "bg-nothing-600 text-white border border-nothing-400"
                    : "text-stone-300 hover:text-white hover:bg-stone-800 border border-transparent hover:border-stone-600"
                )}
              >
                <span className="text-base">{item.icon}</span>
                <span className="hidden sm:block">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <div className="text-stone-400 text-sm hidden md:block">
              Alpha v0.1
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
