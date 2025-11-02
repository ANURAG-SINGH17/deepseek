"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { assets } from "@/app/assets/assets";

export default function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("");

    if(!name || !email || !password || !confirmPassword){
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try{
      setLoading(true);
      const res = await fetch("/api/auth/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({name,email,password})
      });

      const data = await res.json();
      if(!res.ok){
        setError(data.message || "Signup failed");
        return;
      }

      router.push("/signup");
    }catch(err){
      setError("Something went wrong");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden flex items-center justify-center bg-[#151517] text-white px-4 py-12">
      <div className="max-w-md w-full rounded-2xl bg-[#1b1b1c] p-3 sm:p-10 shadow-lg border border-[#2A3040]">
        
        {/* LOGO */}
        <div className="flex items-center gap-3 mb-5">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image
              src={assets.logo_icon}
              alt="DeepSeek"
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <h1 className="text-2xl font-semibold">DeepSeek</h1>
        </div>

        <h2 className="text-gray-200 text-lg font-medium mb-4">Create Account</h2>
        <p className="text-sm text-gray-400 mb-6">Sign up to continue</p>

        {error && (
          <div className="text-sm text-red-400 bg-red-900/20 p-3 rounded-md mb-4 border border-red-700/30">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <label className="block">
            <span className="text-sm text-gray-300">Full Name</span>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Enter your full name"
              className="mt-1 block w-full rounded-md bg-[#1b1b1c] border border-[#2A3040] shadow-sm focus:border-indigo-500 p-3 text-white"
              required
            />
          </label>
          
          <label className="block">
            <span className="text-sm text-gray-300">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="you@domain.com"
              className="mt-1 block w-full rounded-md bg-[#1b1b1c] border border-[#2A3040] shadow-sm focus:border-indigo-500 p-3 text-white"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">New Password</span>
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Create password"
              className="mt-1 block w-full rounded-md bg-[#1b1b1c] border border-[#2A3040] shadow-sm focus:border-indigo-500 p-3 text-white"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm text-gray-300">Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e)=>setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              className="mt-1 block w-full rounded-md bg-[#1b1b1c] border border-[#2A3040] shadow-sm focus:border-indigo-500 p-3 text-white"
              required
            />
          </label>

          <button
            type="submit"
            className="w-full inline-flex items-center justify-center rounded-md bg-indigo-600 text-white py-3 font-medium shadow-md hover:bg-indigo-700 disabled:opacity-60 transition-all"
            disabled={loading}
          >
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <button onClick={()=>router.push("/login")} className="text-indigo-400 hover:underline">
            Login
          </button>
        </div>

      </div>
    </div>
  );
}
