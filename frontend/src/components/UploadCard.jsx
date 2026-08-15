export default function UploadCard({
  selectedFile,
  previewUrl,
  onFileChange,
  onClear,
}) {
  const handleChange = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      onFileChange(file);
    }

    event.target.value = "";
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-900">Upload an image</h2>

      <p className="mt-2 text-sm text-slate-600">
        Choose a clear JPG, JPEG, or PNG image of a coconut leaf.
      </p>

      <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-300 bg-emerald-50 px-6 py-10 text-center transition hover:border-emerald-500 hover:bg-emerald-100">
        <span className="text-4xl">📁</span>

        <span className="mt-3 font-semibold text-emerald-800">
          Choose image
        </span>

        <span className="mt-1 text-sm text-slate-500">
          JPG, JPEG, or PNG
        </span>

        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleChange}
          className="hidden"
        />
      </label>

      {selectedFile && (
        <div className="mt-5">
          <img
            src={previewUrl}
            alt="Selected coconut leaf"
            className="h-64 w-full rounded-xl object-contain bg-slate-100"
          />

          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="truncate text-sm text-slate-600">
              {selectedFile.name}
            </p>

            <button
              type="button"
              onClick={onClear}
              className="text-sm font-semibold text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </div>
  );
}