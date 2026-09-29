import { ImageResponse } from "next/og";

export const alt = "Nexora — Digital Product Engineering";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px",
        color: "#F9FAFB",
        background:
          "linear-gradient(135deg, #090D16 0%, #111827 65%, #312E81 100%)",
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "18px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "64px",
            height: "64px",
            borderRadius: "16px",
            background: "#6366F1",
            fontSize: "38px",
            fontWeight: 700,
          }}
        >
          N
        </div>

        <div
          style={{
            display: "flex",
            fontSize: "32px",
            fontWeight: 700,
            letterSpacing: "5px",
          }}
        >
          NEXORA
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            color: "#A5B4FC",
            fontSize: "22px",
            letterSpacing: "3px",
          }}
        >
          DIGITAL PRODUCT ENGINEERING
        </div>

        <div
          style={{
            display: "flex",
            maxWidth: "1000px",
            fontSize: "68px",
            fontWeight: 700,
            lineHeight: 1.12,
          }}
        >
          Build the platform your next chapter needs.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          borderTop: "1px solid #374151",
          paddingTop: "24px",
          color: "#D1D5DB",
          fontSize: "24px",
        }}
      >
        Web Development • AI Solutions • Cloud Engineering
      </div>
    </div>,
    size,
  );
}
