"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Compass, 
  ShoppingBag, 
  Search, 
  Globe, 
  BookOpen, 
  Home as HomeIcon,
  X 
} from "lucide-react";
import { useState } from "react";
import { useLanguage, Language } from "@/components/providers/LanguageProvider";

interface MobileBottomBarProps {
  onOpenSearch: () => void;
}

export default function MobileBottomBar({ onOpenSearch }: MobileBottomBarProps) {
  const pathname = usePathname();
  const { language, setLanguage, t, isRtl } = useLanguage();
  const [showLangSheet, setShowLangSheet] = useState(false);

  if (pathname?.startsWith("/admin") || pathname === "/login") return null;

  const langOptions: { code: Language; label: string; native: string; flag: string }[] = [
    { code: "en", label: "English", native: "English", flag: "🇬🇧" },
    { code: "sd", label: "سنڌي", native: "سنڌي ٻولي", flag: "🏛️" },
    { code: "ur", label: "اردو", native: "اردو زبان", flag: "🇵🇰" },
  ];

  return (
    <>
      {/* Mobile Floating Bottom Bar */}
      <nav 
        aria-label="Mobile quick navigation" 
        className="fixed bottom-3 left-3 right-3 z-40 lg:hidden bg-parchment/95 backdrop-blur-md border border-maroon/20 rounded-2xl shadow-xl px-2 py-1.5 transition-all"
      >
        <div className="flex items-center justify-around gap-1">
          
          {/* 1. Home */}
          <Link
            href="/"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-h-[44px] ${
              pathname === "/" 
                ? "text-maroon font-bold bg-maroon/10" 
                : "text-charcoal/70 hover:text-maroon"
            }`}
          >
            <HomeIcon className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Home</span>
          </Link>

          {/* 2. Archives & Luminaries */}
          <Link
            href="/personalities"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-h-[44px] ${
              pathname?.startsWith("/personalities") 
                ? "text-maroon font-bold bg-maroon/10" 
                : "text-charcoal/70 hover:text-maroon"
            }`}
          >
            <Compass className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Archives</span>
          </Link>

          {/* 3. Artisan Shop */}
          <Link
            href="/shop"
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all min-h-[44px] relative ${
              pathname?.startsWith("/shop") 
                ? "text-maroon font-bold bg-maroon/10" 
                : "text-charcoal/70 hover:text-maroon"
            }`}
          >
            <ShoppingBag className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Crafts</span>
            <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-maroon animate-pulse" />
          </Link>

          {/* 4. Global Instant Search */}
          <button
            onClick={onOpenSearch}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all text-charcoal/70 hover:text-maroon min-h-[44px]"
            aria-label="Open search dialog"
          >
            <Search className="h-5 w-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Search</span>
          </button>

          {/* 5. Language Switcher Trigger */}
          <button
            onClick={() => setShowLangSheet(true)}
            className="flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all text-charcoal/70 hover:text-maroon min-h-[44px]"
            aria-label="Switch language"
          >
            <Globe className="h-5 w-5 mb-0.5 text-maroon" />
            <span className="text-[10px] font-bold text-maroon uppercase tracking-tight">
              {language === "sd" ? "سنڌي" : language === "ur" ? "اردو" : "EN"}
            </span>
          </button>

        </div>
      </nav>

      {/* Language Bottom Sheet Modal */}
      {showLangSheet && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col justify-end bg-black/50 backdrop-blur-xs animate-fadeIn">
          <div 
            className="bg-parchment rounded-t-3xl border-t border-maroon/20 p-6 space-y-4 max-h-[70vh] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-maroon/15 pb-3">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-maroon" />
                <h3 className="text-sm font-bold text-indigo font-display">
                  Select Language / ٻولي چونڊيو / زبان منتخب کریں
                </h3>
              </div>
              <button 
                onClick={() => setShowLangSheet(false)}
                className="p-1 rounded-full text-charcoal/70 hover:bg-ivory"
                aria-label="Close language selector"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2 py-1">
              {langOptions.map((opt) => {
                const isActive = language === opt.code;
                return (
                  <button
                    key={opt.code}
                    onClick={() => {
                      setLanguage(opt.code);
                      setShowLangSheet(false);
                    }}
                    className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                      isActive 
                        ? "bg-maroon text-parchment border-maroon font-bold shadow-xs" 
                        : "bg-ivory/60 border-maroon/15 text-charcoal hover:bg-ivory"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{opt.flag}</span>
                      <div>
                        <span className="text-sm font-bold block">{opt.native}</span>
                        <span className={`text-[11px] ${isActive ? "text-parchment/80" : "text-charcoal/60"}`}>
                          {opt.label}
                        </span>
                      </div>
                    </div>
                    {isActive && (
                      <span className="text-xs font-mono font-bold bg-white/20 px-2 py-0.5 rounded">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-charcoal/60 text-center font-serif pt-1">
              Sindh Connect automatically formats typography and right-to-left layout for Sindhi and Urdu.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
