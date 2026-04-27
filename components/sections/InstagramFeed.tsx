import { ExternalLink, Instagram } from "lucide-react";
import { getTranslations } from "next-intl/server";

const IG_HANDLE = "casalangosta.cahuita";
const IG_URL = "https://www.instagram.com/casalangosta.cahuita/";

interface InstagramPost {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
}

async function fetchPosts(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  try {
    const res = await fetch(
      `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${token}&limit=9`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const data = await res.json();
    return (data.data ?? []) as InstagramPost[];
  } catch {
    return [];
  }
}

export async function InstagramFeed() {
  const t = await getTranslations("instagram");
  const posts = await fetchPosts();

  return (
    <section className="py-20 bg-sand">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-ocean hover:text-reef transition-colors mb-3"
          >
            <Instagram className="h-6 w-6" aria-hidden="true" />
            <span className="font-display text-lg font-semibold">@{IG_HANDLE}</span>
          </a>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-palm mb-4">
            {t("title")}
          </h2>
          <p className="text-palm/70 text-lg max-w-xl">{t("subtitle")}</p>
        </div>

        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-3 gap-1 sm:gap-2 rounded-2xl overflow-hidden mb-8">
              {posts.map((post) => {
                const src =
                  post.media_type === "VIDEO" ? post.thumbnail_url : post.media_url;
                if (!src) return null;
                return (
                  <a
                    key={post.id}
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-square overflow-hidden group block"
                    aria-label={post.caption?.slice(0, 80) ?? "View on Instagram"}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={src}
                      alt={post.caption?.slice(0, 120) ?? ""}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-palm/0 group-hover:bg-palm/40 transition-colors duration-300 flex items-center justify-center">
                      <Instagram className="h-7 w-7 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </a>
                );
              })}
            </div>
            <div className="text-center">
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ocean hover:text-reef font-semibold transition-colors"
              >
                {t("view_more")}
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </>
        ) : (
          <div className="flex justify-center">
            <a
              href={IG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white font-semibold px-8 py-4 rounded-2xl hover:opacity-90 transition-opacity text-lg shadow-lg"
            >
              <Instagram className="h-6 w-6" aria-hidden="true" />
              {t("follow_cta")}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
