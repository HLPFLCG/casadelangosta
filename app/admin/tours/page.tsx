import { DEMO_TOUR_BOOKINGS } from "@/lib/demo-data";
import { ArrowLeft, Map as MapIcon } from "lucide-react";
import Link from "next/link";

const STATUS_STYLES: Record<string, string> = {
  paid: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  refunded: "bg-red-100 text-red-800",
};

const TOUR_ICONS: Record<string, string> = {
  park: "🐠",
  sloths: "🦥",
  bribri: "🌿",
  dolphins: "🐬",
};

export default function AdminToursPage() {
  const paid = DEMO_TOUR_BOOKINGS.filter((b) => b.status === "paid").length;
  const totalRevenue = DEMO_TOUR_BOOKINGS.filter((b) => b.status === "paid").reduce(
    (sum, b) => sum + b.totalAmount,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center gap-4">
        <Link
          href="/admin"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>
        <div className="flex items-center gap-2 text-teal-700">
          <MapIcon className="h-5 w-5" />
          <span className="font-semibold text-gray-900">Tour Bookings</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Tour Bookings</h1>
          <p className="text-gray-500 text-sm mt-1">Demo data — database coming soon</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Total bookings</p>
            <p className="text-3xl font-bold text-gray-900">{DEMO_TOUR_BOOKINGS.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Paid</p>
            <p className="text-3xl font-bold text-green-700">{paid}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Revenue (demo)</p>
            <p className="text-3xl font-bold text-teal-700">${totalRevenue}</p>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Ref
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Guest
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Tour
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Date
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Guests
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Total
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Payment ref
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {DEMO_TOUR_BOOKINGS.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-mono text-xs text-gray-500">{b.id}</td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-900">{b.name}</div>
                      <div className="text-gray-400 text-xs">{b.email}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-700">
                      <span className="mr-1.5" aria-hidden="true">
                        {TOUR_ICONS[b.tourId]}
                      </span>
                      {b.tourLabel}
                    </td>
                    <td className="px-5 py-4 text-gray-700 font-medium">{b.date}</td>
                    <td className="px-5 py-4 text-gray-700">{b.participants}</td>
                    <td className="px-5 py-4 font-semibold text-gray-900">${b.totalAmount}</td>
                    <td className="px-5 py-4 font-mono text-xs text-gray-400">
                      {b.paymentRef || <span className="italic text-gray-300">—</span>}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[b.status]}`}
                      >
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-400 text-center">
          Showing demo data. Live bookings via Stripe webhooks will appear here once integration is
          complete.
        </p>
      </main>
    </div>
  );
}
