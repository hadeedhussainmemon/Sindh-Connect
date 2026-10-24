"use client";

import { useEffect, useState } from "react";
import { Loader2, Feather } from "lucide-react";

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
      <div className="flex justify-center items-center py-40 bg-[#FAF6EF]">
        <Loader2 className="h-10 w-10 text-[#702B35] animate-spin" />
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
    <div className="min-h-screen bg-[#FAF6EF] text-[#202426] py-16 px-6 font-sans">
      <div className="max-w-4xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4 text-center border-b border-[#702B35]/20 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#702B35]/10 border border-[#702B35]/30 text-xs font-mono font-bold text-[#702B35]">
            <Feather className="h-3.5 w-3.5" />
            <span>Heritage &amp; Modern Revival</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-[#173C50] tracking-tight">
            About <span className="text-[#702B35]">Sindh Connect</span>
          </h1>
          <p className="text-base text-[#202426]/80 font-serif max-w-2xl mx-auto leading-relaxed">
            Honoring 5,000 years of Indus history, Sufi poetry, modern creators, and community triumphs.
          </p>
        </div>

        {/* Editorial Sections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((sec, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-2xl border border-[#702B35]/20 bg-[#F4EEE2] space-y-3 shadow-xs ${
                idx === 0 || idx === 1 ? "md:col-span-2 bg-[#F4EEE2]" : ""
              }`}
            >
              <h2 className="text-xl font-display font-bold text-[#173C50] flex items-center gap-2">
                <span className="w-2 h-2 rotate-45 bg-[#702B35]" />
                {sec.title}
              </h2>
              <p className="text-sm text-[#202426]/85 font-serif leading-relaxed whitespace-pre-line text-justify">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Core Values */}
        {config?.coreValues && config.coreValues.length > 0 && (
          <div className="space-y-6 pt-6 border-t border-[#702B35]/20">
            <h2 className="text-2xl font-display font-bold text-[#173C50] text-center">
              Our Core Philosophical Values
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {config.coreValues.map((val, idx) => (
                <div key={idx} className="p-5 rounded-xl border border-[#702B35]/20 bg-[#FAF6EF] space-y-2">
                  <h3 className="font-bold text-[#702B35] font-display text-base">
                    {val.name}
                  </h3>
                  <p className="text-xs text-[#202426]/75 font-serif leading-relaxed">
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
