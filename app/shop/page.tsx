"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Loader2, ShoppingBag, Sparkles, MapPin, Tag, Check, MessageSquare } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

interface Product {
  _id: string;
  title: string;
  slug: string;
  category: string;
  price: number;
  currency: string;
  description: string;
  primaryImage: string;
  originCity: string;
  artisanName?: string;
  inStock: boolean;
  featured: boolean;
  whatsappNumber?: string;
}

export default function ShopPage() {
  const { t } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load products", err);
        setLoading(false);
      });
  }, []);

  const categories = [
    "All",
    "Ajrak Textiles",
    "Hala Blue Pottery (Kashikari)",
    "Ralli Quilts",
    "Sindhi Topi & Embroidery",
    "Traditional Leather & Handicrafts"
  ];

  const filtered = products.filter((prod) => {
    const matchesSearch =
      prod.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prod.originCity.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || prod.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const getWhatsAppLink = (prod: Product) => {
    const phone = (prod.whatsappNumber || "+923000000000").replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `Hello Sindh Connect Artisans, I am interested in acquiring "${prod.title}" (Price: ${prod.currency} ${prod.price.toLocaleString()}) crafted in ${prod.originCity}. Please share purchase & shipping details.`
    );
    return `https://wa.me/${phone}?text=${message}`;
  };

  return (
    <div className="w-full min-h-screen bg-parchment text-charcoal">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        
        {/* Editorial Masthead */}
        <div className="text-center max-w-3xl mx-auto mb-12 border-b border-maroon/20 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-maroon/10 border border-maroon/30 text-xs font-mono font-bold text-maroon mb-3">
            <ShoppingBag className="h-3.5 w-3.5" />
            <span>سنڌي روايتي دستڪاري ۽ ثقافتي شيون &bull; Traditional Sindhi Crafts</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold tracking-tight text-indigo mb-3 leading-tight">
            Authentic Sindhi Artisanal Crafts
          </h1>
          <p className="text-charcoal/80 text-sm sm:text-base font-serif leading-relaxed max-w-2xl mx-auto">
            Direct from master artisans in Hala, Bhit Shah, Thatta, and Thar. Authentic hand-blocked Ajraks, glazed Kashikari ceramics, Thari Ralli quilts, and gold-zari caps.
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-10 bg-ivory p-4 border border-maroon/20 rounded-xl shadow-xs">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-maroon" />
            <input
              type="text"
              placeholder="Search products, crafts, city (e.g. Ajrak, Hala, Ralli)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-parchment border border-maroon/30 rounded-lg py-2 pl-10 pr-4 text-sm text-charcoal placeholder-charcoal/50 focus:outline-hidden focus:border-maroon focus:ring-1 focus:ring-maroon transition-all"
            />
          </div>
          <div className="flex gap-2 flex-wrap w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-maroon text-parchment shadow-xs font-bold"
                    : "bg-parchment text-charcoal/80 hover:text-maroon border border-maroon/20 hover:bg-ivory"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 text-maroon animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-ivory rounded-xl border border-dashed border-maroon/30 max-w-lg mx-auto">
            <ShoppingBag className="h-10 w-10 text-maroon/50 mx-auto mb-3" />
            <p className="text-charcoal/70 text-sm font-serif">No products found matching your current filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((prod) => (
              <div 
                key={prod._id} 
                className="group rounded-2xl border border-maroon/20 bg-parchment overflow-hidden flex flex-col justify-between hover:border-maroon/50 hover:shadow-md transition-all"
              >
                <div>
                  {/* Product Image */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-ivory">
                    <img 
                      src={prod.primaryImage || "/hero_visual.jpg"} 
                      alt={prod.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-2.5 left-2.5 bg-maroon/90 text-parchment text-[10px] font-mono font-bold px-2.5 py-0.5 rounded shadow-xs uppercase tracking-wider backdrop-blur-xs">
                      {prod.category}
                    </span>
                    {prod.inStock ? (
                      <span className="absolute bottom-2.5 right-2.5 bg-emerald-800 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-xs font-semibold flex items-center gap-1">
                        <Check className="h-3 w-3" /> In Stock
                      </span>
                    ) : (
                      <span className="absolute bottom-2.5 right-2.5 bg-neutral-600 text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-xs">
                        Made to Order
                      </span>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between text-xs text-charcoal/60 font-mono">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-maroon" /> {prod.originCity}
                      </span>
                      {prod.artisanName && (
                        <span className="truncate max-w-[120px]">{prod.artisanName}</span>
                      )}
                    </div>

                    <h2 className="text-base font-display font-bold text-indigo group-hover:text-maroon transition-colors leading-snug line-clamp-2">
                      {prod.title}
                    </h2>

                    <p className="text-xs text-charcoal/75 line-clamp-3 leading-relaxed font-serif">
                      {prod.description}
                    </p>
                  </div>
                </div>

                {/* Footer: Price & Direct WhatsApp Purchase Inquiry */}
                <div className="p-5 pt-0 border-t border-maroon/15 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-charcoal/60 block">Price</span>
                    <span className="text-lg font-serif font-bold text-maroon">
                      {prod.currency} {prod.price.toLocaleString()}
                    </span>
                  </div>

                  <a
                    href={getWhatsAppLink(prod)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 rounded-lg bg-maroon hover:bg-maroon-hover text-parchment text-xs font-semibold tracking-wide shadow-xs transition-colors inline-flex items-center gap-1.5 shrink-0"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Inquire / Order</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
