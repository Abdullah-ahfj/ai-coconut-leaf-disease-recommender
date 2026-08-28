import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const publicLinks = [{ name: "Home", path: "/" }];

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

function mobileLinkClasses({ isActive }) {
  return [
    "block rounded-lg px-4 py-3 text-base font-medium transition",
    isActive
      ? "bg-emerald-100 text-emerald-800"
      : "text-slate-700 hover:bg-slate-100 hover:text-emerald-700",
  ].join(" ");
}

export default function Navbar() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const isAuthenticated = !!user;

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 text-xl font-bold text-emerald-700"
        >
          <span className="text-2xl">🌴</span>
          CocoGuard
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-2 md:flex">
          {publicLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClasses}>
              {link.name}
            </NavLink>
          ))}

          {isAuthenticated ? (
            <>
              {privateLinks.map((link) => (
                <NavLink key={link.path} to={link.path} className={linkClasses}>
                  {link.name}
                </NavLink>
              ))}

              <button
                type="button"
                onClick={handleLogout}
                className="ml-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-400"
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

        {/* Mobile hamburger button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu panel */}
      <div
        className={[
          "overflow-hidden transition-all duration-300 ease-in-out md:hidden",
          isMenuOpen ? "max-h-96 border-t border-slate-200" : "max-h-0",
        ].join(" ")}
      >
        <div className="space-y-1 px-4 py-3">
          {publicLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={closeMenu}
              className={mobileLinkClasses}
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
                  onClick={closeMenu}
                  className={mobileLinkClasses}
                >
                  {link.name}
                </NavLink>
              ))}

              <button
                type="button"
                onClick={handleLogout}
                className="mt-2 block w-full rounded-lg bg-red-600 px-4 py-3 text-left text-base font-medium text-white transition hover:bg-red-400"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                onClick={closeMenu}
                className={mobileLinkClasses}
              >
                Login
              </NavLink>

              <Link
                to="/register"
                onClick={closeMenu}
                className="mt-2 block rounded-lg bg-emerald-700 px-4 py-3 text-base font-medium text-white transition hover:bg-emerald-800"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}