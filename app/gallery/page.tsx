"use client";

import { useState, useEffect } from "react";
import { Loader2, Compass } from "lucide-react";

interface GalleryItem {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
}

export default function GalleryPage() {
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    fetch("/api/gallery")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setGallery(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(gallery.map(g => g.category)))];
  const filteredGallery = activeCategory === "All" ? gallery : gallery.filter(g => g.category === activeCategory);

  return (
    <div className="w-full min-h-screen bg-[var(--ajrak-parchment)] text-[var(--charcoal)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto border-b border-[var(--sindhi-maroon)]/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--sindhi-maroon)]/10 border border-[var(--sindhi-maroon)]/30 text-xs font-mono font-bold text-[var(--sindhi-maroon)] mb-3">
            <Compass className="h-3.5 w-3.5" />
            <span>سنڌ جو تاريخي تصويري ذخيرو</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-[var(--ajrak-indigo)] mb-3">
            Sindh Heritage &amp; Visual Archive
          </h1>
          <p className="text-[var(--charcoal)]/80 text-sm sm:text-base font-serif leading-relaxed">
            From the brick architecture of Mohenjo-daro to Makli necropolis and the artisan kilns of Hala pottery.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-[var(--sindhi-maroon)] text-[var(--ajrak-parchment)] shadow-xs"
                  : "bg-[var(--ajrak-ivory)] text-[var(--charcoal)]/80 hover:text-[var(--sindhi-maroon)] border border-[var(--sindhi-maroon)]/20 hover:bg-[var(--ajrak-parchment)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-8 w-8 text-[var(--sindhi-maroon)] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGallery.length === 0 ? (
              <p className="text-[var(--charcoal)]/60 text-center col-span-full py-16 font-serif">No images available in this category.</p>
            ) : filteredGallery.map((item) => (
              <figure 
                key={item._id} 
                className="group relative rounded-2xl overflow-hidden border border-[var(--sindhi-maroon)]/20 bg-[var(--ajrak-ivory)] p-2.5 shadow-xs flex flex-col justify-between"
              >
                <div className="aspect-[4/3] relative overflow-hidden rounded bg-[var(--ajrak-ivory)]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <figcaption className="pt-3 pb-1 px-1">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--sindhi-maroon)] font-bold block mb-1">
                    {item.category || "Heritage"}
                  </span>
                  <h3 className="text-sm font-display font-bold text-[var(--ajrak-indigo)] leading-snug">
                    {item.title}
                  </h3>
                </figcaption>
              </figure>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
