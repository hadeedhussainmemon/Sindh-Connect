"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2, Globe, Mail, Share2, PlusCircle, User, Award, Feather, Sparkles } from "lucide-react";

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

  const handleShare = async (slug: string) => {
    const url = `${window.location.origin}/personalities/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'View Sindh Connect Profile', url });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(url);
      alert("Profile link copied to clipboard!");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 border-b border-[#801020]/40 pb-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#801020]/25 border border-[#d4af37]/40 text-xs font-bold text-[#d4af37] mb-3">
            <Award className="h-3.5 w-3.5" />
            سنڌ جا اڳواڻ ۽ باصلاحيت فنڪار
          </div>
          <h1 className="text-4xl font-display font-black tracking-tight text-white mb-2">
            Sindh Personalities & Icons
          </h1>
          <p className="text-neutral-400 text-sm leading-relaxed">
            Exploring the Sufi mystics, political pioneers, digital creators, social reformers, and leaders who shape the cultural and civilizational identity of Sindh.
          </p>
        </div>
        <Link 
          href="/personalities/submit"
          className="flex items-center gap-2 bg-gradient-to-r from-[#801020] to-[#9c1427] hover:from-[#9c1427] hover:to-[#b0172e] text-[#f4ede2] px-5 py-3 rounded-xl font-bold border border-[#d4af37]/50 shadow-[0_0_15px_rgba(128,16,32,0.4)] transition-all shrink-0 text-sm"
        >
          <PlusCircle className="h-4 w-4 text-[#d4af37]" />
          Nominate a Sindhi Hero / Creator
        </Link>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-[#12070a] p-4 border border-[#801020]/40 rounded-xl">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#d4af37]" />
          <input
            type="text"
            placeholder="Search by name, legacy, craft..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1b0c11] text-white pl-10 pr-4 py-2 text-sm rounded-lg border border-[#801020]/40 focus:outline-none focus:border-[#d4af37] transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeFilter === category
                  ? "bg-[#801020] text-white border border-[#d4af37]"
                  : "bg-[#1b0c11] text-neutral-400 hover:text-white border border-[#801020]/30"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Profile Cards Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="h-8 w-8 text-[#d4af37] animate-spin" />
        </div>
      ) : paginatedList.length === 0 ? (
        <div className="text-center py-20 bg-[#12070a] rounded-2xl border border-dashed border-[#801020]/40 p-8">
          <User className="h-12 w-12 text-[#801020] mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white">No Profiles Found</h3>
          <p className="text-neutral-400 text-sm mt-1">Try adjusting your search criteria or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedList.map((p) => {
            const displayImg = p.profilePicture || (p.images && p.images[0]);
            return (
              <div
                key={p.slug}
                className="group relative rounded-2xl border border-[#801020]/40 bg-[#12070a] overflow-hidden hover:border-[#d4af37]/60 hover:shadow-[0_4px_24px_rgba(128,16,32,0.35)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-[#1b0c11]">
                    {displayImg ? (
                      <img
                        src={displayImg}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#801020]/30 to-[#0c1c38]/40">
                        <User className="h-16 w-16 text-[#d4af37]/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12070a] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 bg-[#801020]/90 backdrop-blur-md border border-[#d4af37]/40 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-[#d4af37] transition-colors leading-snug">
                      <Link href={`/personalities/${p.slug}`}>{p.name}</Link>
                    </h3>
                    <p className="text-neutral-400 text-sm mt-2 line-clamp-3 leading-relaxed font-light">
                      {p.biography}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#801020]/25 mt-4 flex items-center justify-between">
                  <Link
                    href={`/personalities/${p.slug}`}
                    className="text-xs font-bold text-[#d4af37] hover:underline inline-flex items-center gap-1"
                  >
                    View Biography &rarr;
                  </Link>
                  <button
                    onClick={() => handleShare(p.slug)}
                    className="p-1.5 rounded-md hover:bg-[#801020]/30 text-neutral-400 hover:text-[#d4af37] transition-colors"
                    title="Share Profile"
                  >
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`h-9 w-9 rounded-lg font-bold text-xs transition-colors ${
                currentPage === i + 1
                  ? "bg-[#801020] text-white border border-[#d4af37]"
                  : "bg-[#12070a] text-neutral-400 border border-[#801020]/40 hover:text-white"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
