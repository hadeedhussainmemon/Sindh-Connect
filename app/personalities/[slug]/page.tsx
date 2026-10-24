import { Metadata } from "next";
import { Award, CheckCircle, ArrowLeft, Star, Globe, Mail, Sparkles, Calendar, MapPin, Building, Trophy, User, Share2 } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/db";
import PersonalityModel from "@/models/Personality";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    await dbConnect();
    const profile = await PersonalityModel.findOne({ slug });
    
    if (!profile) {
      return { title: "Profile Not Found | Sindh Connect" };
    }

    return {
      title: `${profile.name} - ${profile.category} | Sindh Connect`,
      description: profile.biography.substring(0, 160) + (profile.biography.length > 160 ? "..." : ""),
      openGraph: {
        title: `${profile.name} - ${profile.category} | Sindh Connect`,
        description: profile.biography.substring(0, 160) + (profile.biography.length > 160 ? "..." : ""),
        url: `https://sindhconnect.com/personalities/${slug}`,
        siteName: "Sindh Connect",
        images: [
          {
            url: profile.profilePicture || profile.images?.[0] || "/logo.jpg",
            width: 1200,
            height: 630,
            alt: profile.name,
          },
        ],
        type: "profile",
      },
      twitter: {
        card: "summary_large_image",
        title: `${profile.name} - ${profile.category} | Sindh Connect`,
        description: profile.biography.substring(0, 160) + (profile.biography.length > 160 ? "..." : ""),
        images: [profile.profilePicture || profile.images?.[0] || "/logo.jpg"],
      },
    };
  } catch (error) {
    return { title: "Sindh Personality | Sindh Connect" };
  }
}

