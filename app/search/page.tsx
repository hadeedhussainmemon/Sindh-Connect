"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Search, ArrowRight, User, BookOpen, Calendar, Award } from "lucide-react";

interface SearchResult {
  _id: string;
  title: string;
  type: "Article" | "Event" | "Personality";
  subtitle: string;
  image?: string;
  url: string;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "";
  
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Article" | "Event" | "Personality">("All");

  useEffect(() => {
    if (!q) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(`/api/search?q=${encodeURIComponent(q)}`)
      .then(res => res.json())
      .then(data => {
        if (data.results) {
          setResults(data.results);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [q]);

  const displayResults = !q ? [] : results;
  const filteredResults = filter === "All" ? displayResults : displayResults.filter(r => r.type === filter);

  const getIcon = (type: string) => {
    if (type === "Article") return <BookOpen className="h-4 w-4 text-[#cfa83b]" />;
    if (type === "Event") return <Calendar className="h-4 w-4 text-[#f5d475]" />;
    return <Award className="h-4 w-4 text-[#cfa83b]" />;
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8 min-h-screen">
      <div className="mb-10 border-b border-[#770b1b]/40 pb-6">
        <h1 className="text-3xl sm:text-4xl font-display font-black text-white mb-2 flex items-center gap-3">
          <Search className="h-7 w-7 text-[#cfa83b]" />
          Sindh Connect Search
        </h1>
        <p className="text-neutral-400 text-sm">
          {q ? `Showing archival results for "${q}"` : "Enter a search query in the header to find creators, history, or positive stories."}
        </p>
      </div>

      {q && !loading && results.length > 0 && (
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {["All", "Personality", "Article", "Event"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                filter === f 
                  ? "bg-[#770b1b] text-white border border-[#cfa83b]"
                  : "bg-[#12070a] text-neutral-400 hover:text-white border border-[#770b1b]/40"
              }`}
            >
              {f === "All" ? `All Results (${results.length})` : `${f}s (${results.filter(r => r.type === f).length})`}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-24 gap-3 text-neutral-400">
          <Loader2 className="h-8 w-8 text-[#cfa83b] animate-spin" />
          <span>Searching archives across Sindh...</span>
        </div>
      ) : filteredResults.length === 0 ? (
        <div className="text-center py-20 bg-[#12070a] border border-dashed border-[#770b1b]/40 rounded-2xl p-8 space-y-3">
          <Search className="h-10 w-10 text-[#770b1b] mx-auto" />
          <h3 className="text-lg font-bold text-white">No Results Found</h3>
          <p className="text-neutral-400 text-xs sm:text-sm max-w-sm mx-auto">
            We couldn't find any match for "{q}". Try searching for Shah Latif, Benazir, Irfan Junejo, or Hala.
          </p>
          <div className="pt-2">
            <Link href="/personalities" className="text-xs font-bold text-[#cfa83b] hover:underline">
              Browse All Luminaries &rarr;
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredResults.map((item) => (
            <Link
              key={item._id}
              href={item.url}
              className="block p-5 rounded-2xl bg-[#12070a] border border-[#770b1b]/40 hover:border-[#cfa83b]/60 hover:shadow-[0_4px_20px_rgba(119,11,27,0.3)] transition-all group"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-[#770b1b]/20 border border-[#770b1b]/50 shrink-0 mt-0.5">
                    {getIcon(item.type)}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#f5d475] tracking-wider block mb-1">
                      {item.type}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#f5d475] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-1 line-clamp-2 font-light">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-neutral-500 group-hover:text-[#cfa83b] group-hover:translate-x-1 transition-all shrink-0 hidden sm:block" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32 text-neutral-400">
        <Loader2 className="h-8 w-8 text-[#cfa83b] animate-spin" />
      </div>
    }>
      <SearchResults />
    </Suspense>
  );
}
