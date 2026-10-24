"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("/logo.jpg");

  if (pathname?.startsWith("/admin")) return null;

  const navigation = [
    { name: "Luminaries & Icons", href: "/personalities" },
    { name: "Positive Stories", href: "/blog" },
    { name: "Heritage Archive", href: "/gallery" },
    { name: "Events & Urs", href: "/events" },
    { name: "About the Mission", href: "/about" },
    ...(session?.user && (session.user as any).role === "Admin"
      ? [{ name: "Editorial CMS", href: "/admin" }]
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

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-parchment/95 backdrop-blur-md border-b border-maroon/15 transition-all">
        {/* Ajrak signature decorative top ribbon */}
        <div className="h-1 w-full ajrak-band" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            
            {/* Editorial Brand Masthead */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative">
                <img 
                  src={logoUrl} 
                  alt="Sindh Connect Seal" 
                  className="h-10 w-10 rounded-full object-cover border border-maroon/40 shadow-xs transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-display font-black tracking-tight text-indigo group-hover:text-maroon transition-colors leading-none">
                  SINDH<span className="text-maroon"> CONNECT</span>
                </span>
                <span className="text-[10px] tracking-widest uppercase text-maroon/80 font-medium font-mono mt-1">
                  سنڌ ڪنيڪٽ &bull; Cultural Archive &amp; Magazine
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-all ${
                      isActive
                        ? "text-maroon bg-maroon/10 font-bold"
                        : "text-charcoal hover:text-maroon hover:bg-ivory"
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            {/* Right Action: Editorial CTAs & Auth */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/personalities/submit"
                className="text-xs font-semibold px-3.5 py-2 rounded-md border border-maroon/30 text-maroon hover:bg-maroon hover:text-parchment transition-all inline-flex items-center gap-1.5"
              >
                <span>Nominate a Luminary</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>

              {session ? (
                <button
                  onClick={() => signOut()}
                  className="text-xs font-medium text-charcoal/70 hover:text-maroon px-2 py-1"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/auth/signin"
                  className="text-xs font-medium text-indigo hover:text-maroon px-2 py-1"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 rounded-md text-indigo hover:bg-ivory transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/40 backdrop-blur-xs pt-24 px-4 pb-8 flex flex-col justify-between">
          <div className="bg-parchment rounded-2xl p-6 shadow-xl border border-maroon/20 space-y-4">
            <div className="flex items-center justify-between border-b border-maroon/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-maroon">
                Publication Navigation
              </span>
              <button onClick={() => setIsMobileOpen(false)} className="text-charcoal">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="flex flex-col space-y-2">
              {navigation.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium ${
                    pathname === link.href
                      ? "bg-maroon text-parchment font-bold"
                      : "text-charcoal hover:bg-ivory"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-maroon/10 flex flex-col gap-2">
              <Link
                href="/personalities/submit"
                onClick={() => setIsMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-maroon text-parchment text-xs font-bold"
              >
                Nominate a Hero or Pioneer
              </Link>
              {session ? (
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    signOut();
                  }}
                  className="w-full text-center py-2 text-xs text-charcoal/70"
                >
                  Sign Out
                </button>
              ) : (
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full text-center py-2 text-xs text-indigo font-semibold"
                >
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