export default async function PersonalityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let profile: any = null;
  let relatedProfiles: any[] = [];

  try {
    await dbConnect();
    const data = await PersonalityModel.findOne({ slug });
    if (data) {
      profile = JSON.parse(JSON.stringify(data));
      
      const sameCategory = await PersonalityModel.find({
        category: data.category,
        slug: { $ne: slug }
      }).limit(3);
      
      let relatedList = [...sameCategory];
      if (relatedList.length < 3) {
        const needed = 3 - relatedList.length;
        const excludedSlugs = [slug, ...relatedList.map((p: any) => p.slug)];
        const others = await PersonalityModel.find({
          slug: { $nin: excludedSlugs }
        }).limit(needed);
        relatedList = [...relatedList, ...others];
      }
      relatedProfiles = JSON.parse(JSON.stringify(relatedList));
    }
  } catch (error) {
    console.error(error);
  }

  if (!profile) {
    return (
      <div className="text-center py-32 bg-[#090305] min-h-screen px-4">
        <h1 className="text-3xl font-display font-black text-white mb-4">Profile Not Found</h1>
        <p className="text-neutral-400 text-sm mb-6">The requested personality could not be found in our directory.</p>
        <Link href="/personalities" className="text-xs font-bold px-4 py-2 bg-[#801020] text-white rounded-lg border border-[#d4af37]/50 hover:bg-[#9c1427] transition-all">
          Back to Personalities Directory
        </Link>
      </div>
    );
  }

  const formatDate = (dateString?: Date | string) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  };

  const displayImage = profile.profilePicture || profile.images?.[0];

  return (
    <div className="min-h-screen bg-[#090305] text-[#f9f5f0] py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Navigation link */}
        <Link 
          href="/personalities" 
          className="inline-flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-[#d4af37] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Sindh Icons
        </Link>

        {/* Hero Profile Header */}
        <div className="relative rounded-2xl border border-[#801020]/40 bg-[#12070a] p-6 sm:p-10 shadow-2xl overflow-hidden">
          {/* Subtle Ajrak corner accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#801020]/30 to-transparent pointer-events-none" />

          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Image Box */}
            <div className="w-full md:w-56 h-64 sm:h-72 rounded-xl overflow-hidden border-2 border-[#d4af37]/60 bg-[#1a0c11] shrink-0 shadow-lg">
              {displayImage ? (
                <img 
                  src={displayImage} 
                  alt={profile.name} 
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[#1a0c11]">
                  <User className="h-20 w-20 text-[#d4af37]/30" />
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="space-y-4 flex-1 w-full">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider bg-[#801020]/30 text-[#d4af37] px-3 py-1 rounded-md border border-[#801020]/60">
                  {profile.category}
                </span>
                {profile.company && (
                  <span className="text-xs text-neutral-400 flex items-center gap-1">
                    <Building className="h-3.5 w-3.5 text-[#d4af37]" /> {profile.company}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white leading-tight">
                {profile.name}
              </h1>

              {/* Dates */}
              {(profile.birthDate || profile.deathDate) && (
                <div className="flex items-center gap-2 text-xs text-neutral-400">
                  <Calendar className="h-3.5 w-3.5 text-[#d4af37]" />
                  <span>
                    {formatDate(profile.birthDate) || "Unknown"} – {profile.deathDate ? formatDate(profile.deathDate) : "Present"}
                  </span>
                </div>
              )}

              {/* Quick Achievements Tagline */}
              {profile.awards && profile.awards.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {profile.awards.map((award: string, i: number) => (
                    <span key={i} className="text-xs bg-[#1a0c11] border border-[#d4af37]/40 text-[#d4af37] px-2.5 py-1 rounded-full font-medium flex items-center gap-1.5">
                      <Trophy className="h-3 w-3" /> {award}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Biography Block */}
        <div className="p-6 sm:p-10 rounded-2xl border border-[#801020]/40 bg-[#12070a] space-y-4">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white border-b border-[#801020]/30 pb-3">
            Life, Legacy & Significance
          </h2>
          <div className="text-sm sm:text-base text-neutral-300 font-light leading-relaxed whitespace-pre-line text-justify">
            {profile.biography}
          </div>
        </div>

        {/* Key Achievements */}
        {profile.achievements && profile.achievements.length > 0 && (
          <div className="p-6 sm:p-10 rounded-2xl border border-[#801020]/40 bg-[#12070a] space-y-4">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white border-b border-[#801020]/30 pb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-[#d4af37] fill-[#d4af37]" /> Key Honors & Contributions
            </h2>
            <ul className="space-y-3 pt-2">
              {profile.achievements.map((ach: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-neutral-300 leading-relaxed">
                  <CheckCircle className="h-4 w-4 text-[#d4af37] shrink-0 mt-1" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Historic Timeline */}
        {profile.timeline && profile.timeline.length > 0 && (
          <div className="p-6 sm:p-10 rounded-2xl border border-[#801020]/40 bg-[#12070a] space-y-6">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-white border-b border-[#801020]/30 pb-3">
              Chronological Milestones
            </h2>
            <div className="relative border-l-2 border-[#801020] ml-3 sm:ml-4 space-y-6 pl-6 sm:pl-8">
              {profile.timeline.map((item: any, i: number) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 h-3.5 w-3.5 rounded-full bg-[#d4af37] border-2 border-[#090305]" />
                  <span className="font-mono text-xs font-bold text-[#d4af37] bg-[#801020]/30 px-2 py-0.5 rounded border border-[#801020]/60">
                    {item.year}
                  </span>
                  <p className="text-sm text-neutral-200 mt-2 font-light">
                    {item.event}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Sindh Luminaries */}
        {relatedProfiles.length > 0 && (
          <div className="space-y-6 pt-6">
            <h3 className="text-xl font-display font-bold text-white border-b border-[#801020]/40 pb-3">
              Explore More Personalities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProfiles.map((rel: any) => (
                <div key={rel.slug} className="p-5 rounded-xl border border-[#801020]/40 bg-[#12070a] hover:border-[#d4af37]/60 transition-all flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#d4af37] tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-base text-white hover:text-[#d4af37] transition-colors leading-snug">
                      <Link href={`/personalities/${rel.slug}`}>{rel.name}</Link>
                    </h4>
                    <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                      {rel.biography}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[#801020]/25">
                    <Link href={`/personalities/${rel.slug}`} className="text-xs font-bold text-[#d4af37] hover:underline">
                      View Profile &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
