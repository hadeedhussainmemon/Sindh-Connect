"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2, BookOpen, ArrowUpRight } from "lucide-react";

interface Article {
  title: string;
  subtitle?: string;
  category: string;
  slug: string;
  readTime: string;
  publishedAt: string;
  authorId?: { name: string };
  coverImage?: string;
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
    <div className="w-full min-h-screen bg-[#FAF6EF] text-[#202426]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        
        {/* Header with High Contrast Editorial Typography */}
        <div className="text-center max-w-3xl mx-auto mb-12 border-b border-[#702B35]/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#702B35]/10 border border-[#702B35]/30 text-xs font-mono font-bold text-[#702B35] mb-3">
            <BookOpen className="h-3.5 w-3.5" />
            <span>مثبت سنڌ جون ڪهاڻيون ۽ تاريخ</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[#173C50] mb-3 leading-tight">
            Positive Sindh Chronicles &amp; Articles
          </h1>
          <p className="text-[#202426]/80 text-sm sm:text-base font-serif leading-relaxed max-w-xl mx-auto">
            Illuminating cultural heritage, technological breakthroughs, rural empowerment, and heartwarming triumphs taking place across the towns and cities of Sindh.
          </p>
        </div>

        {/* Search and Filters Bar with High Contrast Ajrak Palette */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-[#F4EEE2] p-4 border border-[#702B35]/20 rounded-xl shadow-xs">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#702B35]" />
            <input
              type="text"
              placeholder="Search stories, topics, crafts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#FAF6EF] border border-[#702B35]/30 rounded-lg py-2 pl-10 pr-4 text-sm text-[#202426] placeholder-[#202426]/50 focus:outline-hidden focus:border-[#702B35] focus:ring-1 focus:ring-[#702B35] transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#702B35] text-[#FAF6EF] shadow-xs"
                    : "bg-[#FAF6EF] text-[#202426]/80 hover:text-[#702B35] border border-[#702B35]/20 hover:bg-[#F4EEE2]"
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
            <Loader2 className="h-8 w-8 text-[#702B35] animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-[#F4EEE2] rounded-xl border border-dashed border-[#702B35]/30">
            <p className="text-[#202426]/70 text-sm font-serif">No articles found matching your query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((art) => (
              <article 
                key={art.slug} 
                className="group rounded-2xl border border-[#702B35]/20 bg-[#FAF6EF] overflow-hidden flex flex-col justify-between hover:border-[#702B35]/50 hover:shadow-md transition-all"
              >
                <div>
                  {art.coverImage && (
                    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8DFC8]">
                      <img 
                        src={art.coverImage} 
                        alt={art.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs text-[#202426]/60 mb-3 font-mono">
                      <span className="bg-[#702B35]/10 border border-[#702B35]/30 text-[#702B35] px-2.5 py-0.5 rounded font-bold uppercase text-[10px]">
                        {art.category}
                      </span>
                      <span>{art.readTime || "5 min read"}</span>
                    </div>

                    <h2 className="text-xl font-display font-bold text-[#173C50] group-hover:text-[#702B35] transition-colors leading-snug mb-2">
                      <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                    </h2>

                    {art.subtitle && (
                      <p className="text-sm text-[#202426]/75 line-clamp-3 leading-relaxed font-serif">
                        {art.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#702B35]/15 mt-4 flex items-center justify-between">
                  <span className="text-xs text-[#202426]/60 font-mono">
                    {art.publishedAt ? new Date(art.publishedAt).toLocaleDateString() : "Sindh Connect Editorial"}
                  </span>
                  <Link
                    href={`/blog/${art.slug}`}
                    className="text-xs font-bold text-[#702B35] hover:text-[#173C50] group-hover:translate-x-1 transition-all inline-flex items-center gap-1 font-mono"
                  >
                    <span>Read Story</span> &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
