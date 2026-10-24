import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/db";
import Personality from "@/models/Personality";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const fetchAll = url.searchParams.get("all") === "true";
    const hasPagination = url.searchParams.has("page") || url.searchParams.has("limit");
    
    // Only administrators can view pending/unapproved submissions
    let query: any = { $or: [{ status: 'approved' }, { status: { $exists: false } }] };
    
    if (fetchAll) {
      const session = await auth();
      const isAdmin = (session?.user as any)?.role === "Admin";
      if (!isAdmin) {
        return NextResponse.json({ error: "Unauthorized to view unapproved profiles" }, { status: 403 });
      }
      query = {};
    }
    
    const cacheHeaders = { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" };

    if (!hasPagination) {
      const personalities = await Personality.find(query).sort({ createdAt: -1 });
      return NextResponse.json(personalities, { headers: cacheHeaders });
    }

    const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
    const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") || "10", 10)));
    const skip = (page - 1) * limit;
    
    const total = await Personality.countDocuments(query);
    const personalities = await Personality.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit);
    
    return NextResponse.json({
      data: personalities,
      total,
      page,
      totalPages: Math.ceil(total / limit)
    }, { headers: cacheHeaders });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Input Validation & Sanitization
    if (!body.name || typeof body.name !== "string" || !body.name.trim()) {
      return NextResponse.json({ error: "Valid name is required" }, { status: 400 });
    }

    if (!body.category || typeof body.category !== "string") {
      return NextResponse.json({ error: "Category is required" }, { status: 400 });
    }

    if (!body.biography || typeof body.biography !== "string" || body.biography.trim().length < 20) {
      return NextResponse.json({ error: "Biography must be at least 20 characters long" }, { status: 400 });
    }

    // Security: Enforce "pending" status on all public nominations to prevent direct unvetted publishes
    const sanitizedPersonality = {
      name: body.name.trim().slice(0, 150),
      slug: (body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')).slice(0, 180),
      category: body.category.trim().slice(0, 80),
      biography: body.biography.trim().slice(0, 5000),
      profilePicture: typeof body.profilePicture === "string" ? body.profilePicture.slice(0, 500) : "",
      images: Array.isArray(body.images) ? body.images.slice(0, 5) : [],
      company: typeof body.company === "string" ? body.company.trim().slice(0, 150) : "",
      website: typeof body.website === "string" ? body.website.trim().slice(0, 250) : "",
      socialLinks: body.socialLinks && typeof body.socialLinks === "object" ? body.socialLinks : {},
      status: "pending", // Force pending approval
      featured: false,
      sponsored: false,
    };

    const newPersonality = await Personality.create(sanitizedPersonality);
    return NextResponse.json({ success: true, data: newPersonality }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
