"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Compass, ShieldCheck, Mail } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [logoUrl, setLogoUrl] = useState("/logo.jpg");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  if (pathname?.startsWith("/admin")) return null;

  const links = [
    { name: "Personalities & Pioneers", href: "/personalities" },
    { name: "Positive Stories", href: "/blog" },
    { name: "Heritage Archives", href: "/gallery" },
    { name: "Sindh Festivals & Events", href: "/events" },
    { name: "About The Mission", href: "/about" },
    { name: "Submit a Hero / Creator", href: "/personalities/submit" }
  ];

  const heritageCategories = [
    "Indus Valley & Mohenjo-daro",
    "Sufi Saints & Mysticism",
    "Ajrak & Traditional Crafts",
    "Top Digital Creators",
    "Sindh Visionary Leaders"
  ];

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.logoUrl) {
          setLogoUrl(data.logoUrl);
        }
      })
      .catch(() => {});
  }, []);

  const handleSubscribe = async () => {
    if (!email || !email.includes("@")) {
      setStatus("Please enter a valid email address.");
      return;
    }
    setStatus("Subscribing...");
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Welcome to Sindh Connect family!");
        setEmail("");
      } else {
        setStatus(data.error || "Subscription failed.");
      }
    } catch (err) {
      setStatus("Failed to subscribe due to connection error.");
    }
  };

  return (
    <footer className="relative border-t border-[#801020]/40 bg-[#070204] text-neutral-400 py-16 px-6 font-sans overflow-hidden">
      {/* Decorative top border in Ajrak gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#801020] via-[#d4af37] to-[#0c1c38]" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Brand identity block */}
        <div className="md:col-span-5 space-y-6">
          <div className="flex items-center gap-3">
            <img 
              src={logoUrl} 
              alt="Sindh Connect Logo" 
              className="h-12 w-12 rounded-full object-cover border-2 border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.3)]"
            />
            <div>
              <span className="text-xl font-display font-black tracking-wider text-white block">
                SINDH<span className="text-[#d4af37]">CONNECT</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37]/80">
                سنڌ جي ثقافت، تاريخ ۽ ڪردار
              </span>
            </div>
          </div>
          <p className="text-sm text-neutral-400 font-light leading-relaxed max-w-sm">
            Sindh Connect is the premier digital chronicle archiving the ancient legacy of the Indus Civilization, honoring Sindh’s spiritual teachers, pioneering creators, impactful leaders, and illuminating every inspiring triumph across the land.
          </p>
          <div className="flex items-center gap-2 text-xs text-[#d4af37]">
            <span className="px-2.5 py-1 rounded bg-[#801020]/30 border border-[#801020]/60">5000+ Years of History</span>
            <span className="px-2.5 py-1 rounded bg-[#0c1c38]/40 border border-[#0c1c38]/80">Ajrak & Sufi Heritage</span>
          </div>
        </div>

        {/* Navigation links block */}
        <div className="md:col-span-3 space-y-4">
          <h4 className="text-xs font-bold tracking-widest uppercase text-[#d4af37] border-b border-[#801020]/30 pb-2">
            Explore Sindh
          </h4>
          <ul className="space-y-2.5 text-sm">
            {links.map((link) => (
              <li key={link.name}>
                <Link 
                  href={link.href}
                  className="hover:text-[#d4af37] transition-colors duration-200 flex items-center gap-1.5"
                >
                  <span className="text-[#801020] text-xs">◆</span> {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Newsletter signup block */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs font-bold tracking-widest uppercase text-[#d4af37] border-b border-[#801020]/30 pb-2">
            Stay Connected
          </h4>
          <p className="text-sm text-neutral-400 font-light leading-relaxed">
            Get regular digests highlighting top Sindhi creators, historic deep-dives, cultural events, and positive change stories.
          </p>
          <div className="space-y-2">
            <div className="flex gap-2 max-w-sm pt-1">
              <input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#140b0f] border border-[#801020]/60 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] flex-grow"
              />
              <button 
                onClick={handleSubscribe}
                className="bg-gradient-to-r from-[#801020] to-[#a01428] hover:from-[#a01428] hover:to-[#801020] text-white text-xs font-bold px-4 py-2.5 rounded-lg border border-[#d4af37]/50 shadow-md transition-all duration-200 uppercase tracking-wider whitespace-nowrap"
              >
                Join
              </button>
            </div>
            {status && (
              <p className={`text-xs ${status.includes("Welcome") ? "text-emerald-400" : "text-[#d4af37]"}`}>
                {status}
              </p>
            )}
          </div>
        </div>

      </div>

      {/* Footer bottom */}
      <div className="max-w-7xl mx-auto border-t border-[#801020]/30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-neutral-500 gap-4">
        <div className="flex flex-col gap-1 items-center md:items-start">
          <span>
            &copy; {new Date().getFullYear()} Sindh Connect. All rights reserved.
          </span>
          <span className="font-light text-[#d4af37]/80">
            Dedicated to the rich heritage, peaceful spirit, and people of Sindh.
          </span>
        </div>
        <div className="flex items-center text-neutral-400 hover:text-[#d4af37] transition-colors">
          <a href="https://www.technosedigital.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
            Engineered by <span className="font-bold text-white">Technose Digital</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
