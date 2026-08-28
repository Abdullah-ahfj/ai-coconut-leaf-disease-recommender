import { Link } from "react-router-dom";

const features = [
  {
    title: "AI Disease Detection",
    description:
      "Upload a coconut image and receive a disease prediction with a confidence score.",
    icon: "🧠",
  },
  {
    title: "Camera Photo Capture",
    description:
      "Capture a still photo using your device camera and submit it for diagnosis.",
    icon: "📷",
  },
  {
    title: "Invalid Image Rejection",
    description:
      "Images that do not appear to contain a coconut leaf will be rejected.",
    icon: "🚫",
  },
  {
    title: "Health Recommendations",
    description:
      "Receive treatment, prevention, and plantation-care recommendations.",
    icon: "💊",
  },
  {
    title: "Prediction History",
    description:
      "Review your previous diagnoses, confidence scores, and recommendations.",
    icon: "🕘",
  },
  {
    title: "Model Comparison",
    description:
      "The final model will be selected through controlled comparison and evaluation.",
    icon: "📊",
  },
];

const stats = [
  { value: "4+", label: "Disease Classes" },
  { value: "AI", label: "Powered Diagnosis" },
  { value: "24/7", label: "Available Access" },
];

export default function Landing() {
  return (
    <div className="overflow-hidden bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-800 to-green-700 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, white 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100 backdrop-blur">
              🌴 AI-Powered Plantation Health Support
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Detect Coconut Leaf Diseases with{" "}
              <span className="bg-gradient-to-r from-emerald-300 to-lime-300 bg-clip-text text-transparent">
                Artificial Intelligence
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-100">
              CocoGuard uses deep learning to classify coconut leaf diseases,
              reject invalid images, and provide practical treatment and
              prevention recommendations.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                Create Account
              </Link>

              <Link
                to="/login"
                className="rounded-lg border border-white/50 px-6 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>

            <div className="mt-14 flex gap-10 border-t border-white/10 pt-8">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="text-2xl font-bold sm:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-sm text-emerald-200">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-white/10 blur-2xl" />

            <div className="relative rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur">
              <div className="rounded-2xl bg-white p-6 text-slate-900 shadow-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-500">
                      Diagnosis workflow
                    </p>

                    <h2 className="mt-1 text-2xl font-bold">
                      Upload. Analyse. Protect.
                    </h2>
                  </div>

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-2xl">
                    🌴
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  {[
                    "Choose an image or capture a photo",
                    "Validate the coconut leaf input",
                    "Predict the disease class",
                    "Display confidence and recommendations",
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50/50"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                        {index + 1}
                      </span>

                      <p className="font-medium text-slate-700">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <svg
          className="relative block w-full text-white"
          viewBox="0 0 1440 60"
          fill="currentColor"
        >
          <path d="M0,32 C360,80 1080,-16 1440,32 L1440,60 L0,60 Z" />
        </svg>
      </section>

      {/* Features */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
              Core Features
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              A complete coconut disease diagnosis application
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              The system combines image classification, input validation,
              recommendations, user accounts, and prediction history.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <article
                key={feature.title}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-900/5"
              >
                <div className="absolute right-4 top-4 text-5xl font-black text-slate-100 transition group-hover:text-emerald-50">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-2xl transition group-hover:bg-emerald-700 group-hover:text-white">
                  {feature.icon}
                </div>

                <h3 className="relative mt-5 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="relative mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-emerald-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 px-8 py-14 text-center text-white shadow-2xl md:px-16">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <h2 className="relative text-3xl font-bold sm:text-4xl">
              Start diagnosing coconut leaf conditions
            </h2>

            <p className="relative mx-auto mt-4 max-w-2xl text-emerald-100">
              Create an account to upload an image, capture a photo, view
              recommendations, and save your prediction history.
            </p>

            <Link
              to="/register"
              className="relative mt-8 inline-block rounded-lg bg-white px-8 py-3.5 font-semibold text-emerald-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}