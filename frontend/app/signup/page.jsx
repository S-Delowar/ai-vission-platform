"use client";

import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import { signupUser } from "@/lib/api";
import Link from "next/link";
import Cookies from "js-cookie";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const result = await signupUser(email, username, password);
      Cookies.set("access", result.data.access);
      Cookies.set("refresh", result.data.refresh);
      alert("Account created! You are now logged in.");
      window.location.href = "/dashboard";
    } catch (err) {
      alert("Signup failed: " + err.message);
    }
  };

  return (
    <AuthLayout title="Create an Account">
      <form className="space-y-6" onSubmit={handleSignup}>
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
          <label className="text-sm">Username</label>
          <input
            type="text"
            className="w-full border p-3 rounded mt-1"
            placeholder="example2"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm">Password</label>
          <input
            type="password"
            className="w-full border p-3 rounded mt-1"
            placeholder="Create a password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-700 text-white py-3 rounded font-semibold cursor-pointer"
        >
          Sign Up
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="text-blue-600 font-semibold">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
