import { ImageResponse } from "next/og";
import { profile } from "@/data";

export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(135deg, #0a0e17 0%, #111827 50%, #1a1033 100%)",
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: 28,
            background: "linear-gradient(90deg, #22d3ee, #a78bfa, #bef264)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: 16,
          }}
        >
          {profile.title}
        </div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>
          {profile.name}
        </div>
        <div style={{ fontSize: 24, color: "#94a3b8", marginTop: 24, maxWidth: 700 }}>
          {profile.availability}
        </div>
      </div>
    ),
    { ...size },
  );
}
