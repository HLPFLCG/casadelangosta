import { requireAdminAuth } from "@/lib/admin-auth";
import { getGalleryPhotos, setGalleryPhotos } from "@/lib/admin-data";
import { NextResponse } from "next/server";

const STATIC_PHOTOS = [
  { src: "/images/hero-dining.jpg", alt: "Open-air dining area", width: 1200, height: 800 },
  {
    src: "/images/lobster-tank.jpg",
    alt: "Fresh Caribbean spiny lobster in the tank",
    width: 800,
    height: 600,
  },
  { src: "/images/lobster-coconut.jpg", alt: "Lobster in coconut sauce", width: 800, height: 600 },
  { src: "/images/ceviche.jpg", alt: "Fish ceviche", width: 800, height: 600 },
  { src: "/images/roberto.jpg", alt: "Roberto in the open kitchen", width: 800, height: 1000 },
  { src: "/images/coast.jpg", alt: "Cahuita's Caribbean coastline", width: 1200, height: 800 },
  {
    src: "/images/interior-1.jpg",
    alt: "Guests dining under the thatched roof",
    width: 800,
    height: 600,
  },
  { src: "/images/interior-2.jpg", alt: "Handcrafted local-wood table", width: 800, height: 600 },
  { src: "/images/snapper.jpg", alt: "Whole grilled red snapper", width: 800, height: 600 },
  { src: "/images/jerk-chicken.jpg", alt: "Caribbean jerk chicken", width: 800, height: 600 },
];

export async function GET(req: Request) {
  if (!(await requireAdminAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const photos = await getGalleryPhotos(STATIC_PHOTOS);
  return NextResponse.json(photos);
}

export async function PUT(req: Request) {
  if (!(await requireAdminAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an array of photos" }, { status: 422 });
  }

  try {
    await setGalleryPhotos(body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save gallery:", err);
    return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
  }
}
