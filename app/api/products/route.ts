import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/db";
import Product from "@/models/Product";
import { auth } from "@/auth";

export async function GET(req: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    const query: any = {};
    if (category && category !== "All") {
      query.category = { $regex: new RegExp(category, "i") };
    }
    if (featured === "true") {
      query.featured = true;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { originCity: { $regex: search, $options: "i" } },
        { artisanName: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 }).lean();
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session?.user || role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized. Admin required." }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();

    if (!body.title || !body.price || !body.primaryImage) {
      return NextResponse.json({ error: "Title, price and primary image are required." }, { status: 400 });
    }

    // Generate slug from title
    const slug = body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") + "-" + Date.now().toString().slice(-4);

    const product = await Product.create({
      ...body,
      slug,
      images: body.images && body.images.length > 0 ? body.images : [body.primaryImage]
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session?.user || role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized. Admin required." }, { status: 403 });
    }

    await dbConnect();
    const body = await req.json();
    const { _id, ...updateData } = body;

    if (!_id) {
      return NextResponse.json({ error: "Product ID is required for update." }, { status: 400 });
    }

    const updated = await Product.findByIdAndUpdate(_id, updateData, { new: true });
    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const session = await auth();
    const role = (session?.user as any)?.role;
    if (!session?.user || role !== "Admin") {
      return NextResponse.json({ error: "Unauthorized. Admin required." }, { status: 403 });
    }

    await dbConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Product ID required." }, { status: 400 });
    }

    await Product.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Product deleted successfully." });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
