"use client";

import { ImageIcon, Info, LayoutDashboard, LogOut, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const sections = [
  {
    href: "/admin/gallery",
    icon: ImageIcon,
    label: "Gallery",
    description: "Upload photos and manage the gallery",
  },
  {
    href: "/admin/menu",
    icon: UtensilsCrossed,
    label: "Menu",
    description: "Edit menu items, prices, and descriptions",
  },
  {
    href: "/admin/content",
    icon: Info,
    label: "Site Info",
    description: "Update hours, phone, and address",
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleLogout() {
    setLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-teal-700">
          <LayoutDashboard className="h-5 w-5" />
          <span className="font-semibold text-gray-900">Casa de Langosta — Admin</span>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={loggingOut}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-red-600 transition-colors disabled:opacity-60"
        >
          <LogOut className="h-4 w-4" />
          {loggingOut ? "Signing out…" : "Sign out"}
        </button>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-10">
          Welcome back. Choose a section to edit your website content.
        </p>

        <div className="grid sm:grid-cols-3 gap-6">
          {sections.map(({ href, icon: Icon, label, description }) => (
            <Link
              key={href}
              href={href}
              className="block bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-md hover:border-teal-300 transition group"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-teal-50 text-teal-700 mb-4 group-hover:bg-teal-100 transition">
                <Icon className="h-6 w-6" />
              </div>
              <h2 className="font-semibold text-gray-900 mb-1">{label}</h2>
              <p className="text-sm text-gray-500">{description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-5">
          <p className="text-sm font-medium text-amber-800">Setup reminder</p>
          <p className="text-sm text-amber-700 mt-1">
            To enable live edits, configure the{" "}
            <code className="font-mono text-xs bg-amber-100 px-1 rounded">ADMIN_KV</code> KV
            namespace and{" "}
            <code className="font-mono text-xs bg-amber-100 px-1 rounded">GALLERY_IMAGES</code> R2
            bucket in your Cloudflare Workers settings. See{" "}
            <code className="font-mono text-xs bg-amber-100 px-1 rounded">wrangler.jsonc</code> for
            instructions.
          </p>
        </div>
      </main>
    </div>
  );
}
