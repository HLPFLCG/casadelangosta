import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center px-4 bg-coconut">
      <p className="text-6xl font-display text-reef font-bold mb-4">404</p>
      <h1 className="font-display text-3xl font-bold text-palm mb-4">Page not found</h1>
      <p className="text-muted-text max-w-sm mb-8 leading-relaxed">
        The page you&apos;re looking for doesn&apos;t exist. Head back to the home page and find
        your table.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-full bg-ocean text-white px-6 h-11 text-sm font-semibold hover:bg-ocean-dark transition-colors"
      >
        Back to home
      </Link>
    </div>
  );
}
