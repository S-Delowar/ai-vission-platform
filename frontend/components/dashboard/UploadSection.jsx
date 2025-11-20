"use client";

import { FaUpload } from "react-icons/fa";

export default function UploadSection({ onSelectFile, onUpload, file }) {
  return (
    <div className="bg-white p-8 rounded-lg shadow mb-10">
      <h2 className="text-xl font-semibold mb-2">Upload Image for Detection</h2>
      <p className="text-gray-500 mb-6">
        Upload an image to detect objects using our advanced YOLO model
      </p>

      <div
        className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
        onDrop={(e) => {
          e.preventDefault();
          onSelectFile(e.dataTransfer.files[0]);
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <FaUpload className="mx-auto text-3xl text-gray-400 mb-4" />
        <p className="font-medium mb-1">Drop your image here</p>
        <p className="text-gray-500 text-sm">or click to browse</p>

        <input
          type="file"
          className="hidden"
          id="fileInput"
          accept="image/*"
          onChange={(e) => onSelectFile(e.target.files[0])}
        />

        <button
          onClick={() => document.getElementById("fileInput").click()}
          className="mt-4 px-5 py-2 bg-blue-600 text-white rounded"
        >
          Select Image
        </button>
      </div>
    </div>
  );
}
