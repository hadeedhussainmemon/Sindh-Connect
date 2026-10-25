"use client";

import Script from "next/script";
import { useEffect } from "react";
import { useLanguage } from "./LanguageProvider";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: any;
  }
}

/**
 * GoogleTranslateBridge integrates the Google Translate widget seamlessly
 * with the site's English / Sindhi / Urdu toggle.
 * When the user selects Sindhi or Urdu, Google Translate automatically translates
 * all paragraphs, database articles, biography profiles, and dynamic content
 * across the entire site without requiring manual key-by-key translations for every sentence.
 */
export default function GoogleTranslateBridge() {
  const { language } = useLanguage();

  useEffect(() => {
    // Define global callback for Google Translate script
    window.googleTranslateElementInit = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,sd,ur",
            autoDisplay: false,
            multilanguagePage: true,
          },
          "google_translate_element"
        );
      }
    };
  }, []);

  // Sync Google Translate with language toggle choice
  useEffect(() => {
    const applyGoogleTranslation = () => {
      // Set the googtrans cookie expected by Google Translate: /original/target
      const targetLang = language === "sd" ? "sd" : language === "ur" ? "ur" : "en";
      const cookieValue = `/en/${targetLang}`;
      
      document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;
      document.cookie = `googtrans=${cookieValue}; path=/`;

      // Trigger translate dropdown if available
      const selectEl = document.querySelector(".goog-te-combo") as HTMLSelectElement | null;
      if (selectEl) {
        selectEl.value = targetLang;
        selectEl.dispatchEvent(new Event("change"));
      }
    };

    applyGoogleTranslation();
    const timer = setTimeout(applyGoogleTranslation, 600);
    return () => clearTimeout(timer);
  }, [language]);

  return (
    <>
      {/* Invisible anchor element required by Google Translate */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* Official Google Translate Script */}
      <Script
        id="google-translate-script"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        strategy="afterInteractive"
      />

      {/* Hide intrusive Google Translate top banner while preserving translation text changes */}
      <style jsx global>{`
        .goog-te-banner-frame,
        .goog-te-banner-frame.skiptranslate,
        iframe.goog-te-banner-frame {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          width: 0 !important;
          border: none !important;
        }
        body {
          top: 0px !important;
          position: static !important;
        }
        .goog-te-gadget {
          display: none !important;
        }
        .skiptranslate {
          display: none !important;
        }
        #goog-gt-tt, .goog-te-balloon-frame {
          display: none !important;
        }
        .goog-text-highlight {
          background: none !important;
          box-shadow: none !important;
        }
      `}</style>
    </>
  );
}
