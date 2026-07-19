import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const publicLinks = [
  { name: "Home", path: "/" },
];

const privateLinks = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Diagnose", path: "/diagnose" },
  { name: "History", path: "/history" },
];

function linkClasses({ isActive }) {
  return [
    "rounded-md px-3 py-2 text-sm font-medium transition",
    isActive
      ? "bg-emerald-100 text-emerald-800"
      : "text-slate-700 hover:bg-slate-100 hover:text-emerald-700",
  ].join(" ");
}

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="text-xl font-bold text-emerald-700">
          CocoGuard
        </Link>

        <div className="flex items-center gap-2">
          {publicLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={linkClasses}
            >
              {link.name}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <>
              {privateLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={linkClasses}
                >
                  {link.name}
                </NavLink>
              ))}

              <button
                type="button"
                onClick={logout}
                className="ml-2 rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClasses}>
                Login
              </NavLink>

              <Link
                to="/register"
                className="ml-2 rounded-md bg-emerald-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}