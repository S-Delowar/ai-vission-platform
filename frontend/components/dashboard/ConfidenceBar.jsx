export default function ConfidenceBar({ value }) {
  const percent = (value * 100).toFixed(0);
  return (
    <div className="flex items-center gap-3">
      {/* Bar Container */}
      <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden">
        
        {/* Fill Bar */}
        <div
          className="h-2 bg-green-500 rounded-full transition-all"
          style={{ width: `${percent}%` }}
        ></div>
      </div>

      {/* Percentage */}
      <span className="text-gray-800 font-semibold text-sm">
        {percent}%
      </span>
    </div>
  );
}
