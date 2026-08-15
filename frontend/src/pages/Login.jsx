import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Temporary frontend login.
    // This will later be replaced with the Flask authentication API.
    login({
      id: 1,
      username: "Demo User",
      email: formData.email,
    });

    navigate(location.state?.from || "/dashboard", {
      replace: true,
    });
  };

  return (
    <section className="bg-slate-50 px-6 py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl lg:grid-cols-2">
        <div className="hidden bg-gradient-to-br from-emerald-900 to-emerald-700 p-12 text-white lg:block">
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-200">
            Welcome Back
          </p>

          <h1 className="mt-5 text-4xl font-bold leading-tight">
            Continue protecting your coconut plantation
          </h1>

          <p className="mt-5 leading-7 text-emerald-100">
            Sign in to diagnose coconut leaf images, receive recommendations,
            and view your previous prediction history.
          </p>

          <div className="mt-10 space-y-4 text-sm text-emerald-100">
            <p>✓ Upload or capture a coconut leaf photo</p>
            <p>✓ Receive disease predictions and confidence scores</p>
            <p>✓ Access treatment and prevention guidance</p>
            <p>✓ Review saved diagnosis history</p>
          </div>
        </div>

        <div className="p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-slate-900">
            Sign in to CocoGuard
          </h2>

          <p className="mt-2 text-slate-600">
            Enter your account details to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                placeholder="Enter your password"
                className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-emerald-700 px-5 py-3 font-semibold text-white transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
            >
              Sign In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-600">
            Do not have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Create one
            </Link>
          </p>

          <p className="mt-4 rounded-lg bg-amber-50 p-3 text-center text-xs text-amber-800">
            Authentication is currently running in frontend test mode.
          </p>
        </div>
      </div>
    </section>
  );
}