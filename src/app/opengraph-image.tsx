import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} · ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Built with the same editorial palette as the site. ImageResponse supports
 * only flexbox and a subset of CSS, so this is laid out with plain columns
 * and system serif rather than the web font used on the page.
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
        backgroundColor: "#FAF8F5",
        color: "#1C1917",
        padding: "72px 80px",
        fontFamily: "Georgia, serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ width: 48, height: 1, backgroundColor: "#B08D57" }} />
        <div
          style={{
            fontSize: 20,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#8A6A3B",
            fontFamily: "Helvetica, Arial, sans-serif",
          }}
        >
          {`Curated by ${site.author}`}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 92, lineHeight: 1.02, letterSpacing: -2 }}>
          Court&rsquo;s
        </div>
        <div
          style={{
            fontSize: 92,
            lineHeight: 1.02,
            letterSpacing: -2,
            fontStyle: "italic",
            color: "#3D3835",
          }}
        >
          Product Resources
        </div>
      </div>

      <div
        style={{
          display: "flex",
          borderTop: "1px solid rgba(28,25,23,0.2)",
          paddingTop: 28,
          fontSize: 26,
          lineHeight: 1.35,
          color: "#3D3835",
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
