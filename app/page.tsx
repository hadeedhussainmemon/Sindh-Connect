"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, BookOpen, Compass, Award, Calendar, ChevronRight } from "lucide-react";

interface Personality {
  name: string;
  category: string;
  biography: string;
  slug: string;
  profilePicture?: string;
  achievements?: string[];
}

interface Article {
  title: string;
  subtitle?: string;
  slug: string;
  category: string;
  readTime?: string;
  coverImage?: string;
}

interface SiteConfig {
  headline: string;
  subheadline: string;
  aboutText: string[];
  heroImageUrl?: string;
}

interface GalleryItem {
  title: string;
  imageUrl: string;
  category?: string;
}

interface EventData {
  title: string;
  date: string;
  location?: string;
}

export default function Home() {
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [imgErrorMap, setImgErrorMap] = useState<Record<string, boolean>>({});

  const [config, setConfig] = useState<SiteConfig>({
    headline: "The Living Civilizational Memory of the Indus",
    subheadline: "An authoritative editorial archive documenting 5,000 years of Sufi humanism, monumental archaeological heritage, transformative leaders, and contemporary digital pioneers.",
    aboutText: [
      "Sindh is not merely a geographic expanse; it is the civilizational cradle of South Asia. Born along the perennial currents of the Mehran (Indus River), its narrative stretches from the brick city planning of Mohenjo-daro to the Sufi sanctuaries of Bhit Shah, Sehwan, and Jhok Sharif.",
      "Sindh Connect was founded as an independent digital museum and cultural magazine. We safeguard the timeless philosophical verse of Shah Abdul Latif Bhittai and Sachal Sarmast, while systematically chronicling modern pioneers: grassroots surgeons, digital filmmakers with global audiences, courageous educators, and preservation artisans.",
      "Here, historical depth converges with forward ambition. We document the constructive, pluralistic, and resilient spirit of Sindh for generations to come."
    ],
    heroImageUrl: "/hero_visual.jpg"
  });

  useEffect(() => {
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
      safeFetch("/api/gallery"),
      safeFetch("/api/events")
    ]).then(([persData, artData, configData, galData, evtData]) => {
      if (Array.isArray(persData) && persData.length > 0) setPersonalities(persData);
      if (Array.isArray(artData) && artData.length > 0) setArticles(artData);
      if (configData && configData.headline) setConfig((prev) => ({ ...prev, ...configData }));
      if (Array.isArray(galData) && galData.length > 0) setGallery(galData);
      if (Array.isArray(evtData) && evtData.length > 0) setEvents(evtData);
    });
  }, []);

  const categories = [
    "All",
    "Heritage & Sufism",
    "Politicians & Leaders",
    "Literature & Sindhi Poetry",
    "Top Digital Creators & Media",
    "Arts & Culture"
  ];

  const filteredPersonalities = activeCategory === "All"
    ? personalities
    : personalities.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase());

  // Editorial Spotlight Personality (First Luminary)
  const spotlightLuminary = filteredPersonalities[0] || personalities[0];
  const secondaryLuminaries = filteredPersonalities.slice(1, 5);

  const handleImageError = (id: string) => {
    setImgErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#FAF6EF] text-[#202426]">
      
      {/* 1. EDITORIAL ASYMMETRIC HERO: HUMAN-DESIGNED MAGAZINE COVER COMPOSITION */}
      <section className="relative border-b border-[#702B35]/15 pt-8 pb-16 lg:pt-14 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Typographic Masthead & Mission */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            <div className="space-y-5">
              
              {/* Editorial Header Kicker */}
              <div className="flex items-center gap-3">
                <span className="h-0.5 w-8 bg-[#702B35]" />
                <span className="text-xs uppercase tracking-widest font-mono font-semibold text-[#702B35]">
                  Issue No. 01 &bull; Digital Museum & Living Archive
                </span>
              </div>

              {/* Serif Headline with Gravitas */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#173C50] leading-[1.08]">
                Documenting the <br />
                <span className="font-serif italic text-[#702B35] font-normal">Living Soul</span> of Sindh
              </h1>

              {/* Subheading & Editorial Summary */}
              <p className="text-base sm:text-lg text-[#202426]/80 font-serif leading-relaxed max-w-xl">
                {config.subheadline}
              </p>
            </div>

            {/* Curated Navigation Deck */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link 
                href="/personalities" 
                className="px-6 py-3.5 rounded-md bg-[#702B35] hover:bg-[#853440] text-[#FAF6EF] font-semibold text-xs sm:text-sm tracking-wide shadow-sm transition-all inline-flex items-center gap-2"
              >
                <span>Explore the 20 Luminaries</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link 
                href="/blog" 
                className="px-6 py-3.5 rounded-md bg-transparent hover:bg-[#F4EEE2] text-[#173C50] font-semibold text-xs sm:text-sm tracking-wide border border-[#173C50]/30 transition-all inline-flex items-center gap-2"
              >
                <span>Read Positive Stories</span>
                <BookOpen className="h-4 w-4 text-[#702B35]" />
              </Link>
            </div>

            {/* Editorial Fact Ledger (Replacing AI vanity counters) */}
            <div className="pt-6 border-t border-[#702B35]/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <span className="block text-2xl font-serif font-bold text-[#702B35]">5,000+</span>
                <span className="text-[11px] text-[#202426]/70 uppercase tracking-wider font-mono">B.C. Civilization</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-[#173C50]">30 Sur</span>
                <span className="text-[11px] text-[#202426]/70 uppercase tracking-wider font-mono">Shah Jo Risalo</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-[#702B35]">20 Verified</span>
                <span className="text-[11px] text-[#202426]/70 uppercase tracking-wider font-mono">Archived Pioneers</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-[#173C50]">Grassroots</span>
                <span className="text-[11px] text-[#202426]/70 uppercase tracking-wider font-mono">Oral Histories</span>
              </div>
            </div>

          </div>

          {/* Right Column: Authentic Editorial Heritage Plate with Real Attribution */}
          <div className="lg:col-span-5">
            <figure className="bg-[#F4EEE2] p-3 rounded-lg border border-[#702B35]/20 shadow-sm">
              <div className="relative aspect-[4/3] sm:aspect-[5/4] w-full overflow-hidden rounded bg-[#EAE2D2]">
                <img 
                  src={config.heroImageUrl || "/hero_visual.jpg"} 
                  alt="Ancient Mohenjo-daro & Sindh Heritage" 
                  className="w-full h-full object-cover object-center grayscale-[15%] contrast-[105%]"
                  onError={() => handleImageError("hero")}
                />
              </div>
              <figcaption className="pt-3 pb-1 px-1 text-xs text-[#202426]/75 font-serif leading-snug">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-[#702B35] font-semibold mb-1">
                  <span>Archaeological Plate 01</span>
                  <span>Larkana District, Sindh</span>
                </div>
                <strong>Mohenjo-daro & The Great Stupa</strong> — UNESCO World Heritage settlement of the Indus civilization, celebrated for municipal sanitation, kiln-baked masonry, and peaceful civic governance.
              </figcaption>
            </figure>
          </div>

        </div>
      </section>

      {/* 2. CURATED EDITORIAL DESK: THE TOP LUMINARIES ARCHIVE */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-[#702B35]/15 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#702B35]">
              Curated Monograph &bull; سنڌ جا چُنڊ ڪردار
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-[#173C50]">
              Pioneers, Thinkers & Modern Voices
            </h2>
            <p className="text-sm text-[#202426]/70 max-w-xl font-serif">
              A permanent editorial registry honoring the statesmen, Sufi philosophers, literary architects, and contemporary digital storytellers of Sindh.
            </p>
          </div>

          <Link
            href="/personalities"
            className="text-xs font-bold text-[#702B35] hover:text-[#173C50] inline-flex items-center gap-1.5 transition-colors font-mono tracking-wider"
          >
            <span>Complete 20-Profile Directory</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-[#702B35]/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-sm transition-all font-medium ${
                activeCategory === cat
                  ? "bg-[#702B35] text-[#FAF6EF] font-semibold"
                  : "bg-transparent text-[#202426]/70 hover:text-[#702B35] hover:bg-[#F4EEE2]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Layout: 1 Spotlight Featured Luminary + 4 Editorial Story Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Editorial Spotlight (Col 1-7) */}
          {spotlightLuminary && (
            <div className="lg:col-span-7 bg-[#F4EEE2] border border-[#702B35]/20 rounded-lg p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-[#702B35] uppercase tracking-wider mb-4 border-b border-[#702B35]/15 pb-2">
                  <span>Archival Spotlight</span>
                  <span>{spotlightLuminary.category}</span>
                </div>

                <div className="relative aspect-[16/10] w-full rounded overflow-hidden mb-6 bg-[#E8DFC8]">
                  <img
                    src={spotlightLuminary.profilePicture || "/hero_visual.jpg"}
                    alt={spotlightLuminary.name}
                    className="w-full h-full object-cover object-top filter contrast-[105%]"
                  />
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-[#173C50] leading-snug">
                  <Link href={`/personalities/${spotlightLuminary.slug}`} className="hover:text-[#702B35] transition-colors">
                    {spotlightLuminary.name}
                  </Link>
                </h3>

                <p className="mt-3 text-sm sm:text-base text-[#202426]/85 font-serif leading-relaxed text-justify">
                  {spotlightLuminary.biography}
                </p>

                {spotlightLuminary.achievements && spotlightLuminary.achievements.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-[#702B35]/15">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#702B35] block mb-2">
                      Key Civilizational Contributions
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#202426]/80 font-serif">
                      {spotlightLuminary.achievements.slice(0, 3).map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#702B35] font-bold">&mdash;</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-[#702B35]/20 flex items-center justify-between">
                <span className="text-xs font-mono text-[#202426]/60">Monograph No. 01</span>
                <Link
                  href={`/personalities/${spotlightLuminary.slug}`}
                  className="text-xs font-bold text-[#702B35] hover:text-[#173C50] inline-flex items-center gap-1 group font-mono"
                >
                  <span>Read Full Biographical Record</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* Secondary Editorial Column: 4 Curated Profiles (Col 8-12) */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-[#702B35]/15 border-t border-b lg:border-t-0 lg:border-b-0 border-[#702B35]/15">
            {secondaryLuminaries.map((p, idx) => (
              <article key={p.slug} className="py-5 first:pt-0 last:pb-0 group">
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-24 shrink-0 rounded overflow-hidden bg-[#E8DFC8] border border-[#702B35]/20">
                    <img
                      src={p.profilePicture || "/hero_visual.jpg"}
                      alt={p.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#702B35] font-bold">
                      {p.category}
                    </span>
                    <h4 className="text-base font-display font-bold text-[#173C50] group-hover:text-[#702B35] transition-colors leading-snug">
                      <Link href={`/personalities/${p.slug}`}>
                        {p.name}
                      </Link>
                    </h4>
                    <p className="text-xs text-[#202426]/75 font-serif line-clamp-2 leading-relaxed">
                      {p.biography}
                    </p>
                    <Link
                      href={`/personalities/${p.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#702B35] pt-1"
                    >
                      <span>Examine Record</span> &rarr;
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

        </div>

      </section>

      {/* 3. ESSAYS & POSITIVE STORIES: EDITORIAL READING ROOM */}
      <section className="border-t border-[#702B35]/15 bg-[#F4EEE2] py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-[#702B35]/20 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#702B35] block mb-1">
                Constructive Dispatches &bull; مثبت ڪهاڻيون
              </span>
              <h2 className="text-3xl font-display font-bold text-[#173C50]">
                Positive Transformations Across Sindh
              </h2>
            </div>
            <Link 
              href="/blog" 
              className="text-xs font-mono font-bold text-[#702B35] hover:text-[#173C50] inline-flex items-center gap-1.5"
            >
              <span>View All Published Articles</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((art, idx) => (
              <article 
                key={art.slug} 
                className="bg-[#FAF6EF] rounded-lg border border-[#702B35]/15 overflow-hidden flex flex-col justify-between hover:border-[#702B35]/40 transition-all shadow-xs"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-[#EAE2D2] overflow-hidden">
                    <img 
                      src={art.coverImage || "/hero_visual.jpg"} 
                      alt={art.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#702B35]">
                      <span className="uppercase tracking-wider font-bold">{art.category}</span>
                      <span className="text-[#202426]/60">{art.readTime || "6 min read"}</span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-[#173C50] hover:text-[#702B35] transition-colors leading-snug">
                      <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                    </h3>

                    {art.subtitle && (
                      <p className="text-xs text-[#202426]/75 font-serif line-clamp-3 leading-relaxed">
                        {art.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-[#702B35]/10 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#202426]/50">Report 0{idx + 1}</span>
                  <Link 
                    href={`/blog/${art.slug}`}
                    className="text-xs font-mono font-semibold text-[#702B35] hover:text-[#173C50] inline-flex items-center gap-1"
                  >
                    <span>Read Full Essay</span> &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 4. HERITAGE & VISUAL ARCHIVE: DIGITAL MUSEUM GALLERY GLIMPSE */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-[#702B35]/15 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#702B35] block mb-1">
              Visual Plates &bull; آثارِ قديم ۽ ثقافت
            </span>
            <h2 className="text-3xl font-display font-bold text-[#173C50]">
              Monuments & Material Culture
            </h2>
          </div>
          <Link href="/gallery" className="text-xs font-mono font-bold text-[#702B35] hover:text-[#173C50] inline-flex items-center gap-1.5">
            <span>Explore Full Photographic Archive</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.slice(0, 4).map((item, idx) => (
            <figure 
              key={idx}
              className="bg-[#F4EEE2] p-2.5 rounded-lg border border-[#702B35]/15 space-y-2.5 shadow-xs"
            >
              <div className="aspect-[4/3] relative overflow-hidden rounded bg-[#EAE2D2]">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <figcaption className="px-1 text-xs font-serif">
                <span className="text-[10px] font-mono text-[#702B35] uppercase tracking-wider block font-bold">
                  Archive Plate {idx + 1} &bull; {item.category || "Heritage"}
                </span>
                <p className="font-semibold text-[#173C50] leading-snug mt-0.5">
                  {item.title}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL MANIFESTO: CONCLUDING PHILOSOPHICAL STATEMENT */}
      <section className="border-t border-[#702B35]/15 bg-[#173C50] text-[#F4EEE2] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-[#C3A36A] font-semibold">
            The Sindh Connect Commitment
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
            "جيئي سنڌ، سدائين گُلزار سنڌ"
          </h2>
          <p className="text-sm sm:text-base font-serif leading-relaxed text-white/80 text-justify sm:text-center">
            {config.aboutText[1]}
          </p>
          <div className="pt-2">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-[#702B35] hover:bg-[#853440] text-white text-xs font-mono font-semibold tracking-wider transition-colors"
            >
              <span>Read the Full Editorial Charter</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
