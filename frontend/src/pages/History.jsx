const temporaryPredictions = [
  {
    id: 1,
    date: "2026-07-20",
    predictedClass: "Gray Leaf Spot",
    confidence: 94.63,
    status: "Disease detected",
  },
  {
    id: 2,
    date: "2026-07-19",
    predictedClass: "Healthy Leaves",
    confidence: 91.27,
    status: "Healthy",
  },
];

export default function History() {
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
                  Status
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {temporaryPredictions.map((prediction) => (
                <tr key={prediction.id}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-slate-600">
                    {prediction.date}
                  </td>

                  <td className="px-6 py-4 font-semibold text-slate-900">
                    {prediction.predictedClass}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {prediction.confidence.toFixed(2)}%
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                      {prediction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="mt-5 text-xs text-slate-500">
        These rows are temporary test data. Prediction history will later load
        from the predictions table inside coconut.db.
      </p>
    </section>
  );
}