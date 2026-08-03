import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const dynamic = "force-static";

// Favicons render outside any viewer's theme preference, so — same reasoning
// as opengraph-image.tsx — this stays fixed to the light palette's raw hex
// values rather than the CSS custom properties in globals.css, which Satori
// can't read anyway. Plum background + paper letters is the site's existing
// "inverted section" pairing (--surface-feature / --text-on-feature), chosen
// over gold-on-plum because gold-on-plum measures ~3.1:1 — legible on a
// mono display type scale, but short of the contrast discipline the rest of
// the palette holds itself to. The gold rule underneath is a nod to the
// Ledger's rule-and-figure motif; it can wash out at 16px, which is fine —
// the monogram alone still reads.
export default function Icon(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#221A29",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: -0.5,
            color: "#EFEEEB",
            lineHeight: 1,
          }}
        >
          BN
        </div>
        <div
          style={{
            display: "flex",
            width: 16,
            height: 2,
            marginTop: 3,
            backgroundColor: "#8A6323",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
