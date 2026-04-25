"use client";

import { ArrowLeft, Info } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface SiteInfo {
  hoursOpen: string;
  hoursClose: string;
  phoneWhatsApp: string;
  phoneLandline: string;
  addressStreet: string;
  addressCity: string;
}

const FIELD_LABELS: Record<keyof SiteInfo, string> = {
  hoursOpen: "Opening time (e.g. 12:00)",
  hoursClose: "Closing time (e.g. 22:00)",
  phoneWhatsApp: "WhatsApp number (with country code, e.g. +506 8457 8407)",
  phoneLandline: "Landline number (e.g. 2755 1148)",
  addressStreet: "Street address",
  addressCity: "City, Province, Country",
};

export default function AdminContentPage() {
  const [info, setInfo] = useState<SiteInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((r) => r.json())
      .then((data) => setInfo(data))
      .catch(() => setMessage({ type: "error", text: "Failed to load site info" }))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!info) return;
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      if (!res.ok) throw new Error("Save failed");
      setMessage({ type: "success", text: "Site info saved successfully." });
    } catch {
      setMessage({ type: "error", text: "Failed to save site info." });
    } finally {
      setSaving(false);
    }
  }

  function updateField(key: keyof SiteInfo, value: string) {
    setInfo((prev) => (prev ? { ...prev, [key]: value } : prev));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-gray-400 hover:text-gray-700 transition">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <Info className="h-5 w-5 text-teal-700" />
          <span className="font-semibold text-gray-900">Site Info</span>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10">
        {message && (
          <div
            className={`mb-6 rounded-lg px-4 py-3 text-sm ${
              message.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : !info ? (
          <p className="text-red-600">Failed to load site info.</p>
        ) : (
          <form
            onSubmit={handleSave}
            className="bg-white rounded-2xl border border-gray-200 p-6 space-y-5"
          >
            {(Object.keys(FIELD_LABELS) as (keyof SiteInfo)[]).map((key) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
                  {FIELD_LABELS[key]}
                </label>
                <input
                  id={key}
                  type="text"
                  value={info[key]}
                  onChange={(e) => updateField(key, e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                  required
                />
              </div>
            ))}

            <div className="pt-2">
              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-lg bg-teal-700 text-white py-2.5 text-sm font-semibold hover:bg-teal-800 transition disabled:opacity-60"
              >
                {saving ? "Saving…" : "Save changes"}
              </button>
            </div>
          </form>
        )}

        <p className="mt-6 text-xs text-gray-400">
          Changes to site info are stored in Cloudflare KV. The public pages will reflect these
          updates immediately on the next request (once KV is configured).
        </p>
      </main>
    </div>
  );
}
