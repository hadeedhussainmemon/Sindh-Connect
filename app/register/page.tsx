"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, UserPlus, Mail, Lock, User, LogIn, ArrowRight, CheckCircle2 } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/login");
        }, 2200);
      } else {
        const data = await res.json();
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Network error occurred. Please check connection.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 text-center py-16">
        <div className="w-20 h-20 bg-[#770b1b]/30 border-2 border-[#cfa83b] rounded-full flex items-center justify-center mb-6 shadow-[0_0_24px_rgba(207,168,59,0.4)]">
          <CheckCircle2 className="h-10 w-10 text-[#cfa83b]" />
        </div>
        <h1 className="text-3xl font-display font-black text-white mb-3">
          Welcome to Sindh Connect!
        </h1>
        <p className="text-neutral-300 max-w-md text-sm leading-relaxed mb-6">
          Your account has been created successfully. Redirecting you to the sign-in portal...
        </p>
        <span className="text-xs text-[#cfa83b] bg-[#770b1b]/30 border border-[#770b1b]/60 px-4 py-1.5 rounded-full font-mono">
          Loading credentials portal...
        </span>
      </div>
    );
  }

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 sm:py-16">
      <div className="w-full max-w-md">
        
        {/* Top Cultural Badge */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group mb-4">
            <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-[#12070a] border-2 border-[#cfa83b]/60 shadow-[0_0_24px_rgba(119,11,27,0.4)] group-hover:scale-105 transition-transform duration-300">
              <span className="text-2xl font-black text-[#cfa83b]">S</span>
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#770b1b] text-[8px] text-white border border-[#cfa83b]">
                ★
              </span>
            </div>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#770b1b]/20 border border-[#cfa83b]/35 text-[11px] font-bold text-[#f5d475] mb-2 uppercase tracking-wider">
            سنڌ ڪنيڪٽ &bull; Join The Movement
          </div>
          <h1 className="text-3xl font-display font-black text-white">
            Create an Account
          </h1>
          <p className="text-neutral-400 text-xs sm:text-sm mt-1">
            Join Sindh Connect to nominate heroes, preserve history, and stay updated.
          </p>
        </div>

        {/* Card Form */}
        <div className="bg-[#12070a] border border-[#770b1b]/45 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle Ajrak background glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#770b1b]/20 rounded-full blur-3xl pointer-events-none" />

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-300 p-3.5 rounded-xl text-xs sm:text-sm text-center mb-6">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-3.5 h-4 w-4 text-[#cfa83b]" />
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-[#1b0c11] border border-[#770b1b]/50 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:border-[#cfa83b] focus:outline-none transition-all placeholder-neutral-500"
                  placeholder="e.g. Shahbaz Ali"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 h-4 w-4 text-[#cfa83b]" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#1b0c11] border border-[#770b1b]/50 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:border-[#cfa83b] focus:outline-none transition-all placeholder-neutral-500"
                  placeholder="name@domain.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 h-4 w-4 text-[#cfa83b]" />
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full bg-[#1b0c11] border border-[#770b1b]/50 rounded-xl py-3 pl-11 pr-4 text-white text-sm focus:border-[#cfa83b] focus:outline-none transition-all placeholder-neutral-500"
                  placeholder="Choose a strong password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#770b1b] to-[#981326] hover:from-[#981326] hover:to-[#b0172e] text-[#f7eee1] font-bold py-3.5 rounded-xl transition-all border border-[#cfa83b]/50 shadow-[0_4px_20px_rgba(119,11,27,0.4)] disabled:opacity-50 flex justify-center items-center gap-2 mt-4 text-sm uppercase tracking-wider"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-[#cfa83b]" />
              ) : (
                <>
                  <UserPlus className="h-4 w-4 text-[#cfa83b]" />
                  <span>Join Sindh Connect</span>
                </>
              )}
            </button>
          </form>

          {/* Bottom Link to Login */}
          <div className="mt-8 text-center text-xs text-neutral-400 border-t border-[#770b1b]/30 pt-6">
            <span>Already a member?</span>{" "}
            <Link 
              href="/login" 
              className="text-[#cfa83b] font-bold hover:text-[#f5d475] inline-flex items-center gap-1 hover:underline ml-1"
            >
              <span>Sign in here</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
