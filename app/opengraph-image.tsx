import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Casa de Langosta — Caribbean seafood in Cahuita, Costa Rica";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: "64px",
        background: "linear-gradient(135deg, #1f3d2b 0%, #0d6a74 60%, #1f3d2b 100%)",
        position: "relative",
      }}
    >
      {/* Decorative coral accent bar */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "6px",
          background: "#ef6a3a",
        }}
      />

      {/* Tagline */}
      <p
        style={{
          color: "#ef6a3a",
          fontSize: "22px",
          fontWeight: 600,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "16px",
          fontFamily: "serif",
        }}
      >
        Cahuita · Limón · Costa Rica
      </p>

      {/* Restaurant name */}
      <h1
        style={{
          color: "#fffaf1",
          fontSize: "76px",
          fontWeight: 700,
          lineHeight: 1.05,
          margin: "0 0 20px",
          fontFamily: "serif",
        }}
      >
        Casa de <span style={{ color: "#f3e7d3" }}>Langosta</span>
      </h1>

      <p
        style={{
          color: "#f3e7d3",
          fontSize: "28px",
          lineHeight: 1.4,
          maxWidth: "700px",
          margin: 0,
          fontFamily: "sans-serif",
        }}
      >
        Fresh Caribbean lobster — pulled from our tank, plated on the sand.
      </p>
    </div>,
    { ...size }
  );
}
