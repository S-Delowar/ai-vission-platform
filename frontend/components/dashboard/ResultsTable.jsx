"use client";

import ConfidenceBar from "./ConfidenceBar";

export default function ResultsTable({ detections, sortBy }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Detection Results</h2>
        <button className="text-blue-600 text-sm">Sortable</button>
      </div>

      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b">
            <th
              className="pb-3 px-4 min-w-[150px] cursor-pointer"
              onClick={() => sortBy("class_name")}
            >
              OBJECT ▲▼
            </th>
            <th
              className="pb-3 px-4 min-w-[200px] cursor-pointer"
              onClick={() => sortBy("confidence")}
            >
              CONFIDENCE ▲▼
            </th>
            <th className="pb-3 px-4 min-w-[250px] cursor-pointer" onClick={() => sortBy("x_min")}>
              BOUNDING BOX ▲▼
            </th>
          </tr>
        </thead>

        <tbody>
          {detections.map((d) => (
            <tr key={d.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 whitespace-nowrap">{d.class_name}</td>
              <td className="py-3 px-4 min-w-[200px]">
                <ConfidenceBar value={d.confidence} />
              </td>

              <td className="py-3 px-4 text-sm text-gray-600 whitespace-nowrap0">
                ({Math.round(d.x_min)}, {Math.round(d.y_min)},{" "}
                {Math.round(d.x_max)}, {Math.round(d.y_max)})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
