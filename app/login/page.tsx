"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Mail, Lock, ArrowLeft, Shield, Sparkles } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials. Please verify your email and password.");
      setLoading(false);
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-parchment flex flex-col items-center justify-center p-4 relative selection:bg-maroon selection:text-parchment">
      {/* Subtle Ajrak Heritage Watermark Grid */}
      <div className="absolute inset-0 ajrak-subtle-pattern opacity-40 pointer-events-none" />

      {/* Top back to home link */}
      <div className="absolute top-6 left-6 z-10">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-maroon hover:text-indigo px-3 py-1.5 rounded-lg border border-maroon/20 bg-ivory/80 backdrop-blur-xs transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Return to Sindh Connect</span>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        
        {/* Masthead Header with Brand Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block group">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-ivory border border-maroon/30 shadow-md p-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <img 
                src="/logo.png" 
                alt="Sindh Connect" 
                className="w-full h-full object-contain" 
              />
            </div>
          </Link>
          
          <div className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-widest text-maroon pt-1">
            <span>سنڌ ڪنيڪٽ &bull; Staff & Editorial Portal</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-indigo">
            Portal Authentication
          </h1>
          <p className="text-xs text-charcoal/70 font-serif max-w-xs mx-auto leading-relaxed">
            Sign in to manage the cultural archive, approve luminary monographs, and edit traditional crafts.
          </p>
        </div>

        {/* Clean Editorial Card */}
        <div className="bg-ivory border border-maroon/25 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
          {error && (
            <div className="bg-maroon/10 border border-maroon/30 text-maroon p-3.5 rounded-xl text-xs font-medium text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-maroon/70 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="editor@sindhconnect.com"
                  className="w-full bg-parchment border border-maroon/25 rounded-xl py-2.5 pl-10 pr-3 text-xs text-charcoal placeholder-charcoal/40 focus:outline-hidden focus:border-maroon focus:ring-1 focus:ring-maroon transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-charcoal/80 mb-1.5">
                Passcode
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-maroon/70 pointer-events-none" />
                <input
                  type="password"
                  required
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full bg-parchment border border-maroon/25 rounded-xl py-2.5 pl-10 pr-3 text-xs text-charcoal placeholder-charcoal/40 focus:outline-hidden focus:border-maroon focus:ring-1 focus:ring-maroon transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3 rounded-xl bg-maroon hover:bg-maroon-hover text-parchment text-xs font-bold uppercase tracking-wider transition-all shadow-md disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin text-parchment" />
              ) : (
                <>
                  <Shield className="h-4 w-4 text-sand" />
                  <span>Authenticate & Enter CMS</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Footer Cultural Colophon */}
        <p className="text-center text-[11px] text-charcoal/50 font-serif">
          Dedicated to the preservation of 5,000 years of Sindhi civilization.
        </p>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-parchment">
        <Loader2 className="h-8 w-8 text-maroon animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
