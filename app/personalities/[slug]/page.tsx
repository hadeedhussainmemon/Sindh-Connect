import { Metadata } from "next";
import { Award, ArrowLeft, Star, Calendar, Building, Trophy, User, CheckCircle } from "lucide-react";
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
      <div className="text-center py-32 bg-[var(--ajrak-parchment)] min-h-screen px-4">
        <h1 className="text-3xl font-display font-black text-[var(--ajrak-indigo)] mb-4">Profile Not Found</h1>
        <p className="text-[var(--charcoal)]/70 text-sm mb-6 font-serif">The requested personality could not be found in our directory.</p>
        <Link href="/personalities" className="text-xs font-bold px-4 py-2 bg-[var(--sindhi-maroon)] text-[var(--ajrak-parchment)] rounded-lg hover:bg-[var(--sindhi-maroon-hover)] transition-all">
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
    <div className="min-h-screen bg-[var(--ajrak-parchment)] text-[var(--charcoal)] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* Navigation link */}
        <Link 
          href="/personalities" 
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--sindhi-maroon)] hover:text-[var(--ajrak-indigo)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Sindh Icons
        </Link>

        {/* Hero Profile Header */}
        <div className="relative rounded-2xl border border-[var(--sindhi-maroon)]/20 bg-[var(--ajrak-ivory)] p-6 sm:p-10 shadow-xs overflow-hidden">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Image Box */}
            <div className="w-full md:w-56 h-64 sm:h-72 rounded-xl overflow-hidden border-2 border-[var(--sindhi-maroon)]/30 bg-[var(--ajrak-ivory)] shrink-0 shadow-sm">
              {displayImage ? (
                <img 
                  src={displayImage} 
                  alt={profile.name} 
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-[var(--ajrak-ivory)]">
                  <User className="h-20 w-20 text-[var(--sindhi-maroon)]/40" />
                </div>
              )}
            </div>

            {/* Info Box */}
            <div className="space-y-4 flex-1 w-full">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider bg-[var(--sindhi-maroon)] text-[var(--ajrak-parchment)] px-3 py-1 rounded-md">
                  {profile.category}
                </span>
                {profile.company && (
                  <span className="text-xs text-[var(--charcoal)]/70 flex items-center gap-1 font-serif">
                    <Building className="h-3.5 w-3.5 text-[var(--sindhi-maroon)]" /> {profile.company}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[var(--ajrak-indigo)] leading-tight">
                {profile.name}
              </h1>

              {/* Dates */}
              {(profile.birthDate || profile.deathDate) && (
                <div className="flex items-center gap-2 text-xs text-[var(--charcoal)]/70 font-mono">
                  <Calendar className="h-3.5 w-3.5 text-[var(--sindhi-maroon)]" />
                  <span>
                    {formatDate(profile.birthDate) || "Unknown"} &ndash; {profile.deathDate ? formatDate(profile.deathDate) : "Present"}
                  </span>
                </div>
              )}

              {/* Quick Achievements Tagline */}
              {profile.awards && profile.awards.length > 0 && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {profile.awards.map((award: string, i: number) => (
                    <span key={i} className="text-xs bg-[var(--ajrak-parchment)] border border-[var(--sindhi-maroon)]/25 text-[var(--sindhi-maroon)] px-2.5 py-1 rounded-full font-mono font-medium flex items-center gap-1.5">
                      <Trophy className="h-3 w-3" /> {award}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Biography Block */}
        <div className="p-6 sm:p-10 rounded-2xl border border-[var(--sindhi-maroon)]/20 bg-[var(--ajrak-parchment)] space-y-4 shadow-xs">
          <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--ajrak-indigo)] border-b border-[var(--sindhi-maroon)]/20 pb-3">
            Life, Legacy &amp; Significance
          </h2>
          <div className="text-sm sm:text-base text-[var(--charcoal)]/85 font-serif leading-relaxed whitespace-pre-line text-justify">
            {profile.biography}
          </div>
        </div>

        {/* Key Achievements */}
        {profile.achievements && profile.achievements.length > 0 && (
          <div className="p-6 sm:p-10 rounded-2xl border border-[var(--sindhi-maroon)]/20 bg-[var(--ajrak-ivory)] space-y-4 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--ajrak-indigo)] border-b border-[var(--sindhi-maroon)]/20 pb-3 flex items-center gap-2">
              <Star className="h-5 w-5 text-[var(--sindhi-maroon)] fill-[var(--sindhi-maroon)]" /> Key Honors &amp; Contributions
            </h2>
            <ul className="space-y-3 pt-2">
              {profile.achievements.map((ach: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--charcoal)]/85 leading-relaxed font-serif">
                  <CheckCircle className="h-4 w-4 text-[var(--sindhi-maroon)] shrink-0 mt-1" />
                  <span>{ach}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Historic Timeline */}
        {profile.timeline && profile.timeline.length > 0 && (
          <div className="p-6 sm:p-10 rounded-2xl border border-[var(--sindhi-maroon)]/20 bg-[var(--ajrak-parchment)] space-y-6 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-display font-bold text-[var(--ajrak-indigo)] border-b border-[var(--sindhi-maroon)]/20 pb-3">
              Chronological Milestones
            </h2>
            <div className="relative border-l-2 border-[var(--sindhi-maroon)] ml-3 sm:ml-4 space-y-6 pl-6 sm:pl-8">
              {profile.timeline.map((item: any, i: number) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1 h-3.5 w-3.5 rounded-full bg-[var(--sindhi-maroon)] border-2 border-[var(--ajrak-parchment)]" />
                  <span className="font-mono text-xs font-bold text-[var(--ajrak-parchment)] bg-[var(--sindhi-maroon)] px-2.5 py-0.5 rounded">
                    {item.year}
                  </span>
                  <p className="text-sm text-[var(--charcoal)]/80 mt-2 font-serif">
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
            <h3 className="text-xl font-display font-bold text-[var(--ajrak-indigo)] border-b border-[var(--sindhi-maroon)]/20 pb-3">
              Explore More Personalities
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedProfiles.map((rel: any) => (
                <div key={rel.slug} className="p-5 rounded-xl border border-[var(--sindhi-maroon)]/20 bg-[var(--ajrak-ivory)] hover:border-[var(--sindhi-maroon)]/50 transition-all flex flex-col justify-between shadow-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase font-bold text-[var(--sindhi-maroon)] tracking-wider block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="font-bold text-base text-[var(--ajrak-indigo)] hover:text-[var(--sindhi-maroon)] transition-colors leading-snug">
                      <Link href={`/personalities/${rel.slug}`}>{rel.name}</Link>
                    </h4>
                    <p className="text-xs text-[var(--charcoal)]/75 mt-2 line-clamp-2 leading-relaxed font-serif">
                      {rel.biography}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-[var(--sindhi-maroon)]/15">
                    <Link href={`/personalities/${rel.slug}`} className="text-xs font-mono font-bold text-[var(--sindhi-maroon)] hover:underline">
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
