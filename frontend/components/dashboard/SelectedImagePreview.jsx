"use client";

export default function SelectedImagePreview({
  preview,
  onDetect,
  onRemove
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mb-10">
      <h2 className="text-xl font-semibold mb-4">Selected Image</h2>

      <div className="flex flex-col md:flex-row items-start gap-6">
        
        {/* LEFT: IMAGE PREVIEW */}
        <img
          src={preview}
          alt="Preview"
          className="w-full md:w-1/2 rounded-lg border"
        />

        {/* RIGHT: BUTTONS */}
        <div className="flex flex-col justify-center gap-4 w-full md:w-1/2">

          <button
            onClick={onDetect}
            className="w-40 px-4 py-2 rounded-lg text-white
             bg-gradient-to-r from-green-500 to-green-600
             shadow-md hover:opacity-90 transition cursor-pointer"
          >
            Detect Objects
          </button>

          <button
            onClick={onRemove}
            className="w-40 px-4 py-2 rounded-lg
             border border-red-400 text-red-500 bg-white
             hover:bg-red-50 shadow-sm transition cursor-pointer"
          >
            Remove Image
          </button>

        </div>

      </div>
    </div>
  );
}
