import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/db";
import Event from "@/models/Event";
import { auth } from "@/auth";

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find({}).sort({ date: 1 }).lean();
    return NextResponse.json(events, {
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

    if (!body.title || typeof body.title !== "string" || !body.title.trim()) {
      return NextResponse.json({ error: "Event title is required" }, { status: 400 });
    }

    const newEvent = await Event.create({
      title: body.title.trim().slice(0, 150),
      date: body.date ? new Date(body.date) : new Date(),
      description: typeof body.description === "string" ? body.description.trim().slice(0, 1000) : "",
      location: typeof body.location === "string" ? body.location.trim().slice(0, 150) : "Sindh",
      status: body.status || "upcoming"
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
