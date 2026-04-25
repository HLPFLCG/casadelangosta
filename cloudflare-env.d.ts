interface CloudflareEnv {
  ASSETS: Fetcher;
  IMAGES: ImagesBinding;
  // NEXT_CACHE_WORKERS_KV: KVNamespace;
  RESEND_API_KEY?: string;
  /** KV namespace for admin-managed content (gallery, menu, site info). */
  ADMIN_KV?: KVNamespace;
  /** R2 bucket for gallery image uploads. */
  GALLERY_IMAGES?: R2Bucket;
  /** Admin login username. */
  ADMIN_USERNAME?: string;
  /** Admin login password. */
  ADMIN_PASSWORD?: string;
  /** Secret key for signing admin JWT session tokens. */
  ADMIN_JWT_SECRET?: string;
}
