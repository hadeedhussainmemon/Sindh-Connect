"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X, ArrowUpRight, Award, BookOpen, ShoppingBag, ImageIcon } from "lucide-react";

interface MobileSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSearchModal({ isOpen, onClose }: MobileSearchModalProps) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "personalities" | "stories" | "shop">("all");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    const dest = filter === "all" ? `/search?q=${encodeURIComponent(query.trim())}` : `/search?q=${encodeURIComponent(query.trim())}&type=${filter}`;
    router.push(dest);
    onClose();
  };

  const quickPicks = [
    { label: "Ajrak Textiles", type: "shop" as const, query: "Ajrak" },
    { label: "Shah Abdul Latif Bhittai", type: "personalities" as const, query: "Shah Latif" },
    { label: "Mohenjo-daro", type: "all" as const, query: "Mohenjo-daro" },
    { label: "Hala Blue Pottery", type: "shop" as const, query: "Hala" },
    { label: "Sufi Heritage", type: "stories" as const, query: "Sufi" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-parchment/98 backdrop-blur-md animate-fadeIn">
      {/* Header bar */}
      <div className="px-4 py-3.5 border-b border-maroon/20 flex items-center justify-between gap-3 bg-ivory">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-maroon flex items-center gap-1.5">
          <Search className="h-4 w-4" /> Global Heritage Search
        </span>
        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-charcoal/70 hover:bg-parchment"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-5">
        {/* Search Input Box */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-3.5 h-4 w-4 text-maroon" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search historical figures, crafts, essays..."
              className="w-full bg-parchment border-2 border-maroon/30 rounded-xl py-3 pl-10 pr-10 text-sm text-charcoal placeholder-charcoal/50 focus:outline-hidden focus:border-maroon focus:ring-1 focus:ring-maroon shadow-xs"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-3.5 text-charcoal/50 hover:text-charcoal"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Scope Filters */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-medium">
            {[
              { id: "all", label: "All Archives" },
              { id: "personalities", label: "Luminaries" },
              { id: "stories", label: "Essays & Stories" },
              { id: "shop", label: "Artisan Crafts" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id as any)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-all ${
                  filter === f.id
                    ? "bg-maroon text-parchment font-bold shadow-xs"
                    : "bg-ivory text-charcoal/70 border border-maroon/15"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={!query.trim()}
            className="w-full py-3 rounded-xl bg-maroon text-parchment font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-maroon-hover transition-colors disabled:opacity-50"
          >
            <span>Search Sindh Connect</span>
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>

        {/* Curated Suggested Searches */}
        <div className="space-y-2 pt-2 border-t border-maroon/10">
          <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal/60 block">
            Popular Historical & Cultural Inquiries
          </span>
          <div className="flex flex-wrap gap-2">
            {quickPicks.map((pick, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setQuery(pick.query);
                  setFilter(pick.type);
                  router.push(`/search?q=${encodeURIComponent(pick.query)}`);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg bg-ivory border border-maroon/20 text-xs text-charcoal hover:border-maroon hover:text-maroon flex items-center gap-1.5 transition-colors"
              >
                <span className="text-maroon/70">#</span>
                <span>{pick.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Quick Navigation Sections */}
        <div className="space-y-2 pt-2 border-t border-maroon/10">
          <span className="text-[11px] font-mono uppercase tracking-widest text-charcoal/60 block">
            Direct Portals
          </span>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => { router.push("/personalities"); onClose(); }}
              className="p-3 rounded-xl bg-ivory border border-maroon/15 flex items-center gap-2 text-charcoal font-medium text-left"
            >
              <Award className="h-4 w-4 text-maroon" />
              <span>20+ Icons Registry</span>
            </button>
            <button
              onClick={() => { router.push("/shop"); onClose(); }}
              className="p-3 rounded-xl bg-ivory border border-maroon/15 flex items-center gap-2 text-charcoal font-medium text-left"
            >
              <ShoppingBag className="h-4 w-4 text-maroon" />
              <span>Artisanal Crafts</span>
            </button>
            <button
              onClick={() => { router.push("/blog"); onClose(); }}
              className="p-3 rounded-xl bg-ivory border border-maroon/15 flex items-center gap-2 text-charcoal font-medium text-left"
            >
              <BookOpen className="h-4 w-4 text-maroon" />
              <span>Positive Essays</span>
            </button>
            <button
              onClick={() => { router.push("/gallery"); onClose(); }}
              className="p-3 rounded-xl bg-ivory border border-maroon/15 flex items-center gap-2 text-charcoal font-medium text-left"
            >
              <ImageIcon className="h-4 w-4 text-maroon" />
              <span>Heritage Gallery</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
