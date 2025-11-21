import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function ChatMessageBubble({ role, text }) {
  const [username, setUsername] = useState("");

  // load username and email from cookies
    useEffect(() => {
      setUsername(Cookies.get("username"));
    }, []);

  const isUser = role === "user";

  return (
    <div
      className={`flex items-start gap-3 mb-5 ${
        isUser ? "flex-row-reverse" : ""
      }`}
    >
      {/* Avatar */}
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white
        ${
          isUser
            ? "bg-gradient-to-br from-pink-500 to-rose-600"
            : "bg-gradient-to-br from-purple-500 to-purple-700"
        }`}
      >
        {isUser ? username?.slice(0, 2).toUpperCase() : "AI"}
      </div>

      {/* Bubble */}
      <div
        className={`
          max-w-[75%] px-5 py-3 rounded-xl text-sm leading-relaxed
          ${
            isUser
              ? "bg-blue-600 text-white rounded-br-md"
              : "bg-white text-gray-800 border border-gray-200 rounded-bl-md"
          }
        `}
      >
        {text}
      </div>
    </div>
  );
}
