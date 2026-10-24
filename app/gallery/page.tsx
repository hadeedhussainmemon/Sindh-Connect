"use client";

import { useState, useEffect } from "react";
import { Image as ImageIcon, Loader2, Sparkles, Compass } from "lucide-react";

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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:py-16 sm:px-6 lg:px-8">
      <div className="text-center mb-12 max-w-2xl mx-auto border-b border-[#801020]/40 pb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#801020]/25 border border-[#d4af37]/40 text-xs font-bold text-[#d4af37] mb-3">
          <Compass className="h-3.5 w-3.5" />
          سنڌ جو تاريخي تصويري ذخيرو
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black tracking-tight text-white mb-3">
          Sindh Heritage & Visual Archive
        </h1>
        <p className="text-neutral-400 text-sm leading-relaxed">
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
                ? "bg-[#801020] text-white border border-[#d4af37]"
                : "bg-[#12070a] text-neutral-400 hover:text-white border border-[#801020]/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 text-[#d4af37] animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.length === 0 ? (
            <p className="text-neutral-500 text-center col-span-full py-16">No images available in this category.</p>
          ) : filteredGallery.map((item) => (
            <div 
              key={item._id} 
              className="group relative rounded-2xl overflow-hidden border border-[#801020]/40 bg-[#12070a] aspect-[4/3] sm:aspect-[3/4]"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-5 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h3 className="text-white font-bold text-base leading-snug">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
