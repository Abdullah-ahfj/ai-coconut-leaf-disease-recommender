export default function PredictionCard({ result }) {
  if (!result) {
    return null;
  }

  if (!result.isCoconutLeaf) {
    return (
      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-amber-700">
          Invalid input
        </p>

        <h2 className="mt-2 text-2xl font-bold text-amber-900">
          Coconut leaf not detected
        </h2>

        <p className="mt-3 text-amber-800">{result.message}</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
      <p className="text-sm font-semibold uppercase tracking-wider text-emerald-700">
        Diagnosis result
      </p>

      <h2 className="mt-2 text-3xl font-bold text-slate-900">
        {result.predictedClass}
      </h2>

      <div className="mt-5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">Confidence</span>
          <span className="font-bold text-emerald-700">
            {result.confidence.toFixed(2)}%
          </span>
        </div>

        <div className="mt-2 h-3 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-emerald-600"
            style={{
              width: `${Math.min(result.confidence, 100)}%`,
            }}
          />
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-white p-5">
        <h3 className="font-bold text-slate-900">Recommendation</h3>

        <p className="mt-2 leading-7 text-slate-600">
          {result.recommendation}
        </p>
      </div>
    </section>
  );
}