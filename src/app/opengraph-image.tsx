import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} · ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Built in the same Field Press palette as the site: pine ground, butter
 * highlight, cream type. ImageResponse supports only flexbox and a subset
 * of CSS, and cannot reach the condensed grotesque the site sets headlines
 * in, so the card leans on scale and colour to carry the same voice.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#1D4A31",
        color: "#EFECE1",
        padding: "72px 80px",
        fontFamily: "Helvetica, Arial, sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 48, height: 1, backgroundColor: "#EEE0AB" }} />
        <div
          style={{
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#EEE0AB",
          }}
        >
          {`Curated by ${site.author}`}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontSize: 96,
            lineHeight: 0.98,
            letterSpacing: -3,
            fontWeight: 700,
            textTransform: "uppercase",
          }}
        >
          Everything worth
        </div>
        <div
          style={{
            fontSize: 96,
            lineHeight: 0.98,
            letterSpacing: -3,
            fontWeight: 700,
            textTransform: "uppercase",
            color: "#EEE0AB",
          }}
        >
          reading.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          borderTop: "2px solid rgba(239,236,225,0.3)",
          paddingTop: 28,
          fontSize: 26,
          lineHeight: 1.35,
          color: "rgba(239,236,225,0.8)",
          maxWidth: 880,
        }}
      >
        No clickbait. No overwhelming feed. Just conversations, templates, and
        summaries on product management.
      </div>
    </div>,
    size,
  );
}
