import { DEMO_RESERVATIONS } from "@/lib/demo-data";
import { ArrowLeft, CalendarDays } from "lucide-react";
import Link from "next/link";

const STATUS_STYLES: Record<string, string> = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-amber-100 text-amber-800",
  cancelled: "bg-red-100 text-red-800",
};

export default function AdminReservationsPage() {
  const confirmed = DEMO_RESERVATIONS.filter((r) => r.status === "confirmed").length;
  const pending = DEMO_RESERVATIONS.filter((r) => r.status === "pending").length;

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
          <CalendarDays className="h-5 w-5" />
          <span className="font-semibold text-gray-900">Reservations</span>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reservations</h1>
            <p className="text-gray-500 text-sm mt-1">Demo data — database coming soon</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Total</p>
            <p className="text-3xl font-bold text-gray-900">{DEMO_RESERVATIONS.length}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Confirmed</p>
            <p className="text-3xl font-bold text-green-700">{confirmed}</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <p className="text-sm text-gray-500">Pending</p>
            <p className="text-3xl font-bold text-amber-600">{pending}</p>
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
                    Name
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Date & Time
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Party
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Contact
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Requests
                  </th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {DEMO_RESERVATIONS.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-5 py-4 font-mono text-xs text-gray-500">{r.id}</td>
                    <td className="px-5 py-4 font-medium text-gray-900">{r.name}</td>
                    <td className="px-5 py-4 text-gray-700">
                      <span className="font-medium">{r.date}</span>{" "}
                      <span className="text-gray-400">at</span>{" "}
                      <span className="font-medium">{r.time}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-700">{r.partySize}</td>
                    <td className="px-5 py-4">
                      <div className="text-gray-700">{r.email}</div>
                      <div className="text-gray-400 text-xs">{r.phone}</div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 max-w-xs truncate">
                      {r.specialRequests || <span className="text-gray-300 italic">None</span>}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_STYLES[r.status]}`}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mt-6 text-xs text-gray-400 text-center">
          Showing demo data. Live reservations will appear here once database integration is
          complete.
        </p>
      </main>
    </div>
  );
}
