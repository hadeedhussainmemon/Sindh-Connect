"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Sparkles, Feather, Compass, Award, HeartHandshake, BookOpen, Star, ArrowUpRight } from "lucide-react";
import { animate, stagger } from "animejs";

interface Personality {
  name: string;
  category: string;
  biography: string;
  slug: string;
  profilePicture?: string;
  awards?: string[];
}

interface Article {
  title: string;
  subtitle?: string;
  slug: string;
  category: string;
  readTime?: string;
}

interface SiteConfig {
  headline: string;
  subheadline: string;
  aboutText: string[];
  heroImageUrl?: string;
}

interface EventData {
  title: string;
  date: string;
  status: string;
  location?: string;
}

interface GalleryItem {
  title: string;
  imageUrl: string;
  category?: string;
}

export default function Home() {
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  const [config, setConfig] = useState<SiteConfig>({
    headline: "The Living Soul of the Indus Civilization",
    subheadline: "Celebrating 5,000 years of profound Sufi philosophy, indigenous craftsmanship, visionary statesmen, and today’s vibrant digital creators.",
    aboutText: [
      "Sindh is not merely a territory; it is the civilizational spine of South Asia. Born along the majestic banks of the Mehran (Indus River), its legacy extends from the architectural genius of Mohenjo-daro to the Sufi sanctuaries of Bhit Shah, Sehwan, and Jhok Sharif.",
      "Sindh Connect is an authoritative cultural archive and modern spotlight. We preserve the classical philosophy of Shah Abdul Latif Bhittai and Sachal Sarmast, while illuminating contemporary icons: digital creators with millions of global viewers, public servants, healthcare pioneers, and courageous grassroots innovators.",
      "Here, past wisdom meets future ambition. We document the constructive, triumphant, and peaceful spirit of Sindh for generations to come."
    ]
  });

  useEffect(() => {
    animate(".stagger-hero", {
      translateY: [24, 0],
      opacity: [0, 1],
      delay: stagger(100),
      duration: 800,
      ease: "outQuad"
    });

    const safeFetch = async (url: string) => {
      try {
        const res = await fetch(url);
        if (!res.ok) return null;
        return await res.json();
      } catch {
        return null;
      }
    };

    Promise.all([
      safeFetch("/api/personalities"),
      safeFetch("/api/articles"),
      safeFetch("/api/config"),
      safeFetch("/api/events"),
      safeFetch("/api/gallery")
    ])
      .then(([persData, artData, configData, evtData, galData]) => {
        if (Array.isArray(persData)) setPersonalities(persData);
        if (Array.isArray(artData)) setArticles(artData);
        if (configData && configData.headline) setConfig((prev: any) => ({ ...prev, ...configData }));
        if (Array.isArray(evtData)) setEvents(evtData);
        if (Array.isArray(galData)) setGallery(galData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stats = [
    { label: "Civilization Age", value: "5,000+", sub: "Years of History" },
    { label: "Sufi Wisdom", value: "30 Sur", sub: "Shah Jo Risalo" },
    { label: "Archived Luminaries", value: "20+", sub: "Top Icons of Sindh" },
    { label: "Cultural Heritage", value: "100%", sub: "Grassroots & Digital" },
  ];

  const categories = [
    "All",
    "Top Digital Creators & Media",
    "Heritage & Sufism",
    "Politicians & Leaders",
    "Literature & Sindhi Poetry",
    "Arts & Culture"
  ];

  const filteredPersonalities = activeCategory === "All"
    ? personalities
    : personalities.filter(p => p.category?.toLowerCase() === activeCategory.toLowerCase());

  const today = new Date().setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter(e => e.status === "upcoming" && new Date(e.date).getTime() >= today).slice(0, 3);

  return (
    <div className="flex flex-col w-full min-h-screen text-[#fcf9f4] font-sans">
      
      {/* 1. HERO SHOWCASE WITH DISTINCT SINDHI IDENTITY */}
      <section className="relative pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full overflow-hidden">
        
        {/* Ambient Ajrak Glow Orb */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-[#770b1b]/20 rounded-full blur-[130px] pointer-events-none" />
        <div className="absolute -bottom-10 -left-20 w-96 h-96 bg-[#193b70]/25 rounded-full blur-[140px] pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top Cultural Badge */}
            <div className="stagger-hero inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#770b1b]/25 border border-[#cfa83b]/40 text-xs font-semibold text-[#f5d475]">
              <span className="h-2 w-2 rounded-full bg-[#cfa83b] animate-ping" />
              <span>سنڌ ڪنيڪٽ &bull; The Living Heritage of Mehran</span>
            </div>

            <h1 className="stagger-hero text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight text-white leading-[1.08]">
              Honoring Sindh’s <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#cfa83b] via-[#f5d475] to-[#fcf9f4]">
                History, Leaders & Creators
              </span>
            </h1>

            <p className="stagger-hero text-base sm:text-lg text-neutral-300 font-light leading-relaxed max-w-2xl">
              {config.subheadline}
            </p>

            {/* CTA Action Deck */}
            <div className="stagger-hero flex flex-wrap gap-3.5 pt-2">
              <Link 
                href="/personalities" 
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#770b1b] to-[#981326] hover:from-[#981326] hover:to-[#b0172e] text-[#f7eee1] font-bold text-xs sm:text-sm border border-[#cfa83b]/60 shadow-[0_4px_24px_rgba(119,11,27,0.5)] transition-all flex items-center gap-2 group"
              >
                <Award className="h-4 w-4 text-[#cfa83b] group-hover:rotate-12 transition-transform" />
                <span>Explore Top 20 Icons of Sindh</span>
              </Link>
              <Link 
                href="/blog" 
                className="px-6 py-3.5 rounded-xl bg-[#09152b]/80 hover:bg-[#102447] text-white font-semibold text-xs sm:text-sm border border-[#cfa83b]/30 transition-all flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4 text-[#cfa83b]" />
                <span>Positive Stories from Sindh</span>
              </Link>
            </div>

            {/* Quick Stats Grid */}
            <div className="stagger-hero grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#770b1b]/30">
              {stats.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <div className="text-xl sm:text-2xl font-display font-black text-[#cfa83b]">
                    {item.value}
                  </div>
                  <div className="text-[11px] font-semibold text-white uppercase tracking-wider">
                    {item.label}
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    {item.sub}
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: Hero Visual Card */}
          <div className="lg:col-span-5 stagger-hero flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Ajrak & Gold Border Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#770b1b] via-[#cfa83b] to-[#193b70] opacity-60 blur-xl transition-all duration-700" />
              
              <div className="relative rounded-3xl overflow-hidden border-2 border-[#cfa83b]/50 bg-[#0e0407] shadow-2xl">
                <img 
                  src={config.heroImageUrl || "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=1000"} 
                  alt="Ancient Mohenjo-daro & Sindhi Cultural Heritage" 
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
                
                {/* Floating Heritage Badge */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#060204] via-[#060204]/90 to-transparent">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#f5d475] bg-[#770b1b]/60 px-2 py-0.5 rounded border border-[#cfa83b]/40">
                      UNESCO & World Heritage
                    </span>
                    <span className="text-xs text-neutral-300 font-mono">B.C. 2500</span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-white">
                    Mohenjo-daro & The Great Stupa
                  </h3>
                  <p className="text-xs text-neutral-400 mt-1 line-clamp-2 font-light">
                    One of the world's earliest major civil settlements, renowned for brick engineering and peace.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SINDHI HERITAGE PILLARS SHOWCASE */}
      <section className="border-y border-[#770b1b]/30 bg-[#0a0306]/80 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-[#12070a]/90 border border-[#770b1b]/40 hover:border-[#cfa83b]/60 transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-[#770b1b]/30 border border-[#770b1b]/60 flex items-center justify-center text-[#cfa83b]">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white group-hover:text-[#f5d475] transition-colors">
                5,000+ Yrs Civilization
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                From Indus Valley's bronze Dancing Girl to Ranikot Fort, Makli necropolis, and Kot Diji citadel.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#12070a]/90 border border-[#770b1b]/40 hover:border-[#cfa83b]/60 transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-[#09152b]/50 border border-[#193b70]/60 flex items-center justify-center text-[#cfa83b]">
                <Feather className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white group-hover:text-[#f5d475] transition-colors">
                Sufi Mysticism & Harmony
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                The poetry of Shah Latif, Lal Shahbaz Qalandar, and Sachal Sarmast teaching tolerance, love, and humanity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#12070a]/90 border border-[#770b1b]/40 hover:border-[#cfa83b]/60 transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-[#770b1b]/30 border border-[#770b1b]/60 flex items-center justify-center text-[#cfa83b]">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white group-hover:text-[#f5d475] transition-colors">
                Top Creators & Voices
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Digital innovators, cinematic vloggers, and modern storytellers bringing authentic Sindh to the world.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#12070a]/90 border border-[#770b1b]/40 hover:border-[#cfa83b]/60 transition-all space-y-3 group">
              <div className="w-12 h-12 rounded-xl bg-[#09152b]/50 border border-[#193b70]/60 flex items-center justify-center text-[#cfa83b]">
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-display font-bold text-white group-hover:text-[#f5d475] transition-colors">
                Grassroots Triumphs
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-light">
                Free healthcare at SIUT, Thari women engineers, solar education, and IT hubs powering local economy.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. FEATURED SINDH LUMINARIES & CREATORS DIRECTORY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Section Heading & Filter Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 border-b border-[#770b1b]/30 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#f5d475]">
              <Star className="h-3.5 w-3.5 fill-[#cfa83b]" />
              سنڌ جا چُنڊ ڪردار
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white">
              Icons & Creators of Sindh
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Honoring Sindh's 20 greatest historical pioneers, Sufi teachers, digital media creators, and statesmen.
            </p>
          </div>

          <Link
            href="/personalities"
            className="text-xs font-bold text-[#cfa83b] hover:text-[#f5d475] inline-flex items-center gap-1.5 shrink-0 transition-colors"
          >
            <span>View All 20 Luminaries</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeCategory === cat
                  ? "bg-[#770b1b] text-white border border-[#cfa83b]"
                  : "bg-[#12070a] text-neutral-400 hover:text-white border border-[#770b1b]/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersonalities.slice(0, 6).map((p, idx) => {
            const displayImg = p.profilePicture;
            return (
              <div
                key={p.slug}
                className="group relative rounded-2xl border border-[#770b1b]/40 bg-[#12070a] overflow-hidden hover:border-[#cfa83b]/60 hover:shadow-[0_4px_24px_rgba(119,11,27,0.35)] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 w-full overflow-hidden bg-[#1a0c11]">
                    {displayImg ? (
                      <img
                        src={displayImg}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#770b1b]/30 to-[#09152b]/50">
                        <Award className="h-16 w-16 text-[#cfa83b]/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#12070a] via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-[#770b1b]/90 backdrop-blur-md border border-[#cfa83b]/40 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                      {p.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-display font-bold text-white group-hover:text-[#f5d475] transition-colors leading-snug">
                      <Link href={`/personalities/${p.slug}`}>{p.name}</Link>
                    </h3>
                    <p className="text-neutral-400 text-xs sm:text-sm mt-2 line-clamp-3 leading-relaxed font-light">
                      {p.biography}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#770b1b]/25 mt-2 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 font-mono">
                    Luminary #{idx + 1}
                  </span>
                  <Link
                    href={`/personalities/${p.slug}`}
                    className="text-xs font-bold text-[#cfa83b] hover:text-[#f5d475] inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Biography</span> &rarr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 4. POSITIVE SINDH STORIES & INITIATIVES */}
      <section className="border-t border-[#770b1b]/30 bg-[#090306]/90 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Purpose Manifesto */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#f5d475] uppercase border-b border-[#770b1b]/40 pb-2">
              <Feather className="h-4 w-4" />
              The Platform Manifesto
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-display font-black text-white leading-tight">
              A Stage for Positive Change Across Sindh
            </h2>

            <div className="space-y-4 text-neutral-300 font-light leading-relaxed text-sm sm:text-base text-justify">
              {(config.aboutText || []).map((para, idx) => (
                <p key={idx} className={idx === 0 ? "text-white font-normal border-l-2 border-[#cfa83b] pl-4" : ""}>
                  {para}
                </p>
              ))}
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#770b1b]/25 to-[#09152b]/40 border border-[#cfa83b]/30 space-y-2">
              <h4 className="font-display font-bold text-[#f5d475] text-base">
                "جيئي سنڌ، سدائين گُلزار سنڌ"
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Sindh Connect is welcoming contributions from writers, historians, teachers, and digital filmmakers documenting positive progress across every district.
              </p>
            </div>
          </div>

          {/* Right Column: Featured Stories Feed */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between border-b border-[#770b1b]/40 pb-2">
              <h3 className="text-xs font-bold tracking-widest text-[#f5d475] uppercase">
                Positive Sindh Stories
              </h3>
              <Link href="/blog" className="text-xs font-bold text-neutral-400 hover:text-[#cfa83b] transition-colors">
                View All Articles &rarr;
              </Link>
            </div>

            <div className="space-y-4">
              {articles.slice(0, 3).map((art, idx) => (
                <article
                  key={idx}
                  className="p-5 rounded-2xl border border-[#770b1b]/35 bg-[#12070a] hover:border-[#cfa83b]/60 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#f5d475] font-bold uppercase tracking-wider bg-[#770b1b]/20 px-2 py-0.5 rounded border border-[#770b1b]/50">
                      {art.category}
                    </span>
                    <span className="text-neutral-500 font-mono">{art.readTime || "5 min read"}</span>
                  </div>
                  <h4 className="text-base sm:text-lg font-display font-bold text-white group-hover:text-[#f5d475] transition-colors leading-snug">
                    <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                  </h4>
                  {art.subtitle && (
                    <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-light">
                      {art.subtitle}
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 5. CULTURAL EVENTS & GALLERY GLIMPSE */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-[#770b1b]/30 pb-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#f5d475] uppercase block mb-1">
              Sindh Visual Archive
            </span>
            <h2 className="text-3xl font-display font-extrabold text-white">
              Glimpses of Heritage & Gatherings
            </h2>
          </div>
          <Link href="/gallery" className="text-xs font-bold text-[#cfa83b] hover:text-[#f5d475]">
            Explore Full Gallery &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {gallery.slice(0, 4).map((item, idx) => (
            <div 
              key={idx}
              className="group aspect-[3/4] relative overflow-hidden rounded-2xl border border-[#770b1b]/40 bg-[#12070a]"
            >
              <img 
                src={item.imageUrl} 
                alt={item.title} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent flex flex-col justify-end p-4 opacity-90 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-[#f5d475] font-bold block mb-1 uppercase tracking-wider">
                  0{idx + 1}
                </span>
                <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
