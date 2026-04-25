import { menu as menuEn } from "@/content/menu.en";
import { menu as menuEs } from "@/content/menu.es";
import { requireAdminAuth } from "@/lib/admin-auth";
import { getMenuData, setMenuData } from "@/lib/admin-data";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  if (!(await requireAdminAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") === "es" ? "es" : "en";
  const staticMenu = locale === "es" ? menuEs : menuEn;
  const data = await getMenuData(locale, staticMenu);
  return NextResponse.json(data);
}

export async function PUT(req: Request) {
  if (!(await requireAdminAuth(req))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") === "es" ? "es" : "en";

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!Array.isArray(body)) {
    return NextResponse.json({ error: "Expected an array of menu categories" }, { status: 422 });
  }

  try {
    await setMenuData(locale, body);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save menu:", err);
    return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
  }
}
