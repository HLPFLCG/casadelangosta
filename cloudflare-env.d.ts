interface CloudflareEnv {
  ASSETS: Fetcher;
  IMAGES: ImagesBinding;
  // NEXT_CACHE_WORKERS_KV: KVNamespace;
  /** Resend API key. When set, email notifications are sent on every contact form submission. */
  RESEND_API_KEY?: string;
  /** Email address to receive reservation notifications (restaurant owner). */
  NOTIFY_EMAIL_OWNER?: string;
  /** Email address to receive reservation notifications (site admin). */
  NOTIFY_EMAIL_ADMIN?: string;
  /** The "from" address used for outgoing notification emails. Must be on a Resend-verified domain. */
  RESEND_FROM_EMAIL?: string;
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
