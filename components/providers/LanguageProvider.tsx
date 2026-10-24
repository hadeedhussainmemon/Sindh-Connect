"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "sd" | "ur";

export interface Translations {
  [key: string]: {
    en: string;
    sd: string;
    ur: string;
  };
}

export const translations: Translations = {
  // Navigation
  brandSubtitle: {
    en: "Cultural Archive & Magazine",
    sd: "ثقافتي ذخيرو ۽ رسالو",
    ur: "ثقافتی آرکائیو اور جریدہ",
  },
  navPersonalities: {
    en: "Luminaries & Icons",
    sd: "نامور شخصيتون ۽ اڳواڻ",
    ur: "نامور شخصیات اور رہنما",
  },
  navStories: {
    en: "Positive Stories",
    sd: "مثبت ڪهاڻيون",
    ur: "مثبت کہانیاں",
  },
  navHeritage: {
    en: "Heritage Archive",
    sd: "تاريخي ۽ ثقافتي ورثو",
    ur: "تاریخی اور ثقافتی ورثہ",
  },
  navEvents: {
    en: "Events & Urs",
    sd: "ميڙا ۽ ثقافتي تقريبون",
    ur: "میلے اور ثقافتی تقریبات",
  },
  navAbout: {
    en: "About the Mission",
    sd: "اسان جو مقصد",
    ur: "ہمارا مشن",
  },
  navNominate: {
    en: "Nominate a Luminary",
    sd: "شخصيت نامزد ڪريو",
    ur: "شخصیت نامزد کریں",
  },
  navSignIn: {
    en: "Sign In",
    sd: "سائن ان",
    ur: "سائن ان",
  },
  navSignOut: {
    en: "Sign Out",
    sd: "لاگ آئوٽ",
    ur: "لاگ آؤٹ",
  },
  navAdminCMS: {
    en: "Editorial CMS",
    sd: "انتظامي سي ايم ايس",
    ur: "انتظامی سی ایم ایس",
  },

  // Hero Section
  heroEyebrow: {
    en: "The Living Heritage of Sindh",
    sd: "سنڌ جو زنده ثقافتي ورثو",
    ur: "سندھ کا زندہ ثقافتی ورثہ",
  },
  heroHeadline: {
    en: "A land of history. A people of stories.",
    sd: "تاريخ جي سرزمين، ڪهاڻين جا ماڻهو.",
    ur: "تاریخ کی سرزمین، کہانیوں کے لوگ۔",
  },
  heroSubheadline: {
    en: "An authoritative cultural archive documenting five millennia of Indus civilization, classical Sufi humanism, indigenous arts, and the contemporary innovators shaping Sindh's constructive future.",
    sd: "سنڌو سڀيتا جي پنج هزار سالن، صوفي فلسفي، روايتي فن ۽ سنڌ جي روشن مستقبل کي نوان رخ ڏيندڙ جديد اڳواڻن جو معتبر ۽ مستند تاريخي ذخيرو.",
    ur: "وادی سندھ کی پانچ ہزار سالہ تہذیب، صوفیانہ فلسفے، روایتی دستکاری اور سندھ کے روشن مستقبل کو سنوارنے والے جدید رہنماؤں کا معتبر ثقافتی آرکائیو۔",
  },
  heroCtaPrimary: {
    en: "Explore Personalities",
    sd: "نامور شخصيتون ڏسو",
    ur: "شخصیات دریافت کریں",
  },
  heroCtaSecondary: {
    en: "Read Positive Stories",
    sd: "مثبت ڪهاڻيون پڙهو",
    ur: "مثبت کہانیاں پڑھیں",
  },
  heroStat1Value: {
    en: "5,000+",
    sd: "۵۰۰۰+",
    ur: "۵۰۰۰+",
  },
  heroStat1Label: {
    en: "Years of Documented History",
    sd: "تاريخي ورثي جا سال",
    ur: "دستاویزی تاریخ کے سال",
  },
  heroStat1Desc: {
    en: "Indus Valley civilization to modern Sindh",
    sd: "سنڌو سڀيتا کان اڄوڪي سنڌ تائين",
    ur: "وادی سندھ کی تہذیب سے جدید سندھ تک",
  },
  heroStat2Label: {
    en: "Documented Personalities",
    sd: "دستاويز ٿيل نامور شخصيتون",
    ur: "ریکارڈ شدہ نامور شخصیات",
  },
  heroStat2Desc: {
    en: "Verified historical icons, Sufi poets & leaders",
    sd: "تاريخي اڳواڻ، صوفي شاعر ۽ جديد هيرو",
    ur: "تاریخی رہنما، صوفی شعراء اور جدید ہیروز",
  },
  heroStat3Label: {
    en: "Published Cultural Stories",
    sd: "شايع ٿيل ثقافتي مضمون",
    ur: "شائع شدہ ثقافتی مضامین",
  },
  heroStat3Desc: {
    en: "Grassroots triumphs & positive community essays",
    sd: "مقامي ڪاميابيون ۽ مثبت معاشرتي ڪهاڻيون",
    ur: "عوامی کامیابیاں اور مثبت معاشرتی کہانیاں",
  },
  heroCaptionBadge: {
    en: "Archaeological Plate 01",
    sd: "آثارِ قديمه تصويري تختي ۰۱",
    ur: "آثارِ قدیمہ تصویری تختی ۰۱",
  },
  heroCaptionLoc: {
    en: "Larkana District, Sindh",
    sd: "ضلعو لاڙڪاڻو، سنڌ",
    ur: "ضلع لاڑکانہ، سندھ",
  },
  heroCaptionTitle: {
    en: "Mohenjo-daro & The Great Stupa",
    sd: "موهن جو دڙو ۽ ٻڌ اسٽوپا",
    ur: "موئن جو دڑو اور بدھ اسٹوپا",
  },
  heroCaptionDesc: {
    en: "UNESCO World Heritage citadel of the Indus civilization, celebrated for municipal sanitation, kiln-baked masonry, and peaceful civic governance.",
    sd: "سنڌو سڀيتا جو يونيسڪو عالمي ورثو، جيڪو اعليٰ شهري رٿابندي ۽ پرامن سماجي نظام جي سڃاڻپ رکي ٿو.",
    ur: "یونیسکو کا عالمی ثقافتی ورثہ، جو بہترین شہری منصوبہ بندی اور پرامن معاشرتی نظام کی علامت ہے۔",
  },

  // Sections
  featuredPersonalitiesHeading: {
    en: "Pioneers, Thinkers & Modern Voices",
    sd: "سنڌ جا چُنڊ ڪردار ۽ فڪري اڳواڻ",
    ur: "سندھ کے چنیدہ کردار اور فکری رہنما",
  },
  featuredPersonalitiesEyebrow: {
    en: "Editorial Registry • نامور شخصيتون",
    sd: "تاريخي رڪارڊ • نامور شخصيتون",
    ur: "تاریخی ریکارڈ • نامور شخصیات",
  },
  featuredPersonalitiesSub: {
    en: "A permanent editorial registry honoring the statesmen, Sufi philosophers, literary architects, and contemporary digital storytellers of Sindh.",
    sd: "سنڌ جي سياستدانن، صوفي مفڪرن، اديبن ۽ جديد ڊجيٽل خالقن جو مستقل تاريخي ۽ ثقافتي رڪارڊ.",
    ur: "سندھ کے سیاست دانوں، صوفی مفکرین، ادیبوں اور جدید ڈیجیٹل تخلیق کاروں کا مستقل تاریخی ریکارڈ۔",
  },
  viewAllLuminaries: {
    en: "Complete 20-Profile Directory",
    sd: "مڪمل شخصيتن جي ڊائريڪٽري",
    ur: "تمام شخصیات کی ڈائرکٹری",
  },
  readBiographicalRecord: {
    en: "Read Full Biographical Record",
    sd: "مڪمل سوانح حيات پڙهو",
    ur: "مکمل سوانح حیات پڑھیں",
  },
  examineRecord: {
    en: "Examine Record",
    sd: "تفصيل ڏسو",
    ur: "تفصیل دیکھیں",
  },
  keyContributions: {
    en: "Key Civilizational Contributions",
    sd: "اهم تهذيبي خدمتون ۽ ڪارناما",
    ur: "اہم تہذیبی خدمات اور کارنامے",
  },

  // Positive Stories Section
  positiveStoriesEyebrow: {
    en: "Constructive Dispatches • مثبت ڪهاڻيون",
    sd: "حوصلي افزا ڪهاڻيون • مثبت سنڌ",
    ur: "حوصلہ افزا کہانیاں • مثبت سندھ",
  },
  positiveStoriesHeading: {
    en: "Positive Transformations Across Sindh",
    sd: "سنڌ ۾ مثبت تبديليون ۽ ڪاميابيون",
    ur: "سندھ میں مثبت تبدیلیاں اور کامیابیاں",
  },
  viewAllStories: {
    en: "View All Published Articles",
    sd: "تمام شايع ٿيل مضمون ڏسو",
    ur: "تمام شائع شدہ مضامین دیکھیں",
  },
  readFullEssay: {
    en: "Read Full Essay",
    sd: "مڪمل مضمون پڙهو",
    ur: "مکمل مضمون پڑھیں",
  },

  // Products & Crafts Section
  productsEyebrow: {
    en: "Authentic Artisanal Heritage • سنڌي روايتي هنر ۽ دستڪاري",
    sd: "سنڌي روايتي هنر ۽ دستڪاري • مقامي ڪاريگر",
    ur: "سندھی روایتی دستکاری • مقامی کاریگر",
  },
  productsHeading: {
    en: "Traditional Sindhi Products & Handicrafts",
    sd: "سنڌ جا روايتي سوغاتون ۽ هٿ جا هنر",
    ur: "سندھ کے روایتی شاہکار اور دستکاری",
  },
  productsSub: {
    en: "Authentic hand-blocked Ajraks, Hala glazed pottery, Thari Ralli quilts, and hand-embroidered topis directly from master artisans.",
    sd: "هالا جي مشهور ڪاشي ڪاري، اصيل ٺٽي ۽ ڀٽ شاهه جو اجرڪ، ٿري رليون ۽ سکر شڪارپور جون مشهور سنڌي ٽوپيون سڌو سنئون ڪاريگرن کان.",
    ur: "ہالہ کی مشہور کاشی کاری، اصل بھٹ شاہ کے اجرک، تھر کی روایتی رلیاں اور سندھی ٹوپیاں براہِ راست کاریگروں سے۔",
  },
  viewArtisanShop: {
    en: "View Full Artisanal Shop",
    sd: "مڪمل هٿ جي هنرن جو دڪان ڏسو",
    ur: "مکمل دستکاری دکان دیکھیں",
  },
  productDetails: {
    en: "Details",
    sd: "تفصيل",
    ur: "تفصیل",
  },
  inquireWhatsapp: {
    en: "Inquire",
    sd: "معلومات وٺو",
    ur: "معلومات لیں",
  },

  // Gallery Section
  galleryEyebrow: {
    en: "Visual Plates • آثارِ قديم ۽ ثقافت",
    sd: "تصويري دستاويز • تاريخي ۽ قديم آثار",
    ur: "تصویری دستاویز • تاریخی و قدیم آثار",
  },
  galleryHeading: {
    en: "Monuments & Material Culture",
    sd: "تاريخي يادگار ۽ قديم ورثو",
    ur: "تاریخی یادگاریں اور قدیم ورثہ",
  },
  viewAllGallery: {
    en: "Explore Full Photographic Archive",
    sd: "مڪمل تصويري ذخيرو ڏسو",
    ur: "مکمل تصویری ذخیرہ دیکھیں",
  },

  // Manifesto Section
  manifestoEyebrow: {
    en: "The Sindh Connect Commitment",
    sd: "سنڌ ڪنيڪٽ جو پڪو عزم",
    ur: "سندھ کنیکٹ کا پختہ عزم",
  },
  manifestoCharterCta: {
    en: "Read the Full Editorial Charter",
    sd: "مڪمل ادارتي منشور پڙهو",
    ur: "مکمل ادارتی منشور پڑھیں",
  },

  // Footer & Newsletter
  archiveIndices: {
    en: "Archive Indices",
    sd: "ثقافتي اشاريو ۽ رڪارڊ",
    ur: "ثقافتی اشاریہ اور ریکارڈ",
  },
  weeklyDispatchTitle: {
    en: "The Weekly Cultural Dispatch",
    sd: "هفتيوار ثقافتي خبرنامو",
    ur: "ہفتہ وار ثقافتی خبرنامہ",
  },
  weeklyDispatchDesc: {
    en: "Receive curated essays on Sindh’s history, rare photographic archives, and profiles of grassroots changemakers directly in your inbox.",
    sd: "سنڌ جي تاريخ، ناياب تصويري رڪارڊ ۽ نمايان شخصيتن تي تحقيقي مضمون سڌو سنئون پنهنجي اي ميل تي حاصل ڪريو.",
    ur: "سندھ کی تاریخ، نایاب تصویری ریکارڈ اور نمایاں شخصیات پر تحریری مضامین براہِ راست اپنی ای میل میں حاصل کریں۔",
  },
  subscribeBtn: {
    en: "Subscribe",
    sd: "شامل ٿيو",
    ur: "شامل ہوں",
  },
  subscribePlaceholder: {
    en: "reader@domain.com",
    sd: "پنهنجي اي ميل لکو...",
    ur: "اپنی ای میل درج کریں...",
  },
  editorialCharterLink: {
    en: "Editorial Charter",
    sd: "ادارٿي پاليسي",
    ur: "ادارتی پالیسی",
  },
  privacyStandardsLink: {
    en: "Privacy & Archive Standards",
    sd: "رازداري ۽ معيار",
    ur: "رازداری اور معیار",
  },
  staffPortalLink: {
    en: "Staff Portal",
    sd: "اسٽاف پورٽل",
    ur: "اسٹاف پورٹل",
  },

  // Footer
  footerMission: {
    en: "An independent cultural publication and digital museum dedicated to safeguarding 5,000 years of Indus civilization, classical Sindhi poetry, monumental heritage, and the modern innovators shaping Sindh's constructive future.",
    sd: "هڪ باوقار آزاد ثقافتي اشاعت ۽ ڊجيٽل ميوزيم، جيڪو سنڌو سڀيتا جي پنج هزار سالن، ڪلاسيڪل شاعري، تاريخي آثارن ۽ سنڌ جي ترقيءَ جي اڳواڻن جي ساراهه لاءِ وقف آهي.",
    ur: "ایک باوقار آزاد ثقافتی اشاعت اور ڈیجیٹل میوزیم، جو وادی سندھ کی پانچ ہزار سالہ تاریخ، کلاسیکی شاعری اور سندھ کی ترقی کے رہنمائوں کے لیے وقف ہے۔",
  },
  footerColophon: {
    en: "Dedicated to the civilizational memory of Sindh.",
    sd: "سنڌ جي تهذيبي سڃاڻپ ۽ ورثي کي ارپيل.",
    ur: "سندھ کی تہذیبی یادداشت اور تاریخ کے لیے وقف۔",
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  dir: "ltr" | "rtl";
  isRtl: boolean;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string, fallback?: string) => fallback || key,
  dir: "ltr",
  isRtl: false,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const saved = localStorage.getItem("sindh_connect_lang") as Language | null;
    if (saved && (saved === "en" || saved === "sd" || saved === "ur")) {
      setLanguageState(saved);
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "en" ? "ltr" : "rtl";
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("sindh_connect_lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
  };

  const t = (key: string, fallback?: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    if (translations[key] && translations[key]["en"]) {
      return translations[key]["en"];
    }
    return fallback || key;
  };

  const dir: "ltr" | "rtl" = language === "en" ? "ltr" : "rtl";
  const isRtl = language !== "en";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir, isRtl }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
