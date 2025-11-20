"use client";
import Cookies from "js-cookie";

export default function Topbar() {
  const logout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    window.location.href = "/signin";
  };

  return (
    <div className="w-full bg-white shadow-sm px-10 py-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">AI Vision Platform</h1>

      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-semibold">John Doe</div>
          <div className="text-gray-500 text-sm">john@example.com</div>
        </div>
        <button
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 cursor-pointer"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
