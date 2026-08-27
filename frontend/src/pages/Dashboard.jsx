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
      const response = await api.get(
        "/history/dashboard"
      );

      setDashboard(
        response.data.dashboard
      );
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Could not load dashboard data.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-600">
          Loading dashboard...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">

      {/* Welcome section */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-8 text-white md:p-12">
        <p className="text-emerald-200">
          Welcome back
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          {user?.username || "CocoGuard User"}
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-emerald-100">
          Upload or capture a coconut leaf photo to receive an
          AI-supported disease prediction and plantation-health
          recommendation.
        </p>

        <Link
          to="/diagnose"
          className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50"
        >
          Start Diagnosis
        </Link>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Diagnoses
          </p>

          <p className="mt-2 text-3xl font-bold">
            {dashboard.total_predictions}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Average Confidence
          </p>

          <p className="mt-2 text-3xl font-bold">
            {dashboard.average_confidence.toFixed(2)}%
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Most Detected
          </p>

          <p className="mt-2 text-lg font-bold">
            {dashboard.most_detected_disease
              ? dashboard.most_detected_disease.name
              : "No data"}
          </p>
        </div>

        <div className="rounded-2xl border bg-white p-6 shadow-sm">
          <p className="text-sm text-gray-500">
            Latest Diagnosis
          </p>

          <p className="mt-2 text-lg font-bold">
            {dashboard.latest_prediction
              ? dashboard.latest_prediction.predicted_class
              : "No data"}
          </p>
        </div>

      </div>

      {/* Quick actions + guidance */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Quick actions
          </h2>

          <div className="mt-5 grid gap-3">
            <Link
              to="/diagnose"
              className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-800 transition hover:bg-emerald-100"
            >
              Diagnose a coconut leaf
            </Link>

            <Link
              to="/history"
              className="rounded-xl border border-slate-200 p-4 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              View prediction history
            </Link>
          </div>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Image guidance
          </h2>

          <ul className="mt-5 space-y-3 text-slate-600">
            <li>• Keep the coconut leaf clearly visible.</li>
            <li>• Use sufficient natural or indoor lighting.</li>
            <li>• Avoid excessive blur and distant images.</li>
            <li>• Do not upload unrelated objects or other plant species.</li>
          </ul>
        </article>

      </div>

      {/* Recent diagnoses */}
      <div className="mt-10">

        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Recent Diagnoses
          </h2>

          <Link
            to="/history"
            className="text-sm font-medium text-green-700"
          >
            View all
          </Link>
        </div>

        {dashboard.recent_predictions.length === 0 ? (

          <div className="rounded-2xl border bg-white p-8 text-center">
            <p className="text-gray-500">
              You haven't made any diagnoses yet.
            </p>

            <Link
              to="/diagnose"
              className="mt-4 inline-block font-medium text-green-700"
            >
              Diagnose your first leaf
            </Link>
          </div>

        ) : (

          <div className="overflow-hidden rounded-2xl border bg-white">

            {dashboard.recent_predictions.map(
              (prediction) => (

                <div
                  key={prediction.id}
                  className="flex flex-col gap-2 border-b p-5 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
                >

                  <div>
                    <p className="font-semibold text-gray-900">
                      {prediction.predicted_class}
                    </p>

                    <p className="text-sm text-gray-500">
                      {new Date(
                        prediction.created_at
                      ).toLocaleString()}
                    </p>
                  </div>

                  <div className="text-sm">
                    <span className="font-semibold">
                      {prediction.confidence.toFixed(2)}%
                    </span>

                    <span className="ml-1 text-gray-500">
                      confidence
                    </span>
                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </section>
  );
}