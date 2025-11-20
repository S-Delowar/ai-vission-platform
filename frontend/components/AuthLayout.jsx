export default function AuthLayout({ children, title }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-xl flex flex-col md:flex-row w-full max-w-5xl overflow-hidden">
        
        {/* Left Section */}
        <div className="bg-blue-700 text-white p-10 md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">AI Vision Platform</h1>
          <p className="text-blue-100 mb-8 text-sm leading-relaxed">
            Advanced object detection and intelligent analysis powered by
            state-of-the-art machine learning models.
          </p>

          <div className="space-y-6">
            <Feature icon="✔" title="YOLO Object Detection" desc="Real-time detection with high accuracy." />
            <Feature icon="⭕" title="AI-Powered Q&A" desc="Ask questions about detected objects." />
            <Feature icon="🔲" title="Interactive Analysis"
              desc="Visual results with bounding boxes and confidence scores." />
          </div>
        </div>

        {/* Right Section */}
        <div className="p-10 w-full md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">{title}</h2>
          {children}
        </div>

      </div>
    </div>
  );
}

function Feature({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm opacity-80">{desc}</p>
      </div>
    </div>
  );
}
