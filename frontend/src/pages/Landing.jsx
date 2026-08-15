import { Link } from "react-router-dom";

const features = [
  {
    title: "AI Disease Detection",
    description:
      "Upload a coconut image and receive a disease prediction with a confidence score.",
  },
  {
    title: "Camera Photo Capture",
    description:
      "Capture a still photo using your device camera and submit it for diagnosis.",
  },
  {
    title: "Invalid Image Rejection",
    description:
      "Images that do not appear to contain a coconut leaf will be rejected.",
  },
  {
    title: "Health Recommendations",
    description:
      "Receive treatment, prevention, and plantation-care recommendations.",
  },
  {
    title: "Prediction History",
    description:
      "Review your previous diagnoses, confidence scores, and recommendations.",
  },
  {
    title: "Model Comparison",
    description:
      "The final model will be selected through controlled comparison and evaluation.",
  },
];

export default function Landing() {
  return (
    <>
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-800 to-green-700 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:py-32">
          <div>
            <span className="inline-flex rounded-full border border-emerald-300/30 bg-white/10 px-4 py-2 text-sm font-medium text-emerald-100">
              AI-Powered Plantation Health Support
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Detect Coconut Leaf Diseases with Artificial Intelligence
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-100">
              CocoGuard uses deep learning to classify coconut leaf diseases,
              reject invalid images, and provide practical treatment and
              prevention recommendations.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50"
              >
                Create Account
              </Link>

              <Link
                to="/login"
                className="rounded-lg border border-white/50 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur">
            <div className="rounded-2xl bg-white p-6 text-slate-900">
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
                    className="flex items-center gap-4 rounded-xl border border-slate-200 p-4"
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
      </section>

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
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 font-bold text-emerald-700">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-emerald-50">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-3xl bg-emerald-800 px-8 py-12 text-center text-white md:px-16">
            <h2 className="text-3xl font-bold">
              Start diagnosing coconut leaf conditions
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-emerald-100">
              Create an account to upload an image, capture a photo, view
              recommendations, and save your prediction history.
            </p>

            <Link
              to="/register"
              className="mt-8 inline-block rounded-lg bg-white px-6 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}