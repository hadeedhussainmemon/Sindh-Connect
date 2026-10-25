"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { 
  Menu, X, ArrowUpRight, Search, ChevronDown, 
  ShoppingBag, Award, BookOpen, ImageIcon, Calendar, 
  Info, PlusCircle, Shield
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import LanguageToggle from "@/components/common/LanguageToggle";
import MobileBottomBar from "@/components/common/MobileBottomBar";
import MobileSearchModal from "@/components/common/MobileSearchModal";
import { useLanguage } from "@/components/providers/LanguageProvider";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const { t } = useLanguage();
  
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isArchiveDropdownOpen, setIsArchiveDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [logoUrl, setLogoUrl] = useState("/logo.png");
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  if (pathname?.startsWith("/admin") || pathname === "/login") return null;

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsArchiveDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    setIsSearchExpanded(false);
    setIsMobileOpen(false);
  };

  // Curated vertical dropdown menu items (Merged cultural archive sections)
  const archiveDropdownItems = [
    {
      name: t("navPersonalities", "Luminaries & Icons"),
      description: "20 top pioneers, statesmen & creators",
      href: "/personalities",
      icon: Award
    },
    {
      name: t("navStories", "Positive Stories"),
      description: "Constructive cultural chronicles & essays",
      href: "/blog",
      icon: BookOpen
    },
    {
      name: t("navHeritage", "Heritage Archive"),
      description: "Photographic plates & monuments",
      href: "/gallery",
      icon: ImageIcon
    },
    {
      name: t("navEvents", "Events & Urs"),
      description: "Annual gatherings & Sufi festivals",
      href: "/events",
      icon: Calendar
    }
  ];

  const isArchiveActive = ["/personalities", "/blog", "/gallery", "/events"].some(route => 
    pathname?.startsWith(route)
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-parchment/95 backdrop-blur-md border-b border-maroon/15 transition-all">
        {/* Ajrak signature decorative top ribbon */}
        <div className="h-1 w-full ajrak-band" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-4">
            
            {/* 1. Masthead & Brand Identity */}
            <Link href="/" className="flex items-center gap-3.5 group shrink-0">
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
                  سنڌ ڪنيڪٽ &bull; {t("brandSubtitle", "Cultural Archive & Magazine")}
                </span>
              </div>
            </Link>

            {/* 2. Redesigned Navigation with Vertical Dropdown & Key Direct Links */}
            <div className="hidden lg:flex items-center space-x-1.5">
              
              {/* Vertical Archive Dropdown Trigger */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsArchiveDropdownOpen(!isArchiveDropdownOpen)}
                  onMouseEnter={() => setIsArchiveDropdownOpen(true)}
                  className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-all inline-flex items-center gap-1.5 ${
                    isArchiveActive || isArchiveDropdownOpen
                      ? "text-maroon bg-maroon/10 font-bold"
                      : "text-charcoal hover:text-maroon hover:bg-ivory"
                  }`}
                  aria-expanded={isArchiveDropdownOpen}
                >
                  <span>Cultural Archives</span>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isArchiveDropdownOpen ? 'rotate-180 text-maroon' : 'text-charcoal/60'}`} />
                </button>

                {/* Vertical Dropdown Panel */}
                {isArchiveDropdownOpen && (
                  <div 
                    onMouseLeave={() => setIsArchiveDropdownOpen(false)}
                    className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-parchment border border-maroon/20 shadow-xl p-2 z-50 animate-fadeIn"
                  >
                    <div className="px-3 py-1.5 border-b border-maroon/10 mb-1">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-maroon">
                        Sindh Connect Collections
                      </span>
                    </div>
                    <div className="space-y-0.5">
                      {archiveDropdownItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setIsArchiveDropdownOpen(false)}
                            className={`flex items-start gap-3 p-2.5 rounded-lg transition-all ${
                              isActive
                                ? "bg-maroon/10 text-maroon"
                                : "text-charcoal hover:bg-ivory hover:text-maroon"
                            }`}
                          >
                            <div className="p-1.5 rounded-md bg-ivory border border-maroon/15 text-maroon shrink-0 mt-0.5">
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-xs font-bold leading-tight">{item.name}</span>
                              <span className="text-[11px] text-charcoal/60 font-serif leading-snug mt-0.5">
                                {item.description}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Traditional Crafts Shop Link */}
              <Link
                href="/shop"
                className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-all inline-flex items-center gap-1.5 ${
                  pathname === "/shop"
                    ? "text-maroon bg-maroon/10 font-bold"
                    : "text-charcoal hover:text-maroon hover:bg-ivory"
                }`}
              >
                <ShoppingBag className="h-3.5 w-3.5 text-maroon" />
                <span>Artisan Shop</span>
              </Link>

              {/* About Mission Link */}
              <Link
                href="/about"
                className={`px-3.5 py-1.5 text-xs font-semibold tracking-wide rounded-md transition-all ${
                  pathname === "/about"
                    ? "text-maroon bg-maroon/10 font-bold"
                    : "text-charcoal hover:text-maroon hover:bg-ivory"
                }`}
              >
                {t("navAbout", "About")}
              </Link>

              {/* Admin CMS (if authorized) */}
              {session?.user && (session.user as any).role === "Admin" && (
                <Link
                  href="/admin"
                  className="px-3 py-1.5 text-xs font-semibold rounded-md bg-maroon/15 text-maroon hover:bg-maroon hover:text-parchment transition-all inline-flex items-center gap-1"
                >
                  <Shield className="h-3.5 w-3.5" />
                  <span>CMS</span>
                </Link>
              )}

            </div>

            {/* 3. Integrated Global Searchbar (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="hidden md:flex items-center relative max-w-xs flex-1 lg:max-w-sm">
              <div className="relative w-full">
                <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-maroon/70 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search luminaries, history, crafts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-ivory/80 border border-maroon/25 rounded-full py-1.5 pl-9 pr-3 text-xs text-charcoal placeholder-charcoal/50 focus:outline-hidden focus:border-maroon focus:bg-parchment focus:ring-1 focus:ring-maroon transition-all"
                />
              </div>
            </form>

            {/* 4. Right Controls: Language Toggle, Nominate CTA, Auth */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              <LanguageToggle />

              <Link
                href="/personalities/submit"
                className="text-xs font-semibold px-3 py-2 rounded-md border border-maroon/30 text-maroon hover:bg-maroon hover:text-parchment transition-all inline-flex items-center gap-1"
              >
                <span>{t("navNominate", "Nominate")}</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>

              {session ? (
                <button
                  onClick={() => signOut()}
                  className="text-xs font-medium text-charcoal/70 hover:text-maroon px-1.5 py-1"
                >
                  {t("navSignOut", "Sign Out")}
                </button>
              ) : (
                <Link
                  href="/login"
                  className="text-xs font-medium text-indigo hover:text-maroon px-1.5 py-1"
                >
                  {t("navSignIn", "Sign In")}
                </Link>
              )}
            </div>

            {/* 5. Mobile Controls (Language Toggle + Quick Search + Drawer Toggle) */}
            <div className="flex lg:hidden items-center gap-1.5">
              <LanguageToggle />

              <button
                onClick={() => setIsSearchModalOpen(true)}
                className="p-2 rounded-lg text-indigo hover:bg-ivory active:scale-95 transition-transform"
                aria-label="Open search dialog"
              >
                <Search className="h-5 w-5 text-maroon" />
              </button>

              <button
                onClick={() => setIsMobileOpen(!isMobileOpen)}
                className="p-2 rounded-lg text-indigo hover:bg-ivory transition-colors active:scale-95"
                aria-label="Toggle navigation menu"
              >
                {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Global Search Modal */}
      <MobileSearchModal 
        isOpen={isSearchModalOpen} 
        onClose={() => setIsSearchModalOpen(false)} 
      />

      {/* Floating Bottom Navigation Bar (Smart Mobile Experience) */}
      <MobileBottomBar 
        onOpenSearch={() => setIsSearchModalOpen(true)} 
      />

      {/* Mobile Drawer Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-black/40 backdrop-blur-xs pt-24 px-4 pb-8 flex flex-col justify-between">
          <div className="bg-parchment rounded-2xl p-6 shadow-xl border border-maroon/20 space-y-4 max-h-[85vh] overflow-y-auto">
            
            <div className="flex items-center justify-between border-b border-maroon/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-maroon">
                Publication Menu
              </span>
              <button onClick={() => setIsMobileOpen(false)} className="text-charcoal p-1">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cultural Archives Category List */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal/60 px-3 block mb-1">
                Cultural Collections
              </span>
              {archiveDropdownItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                      pathname === item.href
                        ? "bg-maroon text-parchment font-bold"
                        : "text-charcoal hover:bg-ivory"
                    }`}
                  >
                    <Icon className="h-4 w-4 text-maroon" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Primary Direct Links */}
            <div className="pt-2 border-t border-maroon/10 space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-charcoal/60 px-3 block mb-1">
                Explore Platform
              </span>
              <Link
                href="/shop"
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === "/shop" ? "bg-maroon text-parchment font-bold" : "text-charcoal hover:bg-ivory"
                }`}
              >
                <ShoppingBag className="h-4 w-4 text-maroon" />
                <span>Artisanal Shop (Crafts)</span>
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === "/about" ? "bg-maroon text-parchment font-bold" : "text-charcoal hover:bg-ivory"
                }`}
              >
                <Info className="h-4 w-4 text-maroon" />
                <span>About Mission</span>
              </Link>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-maroon/10 flex flex-col gap-2">
              <Link
                href="/personalities/submit"
                onClick={() => setIsMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-lg bg-maroon text-parchment text-xs font-bold"
              >
                {t("navNominate", "Nominate a Hero or Pioneer")}
              </Link>

              {session ? (
                <button
                  onClick={() => {
                    setIsMobileOpen(false);
                    signOut();
                  }}
                  className="w-full text-center py-2 text-xs text-charcoal/70"
                >
                  {t("navSignOut", "Sign Out")}
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setIsMobileOpen(false)}
                  className="w-full text-center py-2 text-xs text-indigo font-semibold"
                >
                  {t("navSignIn", "Sign In")}
                </Link>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
}
