"use client";

import { useLanguage, Language } from "@/components/providers/LanguageProvider";
import { Globe } from "lucide-react";

export default function LanguageToggle({ className = "" }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  const options: { code: Language; label: string; native: string }[] = [
    { code: "en", label: "EN", native: "English" },
    { code: "sd", label: "سنڌي", native: "Sindhi" },
    { code: "ur", label: "اردو", native: "Urdu" },
  ];

  return (
    <div className={`inline-flex items-center rounded-lg border border-maroon/30 bg-ivory/60 p-0.5 shadow-xs ${className}`}>
      <div className="flex items-center px-1.5 text-maroon/80" title="Language / ٻولي / زبان">
        <Globe className="h-3.5 w-3.5" />
      </div>
      <div className="flex items-center gap-0.5">
        {options.map((opt) => {
          const isActive = language === opt.code;
          return (
            <button
              key={opt.code}
              onClick={() => setLanguage(opt.code)}
              aria-label={`Switch language to ${opt.native}`}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${
                isActive
                  ? "bg-maroon text-parchment shadow-xs font-bold"
                  : "text-charcoal/80 hover:text-maroon hover:bg-parchment"
              }`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
