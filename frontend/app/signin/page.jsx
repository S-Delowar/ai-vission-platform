"use client";

import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { loginUser } from "@/lib/api";
import Link from "next/link";
import Cookies from "js-cookie";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(email, password);
      Cookies.set("access", result.data.access);
      Cookies.set("refresh", result.data.refresh);
      alert("Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
        console.log(err)
      alert("Invalid credentials");
    }
  };

  return (
    <AuthLayout title="Welcome Back">
      <form className="space-y-6" onSubmit={handleLogin}>
        <div>
          <label className="text-sm">Email Address</label>
          <input
            type="email"
            className="w-full border p-3 rounded mt-1"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm">Password</label>
          <input
            type="password"
            className="w-full border p-3 rounded mt-1"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded font-semibold cursor-pointer"
        >
          Sign In
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 font-semibold ">
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
