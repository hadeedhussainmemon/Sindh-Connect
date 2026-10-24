"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, BookOpen, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

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
  eyebrowLabel?: string;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  heroCaptionBadge?: string;
  heroCaptionLocation?: string;
  heroCaptionTitle?: string;
  heroCaptionDescription?: string;
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
  const { t, language } = useLanguage();
  const [personalities, setPersonalities] = useState<Personality[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [events, setEvents] = useState<EventData[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [heroImageSrc, setHeroImageSrc] = useState<string>("/hero_visual.jpg");
  const [heroImgFailed, setHeroImgFailed] = useState<boolean>(false);

  const [config, setConfig] = useState<SiteConfig>({
    headline: "A land of history. A people of stories.",
    subheadline: "An authoritative editorial archive documenting the civilizational memory, Sufi philosophies, indigenous craftsmanship, and contemporary leaders of Sindh.",
    eyebrowLabel: "The Living Heritage of Sindh",
    primaryCtaText: "Explore Personalities",
    primaryCtaLink: "/personalities",
    secondaryCtaText: "Read Positive Stories",
    secondaryCtaLink: "/blog",
    heroCaptionBadge: "Archaeological Plate 01",
    heroCaptionLocation: "Larkana District, Sindh",
    heroCaptionTitle: "Mohenjo-daro & The Great Stupa",
    heroCaptionDescription: "UNESCO World Heritage citadel of the Indus civilization, celebrated for municipal sanitation, kiln-baked masonry, and peaceful civic governance.",
    aboutText: [
      "Sindh is not merely a geographic expanse; it is the civilizational cradle of South Asia. Born along the perennial currents of the Mehran (Indus River), its narrative stretches from the brick city planning of Mohenjo-daro to the Sufi sanctuaries of Bhit Shah, Sehwan, and Jhok Sharif.",
      "Sindh Connect was founded as an independent digital museum and cultural magazine. We safeguard the timeless philosophical verse of Shah Abdul Latif Bhittai and Sachal Sarmast, while systematically chronicling modern pioneers: grassroots surgeons, digital filmmakers with global audiences, courageous educators, and preservation artisans.",
      "Here, historical depth converges with forward ambition. We document the constructive, pluralistic, and resilient spirit of Sindh for generations to come."
    ],
    heroImageUrl: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=1200&auto=format&fit=crop&q=80"
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
      if (configData && configData.headline) {
        setConfig((prev) => ({ ...prev, ...configData }));
        if (configData.heroImageUrl) {
          setHeroImageSrc(configData.heroImageUrl);
        }
      }
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

  const spotlightLuminary = filteredPersonalities[0] || personalities[0];
  const secondaryLuminaries = filteredPersonalities.slice(1, 5);

  const personalityCount = personalities.length > 0 ? personalities.length : 20;
  const articleCount = articles.length > 0 ? articles.length : 3;

  // Determine localized text or fallback to config
  const displayedHeadline = language === "en" ? config.headline : t("heroHeadline", config.headline);
  const displayedSubheadline = language === "en" ? config.subheadline : t("heroSubheadline", config.subheadline);
  const displayedEyebrow = language === "en" ? (config.eyebrowLabel || "The Living Heritage of Sindh") : t("heroEyebrow", config.eyebrowLabel);
  const displayedCtaPrimary = language === "en" ? (config.primaryCtaText || "Explore Personalities") : t("heroCtaPrimary", config.primaryCtaText);
  const displayedCtaSecondary = language === "en" ? (config.secondaryCtaText || "Read Positive Stories") : t("heroCtaSecondary", config.secondaryCtaText);

  return (
    <div className="flex flex-col w-full min-h-screen bg-parchment text-charcoal">
      
      {/* 1. HERO SECTION: FULLY LOCALIZED & CONFIGURABLE VIA ADMIN */}
      <section className="relative border-b border-maroon/15 pt-10 pb-16 lg:pt-16 lg:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Main Two-Column Editorial Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Typographic Introduction & Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Small Eyebrow Label with Restrained Ajrak Diamond Accent */}
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-2 h-2 rotate-45 bg-maroon shrink-0" aria-hidden="true" />
              <span className="text-xs uppercase tracking-[0.18em] font-mono font-bold text-maroon">
                {displayedEyebrow}
              </span>
            </div>

            {/* Art-Directed Headline with Natural Line Breaks */}
            <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-display font-extrabold tracking-tight text-indigo leading-[1.18] mb-6">
              {displayedHeadline}
            </h1>

            {/* Concise Human-Written Introduction with Optimal Text Width */}
            <p className="text-base sm:text-lg text-charcoal/85 font-serif leading-relaxed max-w-xl mb-8">
              {displayedSubheadline}
            </p>

            {/* Clear Button Hierarchy: Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
              <Link 
                href={config.primaryCtaLink || "/personalities"} 
                className="px-6 py-3.5 rounded-md bg-maroon hover:bg-maroon-hover text-parchment font-semibold text-xs sm:text-sm tracking-wide shadow-xs transition-colors inline-flex items-center justify-center gap-2 focus:outline-hidden focus:ring-2 focus:ring-maroon focus:ring-offset-2"
              >
                <span>{displayedCtaPrimary}</span>
                <ArrowUpRight className="h-4 w-4" />
              </Link>

              <Link 
                href={config.secondaryCtaLink || "/blog"} 
                className="px-6 py-3.5 rounded-md bg-parchment hover:bg-ivory text-indigo font-semibold text-xs sm:text-sm tracking-wide border border-indigo/30 transition-colors inline-flex items-center justify-center gap-2 focus:outline-hidden focus:ring-2 focus:ring-indigo focus:ring-offset-2"
              >
                <BookOpen className="h-4 w-4 text-maroon" />
                <span>{displayedCtaSecondary}</span>
              </Link>
            </div>

          </div>

          {/* Right Column: Authentic Heritage Photograph & Restrained Framing */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <figure className="relative bg-ivory p-2.5 sm:p-3 rounded-md border border-maroon/20 shadow-xs">
              
              {/* Subtle Ajrak Textile Accent Band on Border */}
              <div 
                className="absolute top-3 bottom-3 -left-1 w-1 bg-gradient-to-b from-indigo via-maroon to-sand rounded-l" 
                aria-hidden="true" 
              />

              <div className="relative aspect-[4/5] sm:aspect-[4/5] w-full overflow-hidden rounded bg-ivory">
                {!heroImgFailed ? (
                  <img
                    src={heroImageSrc}
                    alt={t("heroCaptionTitle", config.heroCaptionTitle || "Sindh Heritage")}
                    className="w-full h-full object-cover object-center grayscale-[10%] contrast-[105%]"
                    onError={() => {
                      if (heroImageSrc !== "/hero_visual.jpg") {
                        setHeroImageSrc("/hero_visual.jpg");
                      } else {
                        setHeroImgFailed(true);
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-parchment">
                    <span className="w-6 h-6 rotate-45 bg-maroon mb-3" />
                    <span className="text-xs font-mono uppercase tracking-widest text-maroon font-bold">
                      {t("heroEyebrow", "Sindh Heritage Archive")}
                    </span>
                    <p className="text-xs text-charcoal/70 font-serif mt-1">
                      {t("heroCaptionTitle", config.heroCaptionTitle || "Mohenjo-daro Archaeological Settlement")}
                    </p>
                  </div>
                )}
              </div>

              {/* Verified Editorial Caption */}
              <figcaption className="pt-3 pb-1 px-1 text-xs text-charcoal/80 font-serif leading-snug">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest text-maroon font-semibold mb-1">
                  <span>{t("heroCaptionBadge", config.heroCaptionBadge || "Archaeological Plate 01")}</span>
                  <span>{t("heroCaptionLoc", config.heroCaptionLocation || "Larkana District, Sindh")}</span>
                </div>
                <strong>{t("heroCaptionTitle", config.heroCaptionTitle || "Mohenjo-daro & The Great Stupa")}</strong> &mdash; {t("heroCaptionDesc", config.heroCaptionDescription || "UNESCO World Heritage citadel of the Indus civilization, celebrated for municipal sanitation, kiln-baked masonry, and peaceful civic governance.")}
              </figcaption>
            </figure>
          </div>

        </div>

        {/* Quiet Supporting Statistics Row: 3 Verified Editorial Metrics */}
        <div className="mt-12 pt-8 border-t border-maroon/15 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-serif font-bold text-maroon">
              {t("heroStat1Value", "5,000+")}
            </span>
            <span className="text-xs font-mono text-charcoal/75 uppercase tracking-wider block font-medium">
              {t("heroStat1Label", "Years of Documented History")}
            </span>
            <p className="text-[11px] text-charcoal/60 font-serif">
              {t("heroStat1Desc", "Indus Valley civilization to modern Sindh")}
            </p>
          </div>

          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-serif font-bold text-indigo">
              {personalityCount}
            </span>
            <span className="text-xs font-mono text-charcoal/75 uppercase tracking-wider block font-medium">
              {t("heroStat2Label", "Documented Personalities")}
            </span>
            <p className="text-[11px] text-charcoal/60 font-serif">
              {t("heroStat2Desc", "Verified historical icons, Sufi poets & leaders")}
            </p>
          </div>

          <div className="space-y-1">
            <span className="block text-2xl sm:text-3xl font-serif font-bold text-maroon">
              {articleCount}
            </span>
            <span className="text-xs font-mono text-charcoal/75 uppercase tracking-wider block font-medium">
              {t("heroStat3Label", "Published Cultural Stories")}
            </span>
            <p className="text-[11px] text-charcoal/60 font-serif">
              {t("heroStat3Desc", "Grassroots triumphs & positive community essays")}
            </p>
          </div>
        </div>

      </section>

      {/* 2. CURATED EDITORIAL DESK: THE TOP LUMINARIES ARCHIVE */}
      <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-maroon/15 pb-6">
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-maroon">
              {t("heroCaptionBadge", "Curated Monograph")} &bull; سنڌ جا چُنڊ ڪردار
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-indigo">
              {t("featuredPersonalitiesHeading", "Pioneers, Thinkers & Modern Voices")}
            </h2>
            <p className="text-sm text-charcoal/70 max-w-xl font-serif">
              {t("featuredPersonalitiesSub", "A permanent editorial registry honoring the statesmen, Sufi philosophers, literary architects, and contemporary digital storytellers of Sindh.")}
            </p>
          </div>

          <Link
            href="/personalities"
            className="text-xs font-bold text-maroon hover:text-indigo inline-flex items-center gap-1.5 transition-colors font-mono tracking-wider"
          >
            <span>{t("viewAllLuminaries", "Complete 20-Profile Directory")}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Category Selector Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-2 border-b border-maroon/10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs px-3.5 py-1.5 rounded-sm transition-all font-medium ${
                activeCategory === cat
                  ? "bg-maroon text-parchment font-semibold"
                  : "bg-transparent text-charcoal/70 hover:text-maroon hover:bg-ivory"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Editorial Layout: 1 Spotlight Featured Luminary + 4 Editorial Story Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Editorial Spotlight */}
          {spotlightLuminary && (
            <div className="lg:col-span-7 bg-ivory border border-maroon/20 rounded-lg p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs font-mono text-maroon uppercase tracking-wider mb-4 border-b border-maroon/15 pb-2">
                  <span>{t("heroCaptionBadge", "Archival Spotlight")}</span>
                  <span>{spotlightLuminary.category}</span>
                </div>

                <div className="relative aspect-[16/10] w-full rounded overflow-hidden mb-6 bg-ivory">
                  <img
                    src={spotlightLuminary.profilePicture || "/hero_visual.jpg"}
                    alt={spotlightLuminary.name}
                    className="w-full h-full object-cover object-top filter contrast-[105%]"
                  />
                </div>

                <h3 className="text-2xl sm:text-3xl font-display font-bold text-indigo leading-snug">
                  <Link href={`/personalities/${spotlightLuminary.slug}`} className="hover:text-maroon transition-colors">
                    {spotlightLuminary.name}
                  </Link>
                </h3>

                <p className="mt-3 text-sm sm:text-base text-charcoal/85 font-serif leading-relaxed text-justify">
                  {spotlightLuminary.biography}
                </p>

                {spotlightLuminary.achievements && spotlightLuminary.achievements.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-maroon/15">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-maroon block mb-2">
                      Key Civilizational Contributions
                    </span>
                    <ul className="space-y-1.5 text-xs text-charcoal/80 font-serif">
                      {spotlightLuminary.achievements.slice(0, 3).map((ach, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-maroon font-bold">&mdash;</span>
                          <span>{ach}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-4 border-t border-maroon/20 flex items-center justify-between">
                <span className="text-xs font-mono text-charcoal/60">Monograph No. 01</span>
                <Link
                  href={`/personalities/${spotlightLuminary.slug}`}
                  className="text-xs font-bold text-maroon hover:text-indigo inline-flex items-center gap-1 group font-mono"
                >
                  <span>Read Full Biographical Record</span>
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}

          {/* Secondary Editorial Column: 4 Curated Profiles */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-maroon/15 border-t border-b lg:border-t-0 lg:border-b-0 border-maroon/15">
            {secondaryLuminaries.map((p) => (
              <article key={p.slug} className="py-5 first:pt-0 last:pb-0 group">
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-24 shrink-0 rounded overflow-hidden bg-ivory border border-maroon/20">
                    <img
                      src={p.profilePicture || "/hero_visual.jpg"}
                      alt={p.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-maroon font-bold">
                      {p.category}
                    </span>
                    <h4 className="text-base font-display font-bold text-indigo group-hover:text-maroon transition-colors leading-snug">
                      <Link href={`/personalities/${p.slug}`}>
                        {p.name}
                      </Link>
                    </h4>
                    <p className="text-xs text-charcoal/75 font-serif line-clamp-2 leading-relaxed">
                      {p.biography}
                    </p>
                    <Link
                      href={`/personalities/${p.slug}`}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-maroon pt-1"
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
      <section className="border-t border-maroon/15 bg-ivory py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 border-b border-maroon/20 pb-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-maroon block mb-1">
                Constructive Dispatches &bull; مثبت ڪهاڻيون
              </span>
              <h2 className="text-3xl font-display font-bold text-indigo">
                {t("positiveStoriesHeading", "Positive Transformations Across Sindh")}
              </h2>
            </div>
            <Link 
              href="/blog" 
              className="text-xs font-mono font-bold text-maroon hover:text-indigo inline-flex items-center gap-1.5"
            >
              <span>{t("viewAllStories", "View All Published Articles")}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.slice(0, 3).map((art, idx) => (
              <article 
                key={art.slug} 
                className="bg-parchment rounded-lg border border-maroon/15 overflow-hidden flex flex-col justify-between hover:border-maroon/40 transition-all shadow-xs"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full bg-ivory overflow-hidden">
                    <img 
                      src={art.coverImage || "/hero_visual.jpg"} 
                      alt={art.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <div className="p-6 space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono text-maroon">
                      <span className="uppercase tracking-wider font-bold">{art.category}</span>
                      <span className="text-charcoal/60">{art.readTime || "6 min read"}</span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-indigo hover:text-maroon transition-colors leading-snug">
                      <Link href={`/blog/${art.slug}`}>{art.title}</Link>
                    </h3>

                    {art.subtitle && (
                      <p className="text-xs text-charcoal/75 font-serif line-clamp-3 leading-relaxed">
                        {art.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-maroon/10 mt-4 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-charcoal/50">Report 0{idx + 1}</span>
                  <Link 
                    href={`/blog/${art.slug}`}
                    className="text-xs font-mono font-semibold text-maroon hover:text-indigo inline-flex items-center gap-1"
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
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 border-b border-maroon/15 pb-4">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-maroon block mb-1">
              Visual Plates &bull; آثارِ قديم ۽ ثقافت
            </span>
            <h2 className="text-3xl font-display font-bold text-indigo">
              {t("galleryHeading", "Monuments & Material Culture")}
            </h2>
          </div>
          <Link href="/gallery" className="text-xs font-mono font-bold text-maroon hover:text-indigo inline-flex items-center gap-1.5">
            <span>{t("viewAllGallery", "Explore Full Photographic Archive")}</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {gallery.slice(0, 4).map((item, idx) => (
            <figure 
              key={idx}
              className="bg-ivory p-2.5 rounded-lg border border-maroon/15 space-y-2.5 shadow-xs"
            >
              <div className="aspect-[4/3] relative overflow-hidden rounded bg-ivory">
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[10%] hover:grayscale-0 transition-all duration-500" 
                />
              </div>
              <figcaption className="px-1 text-xs font-serif">
                <span className="text-[10px] font-mono text-maroon uppercase tracking-wider block font-bold">
                  Archive Plate {idx + 1} &bull; {item.category || "Heritage"}
                </span>
                <p className="font-semibold text-indigo leading-snug mt-0.5">
                  {item.title}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* 5. EDITORIAL MANIFESTO: CONCLUDING PHILOSOPHICAL STATEMENT */}
      <section className="border-t border-maroon/15 bg-indigo text-parchment py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="text-xs font-mono uppercase tracking-widest text-sand font-semibold">
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
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-maroon hover:bg-maroon-hover text-white text-xs font-mono font-semibold tracking-wider transition-colors"
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
