"use client";

import { ArrowLeft, GripVertical, ImageIcon, Trash2, Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function AdminGalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/admin/gallery")
      .then((r) => r.json())
      .then((data) => setPhotos(data))
      .catch(() => setMessage({ type: "error", text: "Failed to load gallery" }))
      .finally(() => setLoading(false));
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage(null);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: form });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string }).error ?? "Upload failed");
      }
      const { src } = (await res.json()) as { src: string };
      const alt = prompt("Enter a description for this photo:", file.name) ?? file.name;
      setPhotos((prev) => [...prev, { src, alt, width: 800, height: 600 }]);
      setMessage({ type: "success", text: "Photo uploaded. Click Save to publish." });
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Upload failed" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/gallery", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(photos),
      });
      if (!res.ok) throw new Error("Save failed");
      setMessage({ type: "success", text: "Gallery saved successfully." });
    } catch {
      setMessage({ type: "error", text: "Failed to save gallery." });
    } finally {
      setSaving(false);
    }
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  function updateAlt(index: number, alt: string) {
    setPhotos((prev) => prev.map((p, i) => (i === index ? { ...p, alt } : p)));
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-gray-400 hover:text-gray-700 transition">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5 text-teal-700" />
          <span className="font-semibold text-gray-900">Gallery</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-1.5 cursor-pointer rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
            <Upload className="h-4 w-4" />
            {uploading ? "Uploading…" : "Upload photo"}
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleUpload}
              disabled={uploading}
            />
          </label>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-teal-700 text-white px-4 py-2 text-sm font-semibold hover:bg-teal-800 transition disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-10">
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
          <p className="text-gray-500">Loading gallery…</p>
        ) : photos.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <ImageIcon className="h-12 w-12 mx-auto mb-3 opacity-40" />
            <p>No photos yet. Upload your first photo above.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {photos.map((photo, index) => (
              <div
                key={photo.src}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden group"
              >
                <div className="relative aspect-[4/3] bg-gray-100">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    unoptimized={photo.src.startsWith("/api/")}
                  />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute top-2 right-2 rounded-full bg-white/90 p-1.5 text-red-600 hover:bg-red-50 transition opacity-0 group-hover:opacity-100"
                    aria-label="Remove photo"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100">
                    <GripVertical className="h-5 w-5 text-white drop-shadow" />
                  </div>
                </div>
                <div className="p-3">
                  <input
                    type="text"
                    value={photo.alt}
                    onChange={(e) => updateAlt(index, e.target.value)}
                    placeholder="Photo description"
                    className="w-full text-sm text-gray-700 border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-teal-500 rounded px-1 py-0.5"
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
