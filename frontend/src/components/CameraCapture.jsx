import { useEffect, useRef, useState } from "react";

export default function CameraCapture({ onCapture }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [cameraOpen, setCameraOpen] = useState(false);
  const [error, setError] = useState("");

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;

    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setCameraOpen(false);
  };

  const openCamera = async () => {
    setError("");

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: {
            ideal: "environment",
          },
        },
        audio: false,
      });

      streamRef.current = stream;
      setCameraOpen(true);

      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 0);
    } catch {
      setError(
        "Camera access was unavailable. Check your browser permission settings."
      );
    }
  };

  const capturePhoto = () => {
    const video = videoRef.current;

    if (!video || video.videoWidth === 0 || video.videoHeight === 0) {
      setError("The camera is not ready yet.");
      return;
    }

    const canvas = document.createElement("canvas");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setError("The photo could not be captured.");
          return;
        }

        const capturedFile = new File(
          [blob],
          `camera-capture-${Date.now()}.jpg`,
          {
            type: "image/jpeg",
          }
        );

        onCapture(capturedFile);
        stopCamera();
      },
      "image/jpeg",
      0.92
    );
  };

  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Capture a photo</h2>

      <p className="mt-2 text-sm text-slate-600">
        Open your device camera and capture one clear coconut leaf photo.
      </p>

      {!cameraOpen ? (
        <button
          type="button"
          onClick={openCamera}
          className="mt-6 w-full rounded-xl border border-emerald-700 px-5 py-3 font-semibold text-emerald-700 transition hover:bg-emerald-50"
        >
          Open Camera
        </button>
      ) : (
        <div className="mt-6">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="aspect-video w-full rounded-xl bg-black object-cover"
          />

          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={capturePhoto}
              className="flex-1 rounded-lg bg-emerald-700 px-4 py-3 font-semibold text-white hover:bg-emerald-800"
            >
              Capture Photo
            </button>

            <button
              type="button"
              onClick={stopCamera}
              className="rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}