import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/db";
import Article from "@/models/Article";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const category = url.searchParams.get("category");
    const featured = url.searchParams.get("featured");

    const query: any = {};
    if (category && category !== "All") {
      query.category = category;
    }
    if (featured === "true") {
      query.featured = true;
    }

    const articles = await Article.find(query)
      .select("title subtitle slug category tags readTime publishedAt coverImage city province")
      .populate("authorId", "name")
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(50)
      .lean();

    return NextResponse.json(articles, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // 1. Enforce authentication and role check: Editor or Admin
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session?.user || (role !== "Admin" && role !== "Editor" && role !== "Contributor")) {
      return NextResponse.json({ error: "Unauthorized. Staff credentials required to publish articles." }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();

    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json({ error: "Article title is required" }, { status: 400 });
    }

    if (!body.content || typeof body.content !== "string") {
      return NextResponse.json({ error: "Article content is required" }, { status: 400 });
    }

    // Auto-generate clean slug
    const cleanTitle = body.title.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const slug = (body.slug || cleanTitle).slice(0, 150);

    const newArticle = await Article.create({
      title: body.title.trim().slice(0, 200),
      subtitle: typeof body.subtitle === "string" ? body.subtitle.trim().slice(0, 300) : "",
      slug,
      category: body.category || "General",
      tags: Array.isArray(body.tags) ? body.tags.slice(0, 10) : [],
      content: body.content,
      authorId: (session.user as any).id,
      readTime: body.readTime || "5 min read",
      featured: Boolean(body.featured),
      city: body.city || "Sindh",
      province: "Sindh",
      publishedAt: new Date(),
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
