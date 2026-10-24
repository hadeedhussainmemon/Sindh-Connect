"use client";

import { useEffect, useState } from "react";
import { Loader2, Feather, Compass, Award, ShieldCheck, Heart } from "lucide-react";

interface CoreValue {
  name: string;
  description: string;
}

interface SiteConfig {
  aboutIntro: string;
  vision: string;
  mission: string;
  coreValues: CoreValue[];
  objectives: string;
  selectionCriteria: string;
  categories: string;
  whyUs: string;
  founderMessage: string;
  impact: string;
  joinUs: string;
}

export default function AboutPage() {
  const [config, setConfig] = useState<SiteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/config")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.aboutIntro) {
          setConfig(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-40 bg-[#090305]">
        <Loader2 className="h-10 w-10 text-[#d4af37] animate-spin" />
      </div>
    );
  }

  const defaultIntro = "Sindh Connect is dedicated to celebrating the 5,000-year legacy of the Indus Civilization, preserving Sufi mysticism, and giving voice to the visionary leaders, digital creators, and community heroes elevating Sindh today.";

  const sections = [
    { title: "About Sindh Connect", content: config?.aboutIntro || defaultIntro },
    { title: "Our Vision", content: config?.vision || "To be the defining global portal that connects Sindh's ancient heritage with modern innovation and inspiring pioneers." },
    { title: "Our Mission", content: config?.mission || "To document historic landmarks, profile prominent Sindhi creators and leaders, and amplify positive grassroots stories from across the province." },
    { title: "Key Objectives", content: config?.objectives || "Promoting cultural awareness, documenting achievements, providing youth mentorship, and preserving historical memory." },
    { title: "Selection & Feature Criteria", content: config?.selectionCriteria || "Integrity, public service, positive impact, cultural contribution, and demonstrated excellence in their craft." },
    { title: "Focus Sectors", content: config?.categories || "Heritage & Sufism, Digital Media & Content Creation, Public Leadership, Literature & Poetry, Arts & Crafts, Tech Innovation." },
    { title: "Why Sindh Connect Matters", content: config?.whyUs || "Sindh possesses one of human history's oldest peaceful societies. We provide a modern stage to celebrate its living wisdom and bright future." },
    { title: "Message from the Curators", content: config?.founderMessage || "Join us in safeguarding our roots and inspiring the next generation of Sindhi thinkers, creators, and leaders." },
    { title: "Social Impact", content: config?.impact || "Empowering local artisans, educating students on history, and highlighting inspiring community transformations." },
    { title: "Collaborate With Us", content: config?.joinUs || "We welcome researchers, writers, photographers, and advocates of Sindh to submit stories and nominate deserving icons." },
  ];

  return (
    <div className="min-h-screen bg-[#090305] text-[#f9f5f0] py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center border-b border-[#801020]/40 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#801020]/25 border border-[#d4af37]/40 text-xs font-bold text-[#d4af37]">
            <Feather className="h-3.5 w-3.5" />
            Heritage & Modern Revival
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-white tracking-tight">
            About <span className="text-[#d4af37]">Sindh Connect</span>
          </h1>
          <p className="text-base text-neutral-400 font-light max-w-2xl mx-auto">
            Honoring 5,000 years of Indus history, Sufi poetry, modern creators, and community triumphs.
          </p>
        </div>

        {/* Dynamic Sections */}
        <div className="space-y-12">
          {sections.map(
            (sec, idx) =>
              sec.content && (
                <div key={idx} className="p-8 rounded-2xl bg-[#12070a] border border-[#801020]/40 hover:border-[#d4af37]/50 transition-all shadow-lg space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-[#d4af37] block">
                    0{idx + 1} &bull; Pillar
                  </span>
                  <h2 className="text-2xl font-display font-bold text-white">
                    {sec.title}
                  </h2>
                  <p className="text-neutral-300 font-light leading-relaxed text-justify whitespace-pre-line text-sm md:text-base">
                    {sec.content}
                  </p>
                </div>
              )
          )}
        </div>

        {/* Core Values */}
        {config?.coreValues && config.coreValues.length > 0 && (
          <div className="space-y-6 pt-6">
            <h2 className="text-2xl font-display font-bold text-[#d4af37] border-b border-[#801020]/40 pb-3">
              Guiding Principles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {config.coreValues.map((val, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-[#801020]/40 bg-[#140a0e] space-y-2">
                  <h3 className="font-display font-bold text-lg text-white">
                    {val.name}
                  </h3>
                  <p className="text-xs text-neutral-400 leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
