import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/db";
import SiteConfig from "@/models/SiteConfig";
import { auth } from "@/auth";

export async function GET() {
  try {
    await dbConnect();
    let config = await SiteConfig.findOne({ key: "main" }).lean();
    if (!config) {
      config = await SiteConfig.create({ key: "main" });
    }
    return NextResponse.json(config, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // Restrict configuration modifications strictly to authenticated Administrators
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session?.user || role !== "Admin") {
      return NextResponse.json({ error: "Forbidden. Administrator credentials required." }, { status: 403 });
    }

    await dbConnect();
    const data = await req.json();

    // Whitelist and sanitize permitted site configuration fields including hero options
    const allowedFields = [
      "headline", "subheadline", "eyebrowLabel",
      "primaryCtaText", "primaryCtaLink",
      "secondaryCtaText", "secondaryCtaLink",
      "heroCaptionBadge", "heroCaptionLocation", "heroCaptionTitle", "heroCaptionDescription",
      "heroSlides",
      "logoUrl", "faviconUrl", "heroImageUrl",
      "aboutIntro", "vision", "mission", "coreValues", "objectives",
      "selectionCriteria", "categories", "whyUs", "founderMessage",
      "impact", "joinUs", "aboutText"
    ];

    const sanitizedData: any = {};
    for (const key of allowedFields) {
      if (data[key] !== undefined) {
        sanitizedData[key] = data[key];
      }
    }

    const config = await SiteConfig.findOneAndUpdate(
      { key: "main" },
      { $set: sanitizedData },
      { new: true, upsert: true }
    );
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
