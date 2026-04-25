"use client";

import { ArrowLeft, Check, Pencil, Plus, Trash2, UtensilsCrossed, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type DietaryBadge = "gf" | "v" | "vegan" | "spicy" | "shellfish" | "market_price";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  priceUSD?: number;
  priceCRC?: number;
  marketPrice?: boolean;
  badges: DietaryBadge[];
}

interface MenuCategory {
  id: string;
  items: MenuItem[];
}

const ALL_BADGES: DietaryBadge[] = ["gf", "v", "vegan", "spicy", "shellfish", "market_price"];

const BADGE_LABELS: Record<DietaryBadge, string> = {
  gf: "Gluten-free",
  v: "Vegetarian",
  vegan: "Vegan",
  spicy: "Spicy",
  shellfish: "Shellfish",
  market_price: "Market price",
};

const EMPTY_ITEM: Omit<MenuItem, "id"> = {
  name: "",
  description: "",
  priceUSD: undefined,
  priceCRC: undefined,
  marketPrice: false,
  badges: [],
};

interface EditingItem {
  categoryId: string;
  itemId: string | null; // null = new item
  draft: Omit<MenuItem, "id">;
}

export default function AdminMenuPage() {
  const [locale, setLocale] = useState<"en" | "es">("en");
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<EditingItem | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/admin/menu?locale=${locale}`)
      .then((r) => r.json())
      .then((data) => setCategories(data))
      .catch(() => setMessage({ type: "error", text: "Failed to load menu" }))
      .finally(() => setLoading(false));
  }, [locale]);

  async function handleSave() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/menu?locale=${locale}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categories),
      });
      if (!res.ok) throw new Error("Save failed");
      setMessage({ type: "success", text: "Menu saved successfully." });
    } catch {
      setMessage({ type: "error", text: "Failed to save menu." });
    } finally {
      setSaving(false);
    }
  }

  function startEdit(categoryId: string, item: MenuItem) {
    setEditing({ categoryId, itemId: item.id, draft: { ...item } });
  }

  function startAdd(categoryId: string) {
    setEditing({ categoryId, itemId: null, draft: { ...EMPTY_ITEM, badges: [] } });
  }

  function commitEdit() {
    if (!editing) return;
    const { categoryId, itemId, draft } = editing;
    setCategories((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        if (itemId === null) {
          const newId = `item-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
          return { ...cat, items: [...cat.items, { ...draft, id: newId }] };
        }
        return {
          ...cat,
          items: cat.items.map((it) => (it.id === itemId ? { ...it, ...draft } : it)),
        };
      })
    );
    setEditing(null);
  }

  function deleteItem(categoryId: string, itemId: string) {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId ? { ...cat, items: cat.items.filter((it) => it.id !== itemId) } : cat
      )
    );
  }

  function toggleBadge(badge: DietaryBadge) {
    if (!editing) return;
    setEditing((prev) => {
      if (!prev) return prev;
      const badges = prev.draft.badges.includes(badge)
        ? prev.draft.badges.filter((b) => b !== badge)
        : [...prev.draft.badges, badge];
      return { ...prev, draft: { ...prev.draft, badges } };
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <Link href="/admin" className="text-gray-400 hover:text-gray-700 transition">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div className="flex items-center gap-2">
          <UtensilsCrossed className="h-5 w-5 text-teal-700" />
          <span className="font-semibold text-gray-900">Menu</span>
        </div>
        <div className="ml-auto flex items-center gap-3">
          <div className="flex rounded-lg border border-gray-300 overflow-hidden text-sm">
            <button
              type="button"
              onClick={() => setLocale("en")}
              className={`px-3 py-1.5 ${locale === "en" ? "bg-teal-700 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLocale("es")}
              className={`px-3 py-1.5 border-l border-gray-300 ${locale === "es" ? "bg-teal-700 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
            >
              Español
            </button>
          </div>
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

      <main className="max-w-3xl mx-auto px-6 py-10">
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
          <p className="text-gray-500">Loading menu…</p>
        ) : (
          <div className="space-y-10">
            {categories.map((cat) => (
              <section key={cat.id}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-800 capitalize">{cat.id}</h2>
                  <button
                    type="button"
                    onClick={() => startAdd(cat.id)}
                    className="flex items-center gap-1 text-sm text-teal-700 hover:text-teal-900 font-medium"
                  >
                    <Plus className="h-4 w-4" /> Add item
                  </button>
                </div>

                <div className="space-y-3">
                  {cat.items.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-xl border border-gray-200 px-4 py-3 flex items-start gap-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 text-sm truncate">{item.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {item.badges.map((b) => (
                            <span
                              key={b}
                              className="text-[10px] bg-teal-50 text-teal-700 rounded-full px-2 py-0.5"
                            >
                              {BADGE_LABELS[b]}
                            </span>
                          ))}
                          {item.marketPrice ? (
                            <span className="text-[10px] bg-amber-50 text-amber-700 rounded-full px-2 py-0.5">
                              Market price
                            </span>
                          ) : (
                            item.priceUSD != null && (
                              <span className="text-[10px] bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                                ${item.priceUSD}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                      <div className="flex gap-1 shrink-0 mt-0.5">
                        <button
                          type="button"
                          onClick={() => startEdit(cat.id, item)}
                          className="p-1.5 text-gray-400 hover:text-teal-700 hover:bg-teal-50 rounded-lg transition"
                          aria-label={`Edit ${item.name}`}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteItem(cat.id, item.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          aria-label={`Delete ${item.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Edit / Add Modal */}
      {editing && (
        <div
          role="presentation"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={(e) => e.target === e.currentTarget && setEditing(null)}
          onKeyDown={(e) => e.key === "Escape" && setEditing(null)}
        >
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="font-semibold text-gray-900">
                {editing.itemId ? "Edit item" : "Add item"}
              </h3>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              <div>
                <label htmlFor="item-name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  id="item-name"
                  type="text"
                  value={editing.draft.name}
                  onChange={(e) =>
                    setEditing((p) => p && { ...p, draft: { ...p.draft, name: e.target.value } })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                />
              </div>

              <div>
                <label htmlFor="item-desc" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="item-desc"
                  rows={3}
                  value={editing.draft.description}
                  onChange={(e) =>
                    setEditing(
                      (p) => p && { ...p, draft: { ...p.draft, description: e.target.value } }
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600 resize-none"
                />
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    checked={!!editing.draft.marketPrice}
                    onChange={(e) =>
                      setEditing(
                        (p) => p && { ...p, draft: { ...p.draft, marketPrice: e.target.checked } }
                      )
                    }
                    className="rounded"
                  />
                  Market price (no fixed price)
                </label>
              </div>

              {!editing.draft.marketPrice && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="item-price-usd"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Price (USD)
                    </label>
                    <input
                      id="item-price-usd"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editing.draft.priceUSD ?? ""}
                      onChange={(e) =>
                        setEditing(
                          (p) =>
                            p && {
                              ...p,
                              draft: {
                                ...p.draft,
                                priceUSD: e.target.value ? Number(e.target.value) : undefined,
                              },
                            }
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="item-price-crc"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Price (CRC ₡)
                    </label>
                    <input
                      id="item-price-crc"
                      type="number"
                      min="0"
                      step="1"
                      value={editing.draft.priceCRC ?? ""}
                      onChange={(e) =>
                        setEditing(
                          (p) =>
                            p && {
                              ...p,
                              draft: {
                                ...p.draft,
                                priceCRC: e.target.value ? Number(e.target.value) : undefined,
                              },
                            }
                        )
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-600"
                    />
                  </div>
                </div>
              )}

              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Dietary badges</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_BADGES.map((b) => {
                    const active = editing.draft.badges.includes(b);
                    return (
                      <button
                        key={b}
                        type="button"
                        onClick={() => toggleBadge(b)}
                        className={`text-xs px-3 py-1.5 rounded-full border transition ${
                          active
                            ? "bg-teal-700 text-white border-teal-700"
                            : "bg-white text-gray-600 border-gray-300 hover:border-teal-400"
                        }`}
                      >
                        {BADGE_LABELS[b]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={commitEdit}
                disabled={!editing.draft.name.trim()}
                className="flex items-center gap-1.5 px-4 py-2 text-sm bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition disabled:opacity-60"
              >
                <Check className="h-4 w-4" />
                {editing.itemId ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
