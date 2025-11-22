"use client";

import ConfidenceBar from "./ConfidenceBar";

export default function ResultsTable({ detections, sortBy }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow overflow-x-auto">
      <div className="flex justify-between mb-4">
        <h2 className="font-semibold text-lg">Detection Results</h2>
        <button className="text-blue-600 text-sm">Sortable</button>
      </div>

      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th onClick={() => sortBy("class_name")}>OBJECT ▲▼</th>
              <th onClick={() => sortBy("confidence")}>CONFIDENCE ▲▼</th>
              <th onClick={() => sortBy("x_min")}>BOUNDING BOX ▲▼</th>
            </tr>
          </thead>
          <tbody>
            {detections.map((d) => (
              <tr key={d.id}>
                <td>{d.class_name}</td>
                <td>
                  <ConfidenceBar value={d.confidence} />
                </td>
                <td>
                  ({Math.round(d.x_min)}, {Math.round(d.y_min)},{" "}
                  {Math.round(d.x_max)}, {Math.round(d.y_max)})
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
