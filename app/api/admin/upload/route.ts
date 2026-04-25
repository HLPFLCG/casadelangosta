import { getR2 } from "@/lib/admin-data";
import { NextResponse } from "next/server";

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(req: Request) {
  const r2 = await getR2();
  if (!r2) {
    return NextResponse.json(
      {
        error: "Image storage (R2) is not configured. Please set up the GALLERY_IMAGES R2 binding.",
      },
      { status: 503 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 422 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json(
      { error: "Only JPEG, PNG, WebP and GIF images are allowed" },
      { status: 415 }
    );
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: "File size must not exceed 10 MB" }, { status: 413 });
  }

  const ext = file.name.split(".").pop() ?? "jpg";
  const key = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const buffer = await file.arrayBuffer();
  await r2.put(key, buffer, { httpMetadata: { contentType: file.type } });

  // The public URL pattern assumes the R2 bucket is exposed via a public domain
  // or Cloudflare Workers route. Adjust this base URL to match your setup.
  const publicUrl = `/api/admin/upload/${key}`;

  return NextResponse.json({ ok: true, src: publicUrl, key });
}
