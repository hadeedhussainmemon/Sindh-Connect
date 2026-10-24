"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Sparkles, Feather, Compass } from "lucide-react";
import { animate } from "animejs";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/logo.jpg");
  const menuRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  if (pathname?.startsWith("/admin")) return null;

  const navigation = [
    { name: "Personalities & Icons", href: "/personalities" },
    { name: "Positive Sindh Stories", href: "/blog" },
    { name: "Heritage & Gallery", href: "/gallery" },
    { name: "Cultural Events", href: "/events" },
    { name: "About Sindh Connect", href: "/about" },
    ...(session?.user && (session.user as any).role === "Admin"
      ? [{ name: "Admin CMS", href: "/admin" }]
      : [])
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

  useEffect(() => {
    if (isMobileOpen && sidebarRef.current) {
      animate(sidebarRef.current, {
        translateX: ["100%", "0%"],
        duration: 350,
        easing: "easeOutQuad"
      });
    }
  }, [isMobileOpen]);

  const closeMobileMenu = () => {
    if (sidebarRef.current) {
      animate(sidebarRef.current, {
        translateX: ["0%", "100%"],
        duration: 300,
        easing: "easeInQuad",
        complete: () => setIsMobileOpen(false)
      });
    } else {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      <nav ref={menuRef} className={`fixed top-0 left-0 right-0 border-b border-[#801020]/40 bg-[#090305]/90 backdrop-blur-xl transition-all shadow-[0_4px_24px_rgba(0,0,0,0.6)] ${isMobileOpen ? 'z-[9999]' : 'z-50'}`}>
        {/* Top traditional Ajrak ribbon */}
        <div className="h-1 w-full bg-gradient-to-r from-[#801020] via-[#d4af37] to-[#0c1c38]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src={logoUrl} 
                  alt="Sindh Connect Logo" 
                  className="h-11 w-11 rounded-full object-cover border-2 border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.35)] transition-transform duration-300 group-hover:scale-105" 
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#801020] text-[9px] text-[#f4ede2] border border-[#d4af37]">
                  ★
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-display font-black tracking-wider text-white group-hover:text-[#d4af37] transition-colors">
                  SINDH<span className="text-[#d4af37]">CONNECT</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-medium">
                  سنڌ ڪنيڪٽ &bull; Heritage & Icons
                </span>
              </div>
            </Link>

            {/* Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`px-3.5 py-2 text-sm font-semibold tracking-wide rounded-lg transition-all duration-200 ${
                      isActive 
                        ? "text-[#d4af37] bg-[#801020]/25 border border-[#801020]/50" 
                        : "text-neutral-300 hover:text-[#d4af37] hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Action Icons & Search */}
            <div className="flex items-center gap-3">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const q = (form.elements.namedItem('q') as HTMLInputElement).value;
                  if (q.trim()) {
                    window.location.href = `/search?q=${encodeURIComponent(q.trim())}`;
                  }
                }}
                className="relative hidden sm:block w-48 xl:w-64"
              >
                <input 
                  type="text" 
                  name="q"
                  placeholder="Search creators, history..." 
                  className="w-full bg-[#140b0f] text-neutral-200 placeholder-neutral-500 text-xs px-3.5 py-2 pl-9 rounded-full border border-[#801020]/40 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                />
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#d4af37]" />
              </form>

              {session?.user ? (
                <div className="flex items-center gap-2">
                  <span className="hidden md:inline text-xs text-[#d4af37] font-medium bg-[#801020]/20 px-2.5 py-1 rounded-full border border-[#801020]/40">
                    {session.user.name || "User"}
                  </span>
                  <button 
                    onClick={() => signOut()}
                    className="text-xs bg-[#801020] hover:bg-[#9c1427] text-white px-3 py-1.5 rounded-lg border border-[#d4af37]/40 font-semibold transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-xs bg-gradient-to-r from-[#801020] to-[#600c18] hover:from-[#9c1427] hover:to-[#801020] text-[#f4ede2] px-4 py-2 rounded-lg font-bold border border-[#d4af37]/40 shadow-sm transition-all"
                >
                  Join / Sign In
                </Link>
              )}

              {/* Mobile menu trigger */}
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="lg:hidden p-2 text-neutral-300 hover:text-[#d4af37] rounded-lg border border-[#801020]/30 hover:bg-[#801020]/20 transition-colors"
                aria-label="Toggle Navigation"
              >
                {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-[10000] lg:hidden bg-black/80 backdrop-blur-md">
          <div 
            ref={sidebarRef} 
            className="fixed right-0 top-0 bottom-0 w-80 bg-[#0d0508] border-l border-[#801020]/50 p-6 flex flex-col justify-between shadow-2xl"
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#801020]/40">
                <div className="flex items-center gap-2">
                  <img src={logoUrl} alt="Logo" className="h-9 w-9 rounded-full border border-[#d4af37]" />
                  <span className="font-display font-extrabold text-white text-base">SINDH CONNECT</span>
                </div>
                <button 
                  onClick={closeMobileMenu} 
                  className="p-1 text-neutral-400 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="mt-6 flex flex-col space-y-2">
                {navigation.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={closeMobileMenu}
                    className="px-4 py-3 text-sm font-semibold text-neutral-200 hover:text-[#d4af37] hover:bg-[#801020]/20 rounded-lg transition-colors border border-transparent hover:border-[#801020]/40"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-[#801020]/40 text-xs text-neutral-400">
              <p className="text-center font-display text-[#d4af37]">جيئي سنڌ، جيئي پاڪستان</p>
              <p className="text-center mt-1 text-[11px] text-neutral-500">Documenting heritage & modern icons</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
