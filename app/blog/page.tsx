"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Calendar, Loader2, Sparkles, BookOpen } from "lucide-react";

interface Article {
  title: string;
  subtitle?: string;
  category: string;
  slug: string;
  readTime: string;
  publishedAt: string;
  authorId?: { name: string };
  heroImage?: string;
}

export default function BlogPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => {
        if (!res.ok) return null;
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setArticles(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load articles", err);
        setLoading(false);
      });
  }, []);

  const categories = ["All", ...Array.from(new Set(articles.map((art) => art.category)))];

  const filtered = articles.filter((art) => {
    const matchesSearch = art.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          art.subtitle?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "All" || art.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-12 border-b border-[#801020]/40 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#801020]/25 border border-[#d4af37]/40 text-xs font-bold text-[#d4af37] mb-3">
          <BookOpen className="h-3.5 w-3.5" />
          مثبت سنڌ جون ڪهاڻيون ۽ تاريخ
        </div>
        <h1 className="text-4xl md:text-5xl font-display font-black tracking-tight text-white mb-3">
          Positive Sindh Chronicles & Articles
        </h1>
        <p className="text-neutral-400 text-sm leading-relaxed max-w-xl mx-auto">
          Illuminating cultural heritage, technological breakthroughs, rural empowerment, and heartwarming triumphs taking place across the towns and cities of Sindh.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-[#12070a] p-4 border border-[#801020]/40 rounded-xl">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#d4af37]" />
          <input
            type="text"
            placeholder="Search stories, topics, crafts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#1b0c11] border border-[#801020]/40 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#d4af37] transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-[#801020] text-white border border-[#d4af37]"
                  : "bg-[#1b0c11] text-neutral-400 hover:text-white border border-[#801020]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 text-[#d4af37] animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-[#12070a] rounded-xl border border-dashed border-[#801020]/40">
          <p className="text-neutral-400 text-sm">No articles found matching your query.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((art) => (
            <article 
              key={art.slug} 
              className="group rounded-2xl border border-[#801020]/40 bg-[#12070a] overflow-hidden flex flex-col justify-between hover:border-[#d4af37]/60 hover:shadow-[0_4px_24px_rgba(128,16,32,0.3)] transition-all"
            >
              <div className="p-6">
                <div className="flex items-center justify-between text-xs text-neutral-500 mb-3">
                  <span className="bg-[#801020]/25 border border-[#801020]/50 text-[#d4af37] px-2.5 py-0.5 rounded font-bold uppercase text-[10px]">
                    {art.category}
                  </span>
                  <span>{art.readTime || "5 min read"}</span>
                </div>
                <h2 className="text-xl font-display font-bold text-white group-hover:text-[#d4af37] transition-colors leading-snug mb-2">
                  <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                </h2>
                {art.subtitle && (
                  <p className="text-sm text-neutral-400 line-clamp-3 leading-relaxed font-light">
                    {art.subtitle}
                  </p>
                )}
              </div>

              <div className="p-6 pt-0 border-t border-[#801020]/25 mt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-500">
                  {art.publishedAt ? new Date(art.publishedAt).toLocaleDateString() : "Sindh Connect Editorial"}
                </span>
                <Link
                  href={`/blog/${art.slug}`}
                  className="text-xs font-bold text-[#d4af37] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1"
                >
                  Read Story &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
