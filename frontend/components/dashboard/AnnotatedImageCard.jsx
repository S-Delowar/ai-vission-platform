export default function AnnotatedImageCard({ annotated, detections }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Annotated Image</h2>
        <div className="text-blue-600 text-sm">
          {detections.length} Objects
        </div>
      </div>

      <img
        src={annotated}
        alt="Annotated"
        className="rounded-lg border"
      />
    </div>
  );
}
