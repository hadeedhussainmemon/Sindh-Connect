import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/db";
import ArticleModel from "@/models/Article";
import EventModel from "@/models/Event";
import PersonalityModel from "@/models/Personality";

function escapeRegex(text: string): string {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const rawQ = searchParams.get("q") || "";
  const q = rawQ.trim().slice(0, 80);

  if (!q || q.length < 2) {
    return NextResponse.json({ results: [] });
  }

  try {
    await dbConnect();
    const safeRegex = new RegExp(escapeRegex(q), "i");

    // Execute targeted projection queries in parallel
    const [articles, events, personalities] = await Promise.all([
      ArticleModel.find({
        $or: [
          { title: safeRegex },
          { subtitle: safeRegex },
          { category: safeRegex },
          { tags: safeRegex }
        ]
      })
        .select("title subtitle slug category coverImage publishedAt")
        .limit(10)
        .lean(),

      EventModel.find({
        $or: [
          { title: safeRegex },
          { description: safeRegex },
          { location: safeRegex }
        ]
      })
        .select("title description date status location")
        .limit(10)
        .lean(),

      PersonalityModel.find({
        status: "approved",
        $or: [
          { name: safeRegex },
          { biography: safeRegex },
          { category: safeRegex },
          { company: safeRegex }
        ]
      })
        .select("name category slug profilePicture biography")
        .limit(10)
        .lean()
    ]);

    const formattedArticles = articles.map((art: any) => ({
      _id: art._id.toString(),
      title: art.title,
      type: "Article",
      subtitle: art.subtitle || `${art.category} • Sindh Connect Story`,
      image: art.coverImage || "",
      url: `/blog/${art.slug}`
    }));

    const formattedEvents = events.map((ev: any) => ({
      _id: ev._id.toString(),
      title: ev.title,
      type: "Event",
      subtitle: `${new Date(ev.date).toLocaleDateString()} • ${ev.location || "Sindh"}`,
      url: `/events`
    }));

    const formattedPersonalities = personalities.map((p: any) => ({
      _id: p._id.toString(),
      title: p.name,
      type: "Personality",
      subtitle: `${p.category} • ${p.biography ? p.biography.slice(0, 100) + '...' : ''}`,
      image: p.profilePicture || "",
      url: `/personalities/${p.slug}`
    }));

    return NextResponse.json(
      { results: [...formattedPersonalities, ...formattedArticles, ...formattedEvents] },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=15" } }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
