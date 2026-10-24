import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/db";
import Gallery from "@/models/Gallery";
import { auth } from "@/auth";

export async function GET() {
  try {
    await dbConnect();
    const gallery = await Gallery.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(gallery, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30" }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session?.user || (role !== "Admin" && role !== "Editor")) {
      return NextResponse.json({ error: "Unauthorized. Staff authorization required." }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();

    if (!body.imageUrl || typeof body.imageUrl !== "string") {
      return NextResponse.json({ error: "Image URL is required" }, { status: 400 });
    }

    const newItem = await Gallery.create({
      title: typeof body.title === "string" ? body.title.trim().slice(0, 150) : "Heritage Asset",
      category: typeof body.category === "string" ? body.category.trim().slice(0, 80) : "Heritage",
      imageUrl: body.imageUrl.slice(0, 500)
    });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
