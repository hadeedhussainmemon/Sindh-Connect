import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User, { UserRole } from "@/models/User";
import { auth } from "@/auth";
import { hashPassword } from "@/lib/password";

export async function POST(req: Request) {
  try {
    // 1. Strict Authorization check: user must be authenticated
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized. Please sign in." }, { status: 401 });
    }

    const body = await req.json();
    const newPassword = typeof body?.newPassword === "string" ? body.newPassword : "";

    if (!newPassword || newPassword.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    await dbConnect();
    const hashedPassword = await hashPassword(newPassword);

    // Update password for the currently authenticated session email only
    const updated = await User.findOneAndUpdate(
      { email: session.user.email.toLowerCase() },
      { $set: { password: hashedPassword } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json({ error: "User account not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
