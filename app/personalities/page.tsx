"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2, PlusCircle, Award } from "lucide-react";

interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  contact?: string;
}

interface Personality {
  name: string;
  category: string;
  biography: string;
  profilePicture?: string;
  images?: string[];
  socialLinks?: SocialLinks;
  website?: string;
  slug: string;
}

export default function PersonalitiesPage() {
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/api/personalities")
      .then((res) => { if (!res.ok) return null; return res.json(); })
      .then((data) => {
        if (Array.isArray(data)) setPersonalities(data);
        setLoading(false);
      })
      .catch((err) => { console.error(err); setLoading(false); });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  const categories = ["All", ...Array.from(new Set(personalities.map((p) => p.category)))];

  const filteredList = personalities.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.biography.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === "All" || p.category.toLowerCase() === activeFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const itemsPerPage = 12;
  const totalPages = Math.ceil(filteredList.length / itemsPerPage);
  const paginatedList = filteredList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="w-full min-h-screen bg-[var(--ajrak-parchment)] text-[var(--charcoal)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-[var(--sindhi-maroon)]/20 pb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--sindhi-maroon)]/10 border border-[var(--sindhi-maroon)]/30 text-xs font-mono font-bold text-[var(--sindhi-maroon)] mb-3">
              <Award className="h-3.5 w-3.5" />
              <span>سنڌ جا اڳواڻ ۽ باصلاحيت فنڪار</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[var(--ajrak-indigo)] mb-2">
              Sindh Personalities &amp; Icons
            </h1>
            <p className="text-[var(--charcoal)]/80 text-sm sm:text-base font-serif leading-relaxed">
              Exploring the Sufi mystics, political pioneers, digital creators, social reformers, and leaders who shape the cultural and civilizational identity of Sindh.
            </p>
          </div>
          <Link 
            href="/personalities/submit"
            className="flex items-center gap-2 bg-[var(--sindhi-maroon)] hover:bg-[var(--sindhi-maroon-hover)] text-[var(--ajrak-parchment)] px-5 py-3 rounded-lg font-semibold text-xs sm:text-sm tracking-wide shadow-xs transition-all shrink-0"
          >
            <PlusCircle className="h-4 w-4" />
            <span>Nominate a Sindhi Hero / Creator</span>
          </Link>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-[var(--ajrak-ivory)] p-4 border border-[var(--sindhi-maroon)]/20 rounded-xl shadow-xs">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[var(--sindhi-maroon)]" />
            <input
              type="text"
              placeholder="Search by name, role, city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[var(--ajrak-parchment)] border border-[var(--sindhi-maroon)]/30 rounded-lg py-2 pl-10 pr-4 text-sm text-[var(--charcoal)] placeholder-[var(--charcoal)]/50 focus:outline-hidden focus:border-[var(--sindhi-maroon)] focus:ring-1 focus:ring-[var(--sindhi-maroon)] transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === cat
                    ? "bg-[var(--sindhi-maroon)] text-[var(--ajrak-parchment)] shadow-xs"
                    : "bg-[var(--ajrak-parchment)] text-[var(--charcoal)]/80 hover:text-[var(--sindhi-maroon)] border border-[var(--sindhi-maroon)]/20 hover:bg-[var(--ajrak-ivory)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Personalities Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 text-[var(--sindhi-maroon)] animate-spin" />
          </div>
        ) : filteredList.length === 0 ? (
          <div className="text-center py-16 bg-[var(--ajrak-ivory)] rounded-xl border border-dashed border-[var(--sindhi-maroon)]/30">
            <p className="text-[var(--charcoal)]/70 text-sm font-serif">No luminaries found matching your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedList.map((p) => {
              const displayImg = p.profilePicture || (p.images && p.images[0]);
              return (
                <div
                  key={p.slug}
                  className="group rounded-2xl border border-[var(--sindhi-maroon)]/20 bg-[var(--ajrak-parchment)] overflow-hidden flex flex-col justify-between hover:border-[var(--sindhi-maroon)]/50 hover:shadow-md transition-all"
                >
                  <div>
                    <div className="relative h-56 w-full overflow-hidden bg-[var(--ajrak-ivory)]">
                      {displayImg ? (
                        <img
                          src={displayImg}
                          alt={p.name}
                          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-[var(--ajrak-ivory)] text-[var(--sindhi-maroon)]">
                          <Award className="h-12 w-12 opacity-50" />
                        </div>
                      )}
                      <span className="absolute top-3 left-3 bg-[var(--sindhi-maroon)] text-[var(--ajrak-parchment)] text-[10px] font-mono font-bold px-2.5 py-0.5 rounded shadow-xs uppercase tracking-wider">
                        {p.category}
                      </span>
                    </div>

                    <div className="p-6">
                      <h2 className="text-xl font-display font-bold text-[var(--ajrak-indigo)] group-hover:text-[var(--sindhi-maroon)] transition-colors leading-snug mb-2">
                        <Link href={`/personalities/${p.slug}`}>{p.name}</Link>
                      </h2>
                      <p className="text-sm text-[var(--charcoal)]/75 font-serif line-clamp-3 leading-relaxed">
                        {p.biography}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-[var(--sindhi-maroon)]/15 mt-4 flex items-center justify-between">
                    <span className="text-xs text-[var(--charcoal)]/60 font-mono">
                      Archived Profile
                    </span>
                    <Link
                      href={`/personalities/${p.slug}`}
                      className="text-xs font-bold text-[var(--sindhi-maroon)] hover:text-[var(--ajrak-indigo)] group-hover:translate-x-1 transition-all inline-flex items-center gap-1 font-mono"
                    >
                      <span>Read Bio</span> &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12 pt-6 border-t border-[var(--sindhi-maroon)]/20">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--ajrak-ivory)] border border-[var(--sindhi-maroon)]/30 text-[var(--charcoal)] disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-xs font-mono text-[var(--charcoal)]/70 px-2">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-[var(--ajrak-ivory)] border border-[var(--sindhi-maroon)]/30 text-[var(--charcoal)] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
