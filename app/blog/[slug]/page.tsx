import { Metadata } from "next";
import { ArrowLeft, Clock, MapPin } from "lucide-react";
import Link from "next/link";
import dbConnect from "@/lib/db";
import ArticleModel from "@/models/Article";
import "@/models/Personality";
import "@/models/Business";
import "@/models/User";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  try {
    await dbConnect();
    const article = await ArticleModel.findOne({ slug });
    
    if (!article) {
      return { title: "Article Not Found | Sindh Connect" };
    }

    return {
      title: `${article.title} | Sindh Connect`,
      description: article.subtitle || article.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + "...",
      openGraph: {
        title: article.title,
        description: article.subtitle || article.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + "...",
        url: `https://sindhconnect.com/blog/${slug}`,
        siteName: "Sindh Connect",
        type: "article",
        publishedTime: article.publishedAt?.toISOString(),
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description: article.subtitle || article.content.replace(/<[^>]*>?/gm, '').substring(0, 160) + "...",
      },
    };
  } catch (error) {
    return { title: "Article | Sindh Connect" };
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let article: any = null;

  try {
    await dbConnect();
    const data = await ArticleModel.findOne({ slug }).populate("authorId").populate("relatedPersonalities");
    if (data) {
      article = JSON.parse(JSON.stringify(data));
    }
  } catch (error) {
    console.error(error);
  }

  if (!article) {
    return (
      <div className="text-center py-32 bg-[var(--ajrak-parchment)] min-h-screen px-4">
        <h1 className="text-2xl font-bold text-[var(--ajrak-indigo)] mb-4">Article Not Found</h1>
        <Link href="/blog" className="text-xs font-bold px-4 py-2 bg-[var(--sindhi-maroon)] text-[var(--ajrak-parchment)] rounded-lg hover:bg-[var(--sindhi-maroon-hover)] transition-all">
          Back to Articles
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--ajrak-parchment)] text-[var(--charcoal)] py-10 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation back */}
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--sindhi-maroon)] hover:text-[var(--ajrak-indigo)] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Positive Sindh Stories
        </Link>

        {/* Article Header */}
        <header className="space-y-4 border-b border-[var(--sindhi-maroon)]/20 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="bg-[var(--sindhi-maroon)]/10 text-[var(--sindhi-maroon)] px-3 py-1 rounded-md font-mono font-bold uppercase tracking-wider border border-[var(--sindhi-maroon)]/25">
              {article.category}
            </span>
            {article.city && (
              <span className="text-[var(--charcoal)]/70 flex items-center gap-1 font-serif">
                <MapPin className="h-3.5 w-3.5 text-[var(--sindhi-maroon)]" /> {article.city}, Sindh
              </span>
            )}
            <span className="text-[var(--charcoal)]/60 flex items-center gap-1 font-mono">
              <Clock className="h-3.5 w-3.5" /> {article.readTime || "5 min read"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-[var(--ajrak-indigo)] leading-tight">
            {article.title}
          </h1>

          {article.subtitle && (
            <p className="text-base sm:text-lg text-[var(--charcoal)]/80 font-serif leading-relaxed">
              {article.subtitle}
            </p>
          )}

          <div className="pt-2 text-xs text-[var(--charcoal)]/60 font-mono flex items-center gap-2">
            <span>By {article.authorId?.name || "Sindh Connect Editorial"}</span>
            <span>&bull;</span>
            <span>{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Editorial Dispatch"}</span>
          </div>
        </header>

        {/* Article Body */}
        <div 
          className="prose prose-lg max-w-none text-[var(--charcoal)]/90 font-serif leading-relaxed space-y-6 text-justify"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags && article.tags.length > 0 && (
          <div className="pt-8 border-t border-[var(--sindhi-maroon)]/20 flex flex-wrap gap-2 items-center">
            <span className="text-xs text-[var(--charcoal)]/70 font-semibold mr-2 font-mono">Tags:</span>
            {article.tags.map((tag: string, i: number) => (
              <span key={i} className="text-xs bg-[var(--ajrak-ivory)] text-[var(--sindhi-maroon)] px-3 py-1 rounded-full border border-[var(--sindhi-maroon)]/20 font-mono">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Related Personalities Mentioned */}
        {article.relatedPersonalities && article.relatedPersonalities.length > 0 && (
          <div className="mt-12 p-6 rounded-2xl bg-[var(--ajrak-ivory)] border border-[var(--sindhi-maroon)]/20 space-y-4 shadow-xs">
            <h3 className="font-display font-bold text-[var(--ajrak-indigo)] text-lg border-b border-[var(--sindhi-maroon)]/20 pb-2">
              Featured In This Story
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {article.relatedPersonalities.map((p: any) => (
                <Link
                  key={p.slug}
                  href={`/personalities/${p.slug}`}
                  className="p-3.5 rounded-xl bg-[var(--ajrak-parchment)] border border-[var(--sindhi-maroon)]/20 hover:border-[var(--sindhi-maroon)]/50 transition-all flex items-center justify-between"
                >
                  <span className="text-sm font-bold text-[var(--ajrak-indigo)] hover:text-[var(--sindhi-maroon)]">{p.name}</span>
                  <span className="text-xs font-mono text-[var(--sindhi-maroon)]">View Profile &rarr;</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
