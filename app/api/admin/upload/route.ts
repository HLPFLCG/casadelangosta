import { requireAdminAuth } from "@/lib/admin-auth";
import { getR2 } from "@/lib/admin-data";
import { NextResponse } from "next/server";

const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MIME_TO_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

export async function POST(req: Request) {
  if (!(await requireAdminAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

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

  // Derive extension from MIME type (safe) rather than filename (untrusted).
  const ext = MIME_TO_EXT[file.type] ?? "jpg";
  const key = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

  const buffer = await file.arrayBuffer();
  await r2.put(key, buffer, { httpMetadata: { contentType: file.type } });

  // NOTE: The URL below is a placeholder. To serve uploaded images publicly you must
  // either (a) enable public access on the R2 bucket and use its public domain, or
  // (b) create a Cloudflare Worker route that proxies R2 objects.
  // Update `R2_PUBLIC_BASE_URL` in your environment (e.g. https://images.casadelangosta.cr)
  // once the bucket is publicly exposed.
  const base = process.env.R2_PUBLIC_BASE_URL ?? "";
  const src = base ? `${base}/${key}` : "/images/placeholder.jpg";

  return NextResponse.json({ ok: true, src, key });
}
