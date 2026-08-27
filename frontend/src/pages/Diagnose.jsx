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

      const response = await api.post(
        "/predictions/predict",
        formData
      );

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
    <section className="mx-auto max-w-7xl px-6 py-12 justify-center">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-widest text-emerald-700">
          Coconut Leaf Diagnosis
        </p>

        <h1 className="mt-3 text-4xl font-bold text-slate-900">
          Upload or capture a coconut leaf image
        </h1>

        <p className="mt-4 leading-7 text-slate-600">
          Use a clear image with the leaf visible and reasonably well lit.
          Images that do not appear to contain a coconut leaf will be rejected.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <UploadCard
          selectedFile={selectedFile}
          previewUrl={previewUrl}
          onFileChange={selectImage}
          onClear={clearImage}
        />

      </div>

      {selectedFile && (
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={handleDiagnose}
            disabled={isAnalysing}
            className="rounded-lg bg-emerald-700 px-7 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400"
          >
            {isAnalysing ? "Analysing..." : "Diagnose Image"}
          </button>
        </div>
      )}

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 p-4 text-red-700">
          {error}
        </p>
      )}

      <div className="mt-8">
        <PredictionCard result={result} />
      </div>
    </section>
  );
}