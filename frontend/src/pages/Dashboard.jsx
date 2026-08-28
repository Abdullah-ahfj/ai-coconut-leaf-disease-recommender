import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("/history/dashboard");

      setDashboard(response.data.dashboard);
    } catch (error) {
      const message =
        error.response?.data?.message || "Could not load dashboard data.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3">
        <svg
          className="h-8 w-8 animate-spin text-emerald-700"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p className="text-slate-500">Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-5">
          <span className="mt-0.5 text-red-500">⚠</span>
          <p className="font-medium text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Diagnoses",
      value: dashboard.total_predictions,
      icon: "🧾",
    },
    {
      label: "Average Confidence",
      value: `${dashboard.average_confidence.toFixed(2)}%`,
      icon: "🎯",
    },
    {
      label: "Most Detected",
      value: dashboard.most_detected_disease
        ? dashboard.most_detected_disease.name
        : "No data",
      icon: "🦠",
    },
    {
      label: "Latest Diagnosis",
      value: dashboard.latest_prediction
        ? dashboard.latest_prediction.predicted_class
        : "No data",
      icon: "🕒",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Welcome section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 p-8 text-white shadow-xl shadow-emerald-900/10 md:p-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 85% 15%, white 1px, transparent 1px)",
            backgroundSize: "26px 26px",
          }}
        />

        <p className="relative text-emerald-200">Welcome back</p>

        <h1 className="relative mt-2 text-4xl font-bold">
          {user?.username || "CocoGuard User"}
        </h1>

        <p className="relative mt-4 max-w-2xl leading-7 text-emerald-100">
          Upload or capture a coconut leaf photo to receive an AI-supported
          disease prediction and plantation-health recommendation.
        </p>

        <Link
          to="/diagnose"
          className="relative mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
        >
          🌿 Start Diagnosis
        </Link>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-xl transition group-hover:bg-emerald-700 group-hover:text-white">
              {stat.icon}
            </div>

            <p className="mt-4 text-sm text-slate-500">{stat.label}</p>

            <p className="mt-1 truncate text-2xl font-bold text-slate-900">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Quick actions + guidance */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Quick actions</h2>

          <div className="mt-5 grid gap-3">
            <Link
              to="/diagnose"
              className="flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-800 transition hover:bg-emerald-100"
            >
              Diagnose a coconut leaf
              <span aria-hidden>→</span>
            </Link>

            <Link
              to="/history"
              className="flex items-center justify-between rounded-xl border border-slate-200 p-4 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View prediction history
              <span aria-hidden>→</span>
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Image guidance</h2>

          <ul className="mt-5 space-y-3 text-slate-600">
            {[
              "Keep the coconut leaf clearly visible.",
              "Use sufficient natural or indoor lighting.",
              "Avoid excessive blur and distant images.",
              "Do not upload unrelated objects or other plant species.",
            ].map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <span className="mt-1 text-emerald-600">✓</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      {/* Recent diagnoses */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-900">
            Recent Diagnoses
          </h2>

          <Link
            to="/history"
            className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
          >
            View all →
          </Link>
        </div>

        {dashboard.recent_predictions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
              🍃
            </div>

            <p className="mt-4 text-slate-500">
              You haven't made any diagnoses yet.
            </p>

            <Link
              to="/diagnose"
              className="mt-4 inline-block font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Diagnose your first leaf
            </Link>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {dashboard.recent_predictions.map((prediction) => (
              <div
                key={prediction.id}
                className="flex flex-col gap-2 border-b border-slate-100 p-5 transition last:border-b-0 hover:bg-emerald-50/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-lg">
                    🍃
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {prediction.predicted_class}
                    </p>

                    <p className="text-sm text-slate-500">
                      {new Date(prediction.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="text-sm">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">
                    {prediction.confidence.toFixed(2)}%
                  </span>

                  <span className="ml-1 text-slate-500">confidence</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}