"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();
  const [logoUrl, setLogoUrl] = useState("/logo.jpg");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  if (pathname?.startsWith("/admin")) return null;

  const editorialLinks = [
    { name: "Luminaries & Pioneers", href: "/personalities" },
    { name: "Positive Stories & Essays", href: "/blog" },
    { name: "Heritage & Monument Archive", href: "/gallery" },
    { name: "Sindh Cultural Gatherings & Urs", href: "/events" },
    { name: "Mission & Editorial Charter", href: "/about" },
    { name: "Nominate a Cultural Icon", href: "/personalities/submit" }
  ];

  const heritageCategories = [
    "Indus Valley & Mohenjo-daro Civil Settlement",
    "Shah Abdul Latif Bhittai & Sufi Mysticism",
    "Ajrak, Kashikari & Hala Crafts",
    "Contemporary Digital Creators & Storytellers",
    "Grassroots Public Servants & Innovators"
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

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setStatus("Please provide a valid email address.");
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
        setStatus("Thank you for subscribing to Sindh Connect dispatch.");
        setEmail("");
      } else {
        setStatus(data.error || "Subscription unsuccessful.");
      }
    } catch {
      setStatus("Connection error occurred. Please try again.");
    }
  };

  return (
    <footer className="border-t border-[#702B35]/20 bg-[#173C50] text-[#F4EEE2] pt-16 pb-12 font-sans">
      {/* Decorative Ajrak Tri-tone Ribbon */}
      <div className="h-1 w-full bg-gradient-to-r from-[#702B35] via-[#C3A36A] to-[#173C50] -mt-16 mb-16" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          
          {/* Masthead & Publication Statement */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src={logoUrl} 
                alt="Sindh Connect Logo" 
                className="h-10 w-10 rounded-full object-cover border border-[#C3A36A]/50" 
              />
              <div>
                <span className="text-xl font-display font-black tracking-wider text-white">
                  SINDH<span className="text-[#C3A36A]"> CONNECT</span>
                </span>
                <span className="block text-[10px] tracking-widest uppercase text-white/60 font-mono">
                  سنڌ ڪنيڪٽ &bull; An Open Cultural Archive
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
              An independent cultural publication and digital museum dedicated to safeguarding 5,000 years of Indus civilization, classical Sindhi poetry, monumental heritage, and the modern innovators shaping Sindh’s constructive future.
            </p>

            <div className="pt-2">
              <p className="text-xs text-[#C3A36A] font-serif italic">
                "جيئي سنڌ، سدائين گُلزار سنڌ — May Sindh flourish in peace, knowledge, and harmony."
              </p>
            </div>
          </div>

          {/* Publication Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C3A36A]">
              Archive Indices
            </h4>
            <ul className="space-y-2 text-xs">
              {editorialLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-white/70 hover:text-white transition-colors inline-flex items-center gap-1 group"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Curated Heritage Focus */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#C3A36A]">
              The Weekly Cultural Dispatch
            </h4>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              Receive curated essays on Sindh’s history, rare photographic archives, and profiles of grassroots changemakers directly in your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="reader@domain.com"
                  className="flex-1 px-3 py-2 text-xs rounded-md bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-hidden focus:border-[#C3A36A]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#702B35] hover:bg-[#853440] text-white text-xs font-semibold rounded-md transition-colors shrink-0"
                >
                  Subscribe
                </button>
              </div>
              {status && (
                <p className="text-[11px] text-[#C3A36A]">{status}</p>
              )}
            </form>
          </div>

        </div>

        {/* Colophon & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-light">
          <p>
            &copy; {new Date().getFullYear()} Sindh Connect. Dedicated to the civilizational memory of Sindh.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">
              Editorial Charter
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy & Archive Standards
            </Link>
            <Link href="/admin" className="hover:text-white transition-colors">
              Staff Portal
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
