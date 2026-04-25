import { type SiteInfo, getSiteInfo, setSiteInfo } from "@/lib/admin-data";
import { ADDRESS, HOURS, PHONE_LANDLINE_DISPLAY, PHONE_WHATSAPP_DISPLAY } from "@/lib/constants";
import { NextResponse } from "next/server";

const STATIC_INFO: SiteInfo = {
  hoursOpen: HOURS.open,
  hoursClose: HOURS.close,
  phoneWhatsApp: PHONE_WHATSAPP_DISPLAY,
  phoneLandline: PHONE_LANDLINE_DISPLAY,
  addressStreet: ADDRESS.street,
  addressCity: `${ADDRESS.city}, ${ADDRESS.province}, ${ADDRESS.country}`,
};

export async function GET() {
  const data = await getSiteInfo();
  return NextResponse.json(data ?? STATIC_INFO);
}

export async function PUT(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const info = body as Partial<SiteInfo>;
  const required: (keyof SiteInfo)[] = [
    "hoursOpen",
    "hoursClose",
    "phoneWhatsApp",
    "phoneLandline",
    "addressStreet",
    "addressCity",
  ];

  for (const key of required) {
    if (typeof info[key] !== "string" || !info[key]) {
      return NextResponse.json({ error: `Missing or invalid field: ${key}` }, { status: 422 });
    }
  }

  try {
    await setSiteInfo(info as SiteInfo);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Failed to save site info:", err);
    return NextResponse.json({ error: "Storage unavailable" }, { status: 503 });
  }
}
