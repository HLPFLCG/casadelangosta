import "@/styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Admin — Casa de Langosta",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 font-sans antialiased">{children}</body>
    </html>
  );
}
