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
      <div className="p-6">
        Loading prediction history...
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
      <div>
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
          Prediction History
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Previous diagnoses
        </h1>

        <p className="mt-4 text-slate-600">
          Review previously saved disease predictions and confidence scores.
        </p>
      </div>

      {predictions.length === 0 ? (
        <p className="mt-10 text-slate-600">
          No predictions found yet.
        </p>
      ) : (
        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
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
                  <tr key={prediction.id}>
                    <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                      {new Date(
                        prediction.created_at
                      ).toLocaleString()}
                    </td>

                    <td className="px-6 py-4 font-semibold text-slate-900">
                      {prediction.predicted_class}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {prediction.confidence.toFixed(2)}%
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-600">
                      {prediction.recommendation}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </section>
  );
}