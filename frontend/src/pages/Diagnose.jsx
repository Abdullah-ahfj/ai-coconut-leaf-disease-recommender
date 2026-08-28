import { useEffect, useState } from "react";
import CameraCapture from "../components/CameraCapture";
import PredictionCard from "../components/PredictionCard";
import UploadCard from "../components/UploadCard";
import api from "../services/api";

export default function Diagnose() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [isAnalysing, setIsAnalysing] = useState(false);
  const [error, setError] = useState("");

  const selectImage = (file) => {
    setSelectedFile(file);
    setResult(null);
    setError("");
  };

  const clearImage = () => {
    setSelectedFile(null);
    setResult(null);
    setError("");
  };

  const handleDiagnose = async () => {
    if (!selectedFile) {
      setError("Choose an image or capture a photo before diagnosis.");
      return;
    }

    setError("");
    setResult(null);
    setIsAnalysing(true);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await api.post("/predictions/predict", formData);
      const prediction = response.data.prediction;

      setResult({
        isCoconutLeaf: true,
        predictedClass: prediction.class,
        confidence: prediction.confidence,
        recommendation: prediction.recommendation,
      });
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "The image could not be analysed. Please try again.";
      setError(message);
    } finally {
      setIsAnalysing(false);
    }
  };

  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl("");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile]);

  return (
    <section className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-emerald-700">
            🌴 AI-Powered Diagnosis
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Coconut Leaf Disease Detection
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            Upload or capture a clear, well-lit photo of a coconut leaf.
            Images that don't appear to contain a coconut leaf will be rejected.
          </p>
        </div>

        {/* Upload area */}
        <div className="mx-auto mt-12 max-w-3xl rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-900/5 sm:p-8">
          <UploadCard
            selectedFile={selectedFile}
            previewUrl={previewUrl}
            onFileChange={selectImage}
            onClear={clearImage}
          />

          {selectedFile && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={handleDiagnose}
                disabled={isAnalysing}
                className="group relative inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-8 py-3.5 font-semibold text-white shadow-lg shadow-emerald-700/25 transition-all hover:bg-emerald-800 hover:shadow-emerald-800/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-emerald-300 disabled:shadow-none"
              >
                {isAnalysing && (
                  <svg
                    className="h-4 w-4 animate-spin text-white"
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
                )}
                {isAnalysing ? "Analysing..." : "Diagnose Image"}
              </button>
            </div>
          )}

          {error && (
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 p-4">
              <span className="mt-0.5 text-red-500">⚠</span>
              <p className="text-sm font-medium text-red-700">{error}</p>
            </div>
          )}
        </div>

        {/* Result */}
        {result && (
          <div className="mx-auto mt-8 max-w-3xl">
            <PredictionCard result={result} />
          </div>
        )}

        {/* Tips */}
        <div className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
          {[
            { icon: "☀️", title: "Good lighting", desc: "Natural daylight works best" },
            { icon: "🍃", title: "Whole leaf", desc: "Keep the full leaf in frame" },
            { icon: "🔍", title: "Sharp focus", desc: "Avoid blur and motion" },
          ].map((tip) => (
            <div
              key={tip.title}
              className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm"
            >
              <div className="text-2xl">{tip.icon}</div>
              <p className="mt-2 text-sm font-semibold text-slate-900">{tip.title}</p>
              <p className="mt-1 text-xs text-slate-500">{tip.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}