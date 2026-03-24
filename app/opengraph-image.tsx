import { ImageResponse } from "next/og";

export const alt = "Nadine Kares — Brand Identity & Web Design";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  // Request with older user-agent to get truetype format from Google Fonts
  const cssRes = await fetch(
    "https://fonts.googleapis.com/css2?family=Geist:wght@600&display=swap",
    {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)",
      },
    },
  );
  const css = await cssRes.text();
  const fontUrl = css.match(/src:\s*url\(([^)]+)\)/)?.[1];

  const fontData = fontUrl
    ? await fetch(fontUrl).then((res) => res.arrayBuffer())
    : undefined;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#ffffff",
        }}
      >
        <span
          style={{
            fontFamily: fontData ? "Geist" : "sans-serif",
            fontSize: 64,
            color: "#000000",
            fontWeight: 600,
          }}
        >
          Nadine Kares
        </span>
      </div>
    ),
    {
      ...size,
      ...(fontData
        ? {
            fonts: [
              {
                name: "Geist",
                data: fontData,
                style: "normal" as const,
                weight: 600 as const,
              },
            ],
          }
        : {}),
    },
  );
}
