"use client"

import { useState } from "react";
import Topbar from "../../components/dashboard/Topbar";
import UploadSection from "../../components/dashboard/UploadSection";
import AnnotatedImageCard from "../../components/dashboard/AnnotatedImageCard";
import ResultsTable from "../../components/dashboard/ResultsTable";
import { uploadAndDetect } from "../../lib/api";
import SelectedImagePreview from "../../components/dashboard/SelectedImagePreview";
import ChatSection from "../../components/dashboard/ChatSection";


export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [annotated, setAnnotated] = useState(null);
  const [detections, setDetections] = useState([]);
  const [imageId, setImageId] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });

  // Select image
  const onSelectFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setAnnotated(null);
    setDetections([]);
  };

  // Remove image
  const onRemove = () => {
    setFile(null);
    setPreview(null);
    setAnnotated(null);
    setDetections([]);
  };

  // Upload image and detect objects
  const onDetect = async () => {
    const formData = new FormData();
    formData.append("image", file)

    const res = await uploadAndDetect(formData);
    console.log("Image upload response: ",res);
    setAnnotated(res.data.annotated);
    setDetections(res.data.detections);
    setImageId(res.data.id);
  };

  // Sorting handler
  const sortBy = (key) => {
    let direction = sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sorted = [...detections].sort((a, b) => {
      if (direction === "asc") return a[key] > b[key] ? 1 : -1;
      return a[key] < b[key] ? 1 : -1;
    });

    setDetections(sorted);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar />
      <div className="p-10 max-w-7xl mx-auto">
        <UploadSection
          onSelectFile={onSelectFile}
          file={file}
        />

        {/* Selected Image preview + buttons */}
        {preview && (
          <SelectedImagePreview
            preview={preview}
            onDetect={onDetect}
            onRemove={onRemove}
          />
        )}

        {/* Results */}
        {annotated && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnnotatedImageCard annotated={annotated} detections={detections} />

            <ResultsTable
              detections={detections}
              sortBy={sortBy}
            />
          </div>
        )}

        {/* Chat section */}
        {annotated && (
          <ChatSection imageId={imageId} />
        )}
      </div>
    </div>
  );
}