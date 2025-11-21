"use client";

import { useState, useRef, useEffect } from "react";
import ChatMessageBubble from "./ChatMessageBubble";
import API from "@/lib/api";
import { askGemini } from "../../lib/api";

export default function ChatSection({ imageId }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const question = input;
    setInput("");

    // CALL BACKEND
    const res = await askGemini(imageId, question);

    const aiMsg = { role: "ai", text: res.data.answer };
    setMessages((prev) => [...prev, aiMsg]);
  };

  // Auto scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-white p-6 rounded-2xl shadow border border-gray-200 mt-8">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl flex items-center justify-center">
          <svg className="w-7 h-7 text-white" fill="none" strokeWidth="2.5" stroke="white" viewBox="0 0 24 24">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"></path>
          </svg>
        </div>
        <div>
          <h3 className="font-bold text-lg">Ask Questions About Results</h3>
          <p className="text-gray-500 text-sm -mt-1">Powered by Gemini 2.5 Flash</p>
        </div>
      </div>

      {/* Chat scroll area */}
      <div
        ref={chatRef}
        className="max-h-[350px] overflow-y-auto p-5 bg-gray-50 rounded-xl border border-gray-200 mb-5"
      >
        {messages.length === 0 && (
          <p className="text-gray-400 text-center py-10">
            Ask a question about the detected objects...
          </p>
        )}

        {messages.map((msg, index) => (
          <ChatMessageBubble key={index} role={msg.role} text={msg.text} />
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          className="
            flex-1 px-4 py-3 rounded-xl border border-gray-300
            focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-200
          "
          placeholder="Ask a question about the detected objects..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button
          onClick={sendMessage}
          className="
            px-6 py-3 rounded-xl text-white font-semibold
            bg-gradient-to-br from-purple-500 to-purple-700 cursor-pointer
          "
        >
          Send
        </button>
      </div>

    </div>
  );
}
