import type { MenuCategory } from "@/content/menu.en";

export interface GalleryPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface SiteInfo {
  hoursOpen: string;
  hoursClose: string;
  phoneWhatsApp: string;
  phoneLandline: string;
  addressStreet: string;
  addressCity: string;
}

export const KV_KEYS = {
  GALLERY: "admin:gallery",
  MENU_EN: "admin:menu:en",
  MENU_ES: "admin:menu:es",
  SITE_INFO: "admin:siteinfo",
} as const;

type AdminKV = {
  get(key: string, type: "json"): Promise<unknown>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
};

async function getKV(): Promise<AdminKV | null> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext({ async: true });
    const env = ctx.env as { ADMIN_KV?: AdminKV };
    return env.ADMIN_KV ?? null;
  } catch {
    return null;
  }
}

export async function getGalleryPhotos(staticPhotos: GalleryPhoto[]): Promise<GalleryPhoto[]> {
  const kv = await getKV();
  if (!kv) return staticPhotos;
  try {
    const data = await kv.get(KV_KEYS.GALLERY, "json");
    if (Array.isArray(data) && data.length > 0) return data as GalleryPhoto[];
  } catch {
    // fall through to static
  }
  return staticPhotos;
}

export async function setGalleryPhotos(photos: GalleryPhoto[]): Promise<void> {
  const kv = await getKV();
  if (!kv) throw new Error("KV not available");
  await kv.put(KV_KEYS.GALLERY, JSON.stringify(photos));
}

export async function getMenuData(
  locale: string,
  staticMenu: MenuCategory[]
): Promise<MenuCategory[]> {
  const kv = await getKV();
  if (!kv) return staticMenu;
  const key = locale === "es" ? KV_KEYS.MENU_ES : KV_KEYS.MENU_EN;
  try {
    const data = await kv.get(key, "json");
    if (Array.isArray(data) && data.length > 0) return data as MenuCategory[];
  } catch {
    // fall through to static
  }
  return staticMenu;
}

export async function setMenuData(locale: string, menu: MenuCategory[]): Promise<void> {
  const kv = await getKV();
  if (!kv) throw new Error("KV not available");
  const key = locale === "es" ? KV_KEYS.MENU_ES : KV_KEYS.MENU_EN;
  await kv.put(key, JSON.stringify(menu));
}

export async function getSiteInfo(): Promise<SiteInfo | null> {
  const kv = await getKV();
  if (!kv) return null;
  try {
    const data = await kv.get(KV_KEYS.SITE_INFO, "json");
    return data as SiteInfo | null;
  } catch {
    return null;
  }
}

export async function setSiteInfo(info: SiteInfo): Promise<void> {
  const kv = await getKV();
  if (!kv) throw new Error("KV not available");
  await kv.put(KV_KEYS.SITE_INFO, JSON.stringify(info));
}

type AdminR2 = {
  put(
    key: string,
    value: ArrayBuffer,
    options?: { httpMetadata?: { contentType?: string } }
  ): Promise<void>;
  delete(key: string): Promise<void>;
};

export async function getR2(): Promise<AdminR2 | null> {
  try {
    const { getCloudflareContext } = await import("@opennextjs/cloudflare");
    const ctx = await getCloudflareContext({ async: true });
    const env = ctx.env as { GALLERY_IMAGES?: AdminR2 };
    return env.GALLERY_IMAGES ?? null;
  } catch {
    return null;
  }
}
