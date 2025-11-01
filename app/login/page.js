"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { assets } from "@/app/assets/assets";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill both fields");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/api/auth/login", {
        email,
        password,
      });

      if (res.status === 200) {
        setSuccess(true);
        setRedirecting(true);
        router.prefetch("/");
        
        setTimeout(() => {
          router.replace("/");
        }, 1200);

        return;
      } else {
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#151517] px-4 py-12 relative">

      {/* Success Loader Overlay */}
      {redirecting && (
        <div className="absolute inset-0 flex flex-col gap-3 justify-center items-center bg-black/70 backdrop-blur-md z-50 rounded-2xl transition-all duration-500">
          
          {!success && (
            <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          )}

          {success && (
            <div className="flex flex-col items-center animate-fade-in">
              <div className="w-14 h-14 bg-white text-black rounded-full flex justify-center items-center scale-110 animate-bounce">
                Hii..
              </div>
              <p className="text-white text-lg mt-2">Welcome Back!</p>
            </div>
          )}

          <p className="text-gray-300 text-sm">Redirecting...</p>
        </div>
      )}

      <div className="max-w-md w-full bg-[#1b1b1c]/80 backdrop-blur-md border border-[#25252F] rounded-2xl shadow-2xl p-6 sm:p-10">

        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-10 h-10">
            <Image src={assets.logo_icon} alt="DeepSeek" fill className="object-contain" />
          </div>
          <h1 className="text-2xl text-white font-semibold">DeepSeek</h1>
        </div>

        <h2 className="text-gray-300 text-lg font-medium mb-4">Welcome back</h2>

        {error && (
          <div className="text-sm text-red-500 bg-red-500/10 border border-red-500/40 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="block w-full rounded-md bg-[#1b1b1c] text-white border border-[#2A2A36] shadow-sm p-3 focus:border-indigo-500 outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="block w-full rounded-md bg-[#1b1b1c] text-white border border-[#2A2A36] shadow-sm p-3 pr-10 focus:border-indigo-500 outline-none"
            />

            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-3 text-xs text-indigo-400 hover:text-indigo-300"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="cursor-pointer w-full rounded-md bg-indigo-600 text-white py-3 font-medium hover:bg-indigo-500 shadow-lg shadow-indigo-900/40 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="text-indigo-400 hover:underline"
          >
            Sign up
          </button>
        </div>

      </div>
    </div>
  );
}
