import mongoose, { Schema, Document, model, models } from "mongoose";

export interface ICoreValue {
  name: string;
  description: string;
}

export interface ISiteConfig extends Document {
  key: string;
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
  logoUrl: string;
  faviconUrl: string;
  heroImageUrl: string;
  aboutIntro: string;
  vision: string;
  mission: string;
  coreValues: ICoreValue[];
  objectives: string;
  selectionCriteria: string;
  categories: string;
  whyUs: string;
  founderMessage: string;
  impact: string;
  joinUs: string;
  aboutText: string[];
}

const SiteConfigSchema = new Schema<ISiteConfig>({
  key: { type: String, default: "main", unique: true },
  headline: { type: String, default: "A land of history. A people of stories." },
  subheadline: { type: String, default: "An authoritative editorial archive documenting the civilizational memory, Sufi philosophies, indigenous craftsmanship, and contemporary leaders of Sindh." },
  eyebrowLabel: { type: String, default: "The Living Heritage of Sindh" },
  primaryCtaText: { type: String, default: "Explore Personalities" },
  primaryCtaLink: { type: String, default: "/personalities" },
  secondaryCtaText: { type: String, default: "Read Positive Stories" },
  secondaryCtaLink: { type: String, default: "/blog" },
  heroCaptionBadge: { type: String, default: "Archaeological Plate 01" },
  heroCaptionLocation: { type: String, default: "Larkana District, Sindh" },
  heroCaptionTitle: { type: String, default: "Mohenjo-daro & The Great Stupa" },
  heroCaptionDescription: { type: String, default: "UNESCO World Heritage citadel of the Indus civilization, celebrated for municipal sanitation, kiln-baked masonry, and peaceful civic governance." },
  logoUrl: { type: String, default: "/logo.jpg" },
  faviconUrl: { type: String, default: "/favicon.svg" },
  heroImageUrl: { type: String, default: "https://images.unsplash.com/photo-1590077428593-a55bb07c4665?w=1200&auto=format&fit=crop&q=80" },
  
  aboutIntro: { type: String, default: "Sindh Connect is dedicated to archiving, celebrating, and amplifying the heritage, culture, and positive transformation of Sindh. From the timeless brick streets of Mohenjo-daro to the Sufi shrines of Bhit Shah, Sehwan, and Jhok, Sindh has been a cradle of peace, pluralism, and intellectual richness for millennia." },
  vision: { type: String, default: "To establish Sindh Connect as the most authoritative and inspirational digital portal celebrating Sindhi heritage, highlighting contemporary champions, and connecting the global Sindhi diaspora with grassroots positive initiatives." },
  mission: { type: String, default: "To discover, document, and honor exceptional personalities across Sindh; safeguard indigenous history and arts; and share constructive stories that drive progress, unity, and hope." },
  
  coreValues: [
    {
      name: { type: String },
      description: { type: String }
    }
  ],
  
  objectives: { type: String, default: "Documenting heritage sites; recognizing notable creators and statesmen; building youth mentorship links; cataloging positive economic and social breakthroughs throughout Sindh." },
  selectionCriteria: { type: String, default: "Documented integrity, cultural or societal contribution to Sindh, creative excellence, demonstrated positive impact, and dedication to uplifting the people." },
  categories: { type: String, default: "Heritage & Sufism, Top Digital Creators & Media, Politicians & Statesmen, Literature & Sindhi Poetry, Social Reform, Tech Innovation." },
  whyUs: { type: String, default: "Sindh gave the subcontinent its name and civilizational foundation, yet its contemporary victories often remain overlooked. Sindh Connect bridges this gap by offering a world-class platform dedicated exclusively to our legacy and modern innovators." },
  founderMessage: { type: String, default: "Welcome to Sindh Connect. Every artisan weaving an Ajrak in Hala, every digital creator storytelling from Khairpur, every leader striving for our public hospitals, and every young coder in Karachi deserves a stage." },
  impact: { type: String, default: "Connecting grassroots artisans with international appreciation, providing educational archives for students, and giving voice to the inspiring heroes of Sindh." },
  joinUs: { type: String, default: "Whether you are a writer, historian, student, content creator, or cultural advocate, Sindh Connect is yours. Submit articles, nominate heroes, and help us tell the true story of Sindh." },
  aboutText: {
    type: [String],
    default: [
      "Sindh is not merely a territory; it is the civilizational spine of South Asia. Born along the majestic banks of the Mehran (Indus River), its legacy extends from the architectural genius of Mohenjo-daro to the Sufi sanctuaries of Bhit Shah, Sehwan, and Jhok Sharif.",
      "Sindh Connect is an authoritative cultural archive and modern spotlight. We preserve the classical philosophy of Shah Abdul Latif Bhittai and Sachal Sarmast, while illuminating contemporary icons: digital creators with millions of global viewers, public servants, healthcare pioneers, and courageous grassroots innovators.",
      "Here, past wisdom meets future ambition. We document the constructive, triumphant, and peaceful spirit of Sindh for generations to come."
    ]
  }
}, { timestamps: true });

export default models.SiteConfig || model<ISiteConfig>("SiteConfig", SiteConfigSchema);
