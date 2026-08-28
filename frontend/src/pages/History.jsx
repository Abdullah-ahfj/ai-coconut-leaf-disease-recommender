import { useEffect, useState } from "react";
import api from "../services/api";

export default function History() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get("/history/");
      setPredictions(response.data.predictions);
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Could not load prediction history.";

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
        <p className="text-slate-500">Loading prediction history...</p>
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

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
            Prediction History
          </p>

          <h1 className="mt-3 text-4xl font-bold text-slate-900">
            Previous diagnoses
          </h1>

          <p className="mt-4 max-w-xl text-slate-600">
            Review previously saved disease predictions and confidence
            scores.
          </p>
        </div>

        {predictions.length > 0 && (
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700 sm:self-auto">
            🧾 {predictions.length} total
          </span>
        )}
      </div>

      {predictions.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-2xl">
            🍃
          </div>

          <p className="mt-4 text-slate-500">No predictions found yet.</p>
        </div>
      ) : (
        <>
          {/* Table — desktop / tablet */}
          <div className="mt-10 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:block">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Date
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Prediction
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Confidence
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Recommendation
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200">
                  {predictions.map((prediction) => (
                    <tr
                      key={prediction.id}
                      className="transition hover:bg-emerald-50/40"
                    >
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                        {new Date(prediction.created_at).toLocaleString()}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-sm">
                            🍃
                          </div>
                          <span className="font-semibold text-slate-900">
                            {prediction.predicted_class}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                          {prediction.confidence.toFixed(2)}%
                        </span>
                      </td>

                      <td className="max-w-xs px-6 py-4 text-sm text-slate-600">
                        {prediction.recommendation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cards — mobile */}
          <div className="mt-10 space-y-4 sm:hidden">
            {predictions.map((prediction) => (
              <div
                key={prediction.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-lg">
                      🍃
                    </div>
                    <p className="font-semibold text-slate-900">
                      {prediction.predicted_class}
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                    {prediction.confidence.toFixed(2)}%
                  </span>
                </div>

                <p className="mt-3 text-xs text-slate-400">
                  {new Date(prediction.created_at).toLocaleString()}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {prediction.recommendation}
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
}