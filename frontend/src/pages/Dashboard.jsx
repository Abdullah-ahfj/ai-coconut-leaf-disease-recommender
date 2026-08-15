import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const statistics = [
  {
    label: "Total diagnoses",
    value: "0",
  },
  {
    label: "Healthy results",
    value: "0",
  },
  {
    label: "Disease detections",
    value: "0",
  },
  {
    label: "Rejected images",
    value: "0",
  },
];

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="rounded-3xl bg-gradient-to-r from-emerald-900 to-emerald-700 p-8 text-white md:p-12">
        <p className="text-emerald-200">Welcome back</p>

        <h1 className="mt-2 text-4xl font-bold">
          {user?.username || "CocoGuard User"}
        </h1>

        <p className="mt-4 max-w-2xl leading-7 text-emerald-100">
          Upload or capture a coconut leaf photo to receive an AI-supported
          disease prediction and plantation-health recommendation.
        </p>

        <Link
          to="/diagnose"
          className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50"
        >
          Start Diagnosis
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {statistics.map((statistic) => (
          <article
            key={statistic.label}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-slate-500">
              {statistic.label}
            </p>

            <p className="mt-3 text-3xl font-bold text-slate-900">
              {statistic.value}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Quick actions</h2>

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
    </section>
  );
}