import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

// Maximum allowable file size: 5 Megabytes
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif"
]);

export async function POST(req: Request) {
  try {
    // 1. Session verification: only signed-in users or contributors can upload assets
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: "Authentication required to upload media" }, { status: 401 });
    }

    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return NextResponse.json({ error: "Media storage is currently unconfigured" }, { status: 503 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const isLogo = formData.get("isLogo") === "true";
    if (!file) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 });
    }

    // 2. MIME type validation
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json({ 
        error: "Invalid file type. Supported formats: JPEG, PNG, WebP, AVIF." 
      }, { status: 400 });
    }

    // 3. File size check
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ 
        error: "File size exceeds the 5MB limit" 
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    let buffer = Buffer.from(bytes);

    // If uploading a logo or explicit background removal is requested, process with sharp
    if (isLogo) {
      try {
        const sharp = require("sharp");
        const image = sharp(buffer);
        const { width, height } = await image.metadata();
        const { data } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });

        // BFS flood-fill transparency from edges on white/off-white background
        const visited = new Uint8Array(width * height);
        const queue: number[] = [];

        const isWhite = (idx: number) => {
          const r = data[idx * 4];
          const g = data[idx * 4 + 1];
          const b = data[idx * 4 + 2];
          return r > 238 && g > 238 && b > 238;
        };

        for (let x = 0; x < width; x++) {
          const top = x;
          const btm = (height - 1) * width + x;
          if (isWhite(top)) { queue.push(top); visited[top] = 1; }
          if (isWhite(btm)) { queue.push(btm); visited[btm] = 1; }
        }
        for (let y = 0; y < height; y++) {
          const left = y * width;
          const right = y * width + (width - 1);
          if (!visited[left] && isWhite(left)) { queue.push(left); visited[left] = 1; }
          if (!visited[right] && isWhite(right)) { queue.push(right); visited[right] = 1; }
        }

        let head = 0;
        while (head < queue.length) {
          const curr = queue[head++];
          const cx = curr % width;
          const cy = Math.floor(curr / width);
          data[curr * 4 + 3] = 0; // Alpha -> 0

          const neighbors = [
            cx > 0 ? curr - 1 : -1,
            cx < width - 1 ? curr + 1 : -1,
            cy > 0 ? curr - width : -1,
            cy < height - 1 ? curr + width : -1
          ];

          for (const n of neighbors) {
            if (n !== -1 && !visited[n] && isWhite(n)) {
              visited[n] = 1;
              queue.push(n);
            }
          }
        }

        buffer = await sharp(data, { raw: { width, height, channels: 4 } })
          .png({ compressionLevel: 9 })
          .toBuffer();
      } catch (e) {
        console.warn("Sharp background removal fallback:", e);
      }
    }

    // 4. Secure stream upload with automatic optimization transformations
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "sindh_connect",
          resource_type: "image",
          transformation: [
            { quality: "auto:good", fetch_format: "auto" },
            { width: 2000, crop: "limit" }
          ]
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    return NextResponse.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      width: uploadResult.width,
      height: uploadResult.height,
      format: uploadResult.format,
      bytes: uploadResult.bytes,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
  }
}
