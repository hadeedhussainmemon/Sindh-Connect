import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export const alt = "Sindh Connect - Heritage, Culture, Icons & Positive Stories";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#070204",
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(119, 11, 27, 0.45) 0%, transparent 50%), radial-gradient(circle at 90% 80%, rgba(25, 59, 112, 0.5) 0%, transparent 60%)",
          padding: "60px 70px",
          fontFamily: "sans-serif",
          position: "relative",
          border: "12px solid #770b1b",
          boxSizing: "border-box",
        }}
      >
        {/* Decorative Ajrak Pattern Border Ring */}
        <div
          style={{
            position: "absolute",
            top: "14px",
            left: "14px",
            right: "14px",
            bottom: "14px",
            border: "2px dashed #cfa83b",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />

        {/* Top Header Row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Medallion Badge */}
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "#770b1b",
                border: "2px solid #cfa83b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#cfa83b",
                fontSize: "28px",
                fontWeight: "900",
                boxShadow: "0 0 20px rgba(207, 168, 59, 0.4)",
              }}
            >
              S
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "24px", fontWeight: "900", color: "#FFFFFF", letterSpacing: "2px" }}>
                SINDH<span style={{ color: "#cfa83b" }}>CONNECT</span>
              </span>
              <span style={{ fontSize: "13px", color: "#f5d475", letterSpacing: "3px", textTransform: "uppercase" }}>
                سنڌ ڪنيڪٽ &bull; Cultural Archive
              </span>
            </div>
          </div>

          <div
            style={{
              padding: "8px 18px",
              borderRadius: "999px",
              backgroundColor: "rgba(119, 11, 27, 0.5)",
              border: "1px solid rgba(207, 168, 59, 0.6)",
              color: "#f5d475",
              fontSize: "13px",
              fontWeight: "700",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            5,000+ Years of Indus Heritage
          </div>
        </div>

        {/* Center Editorial Headlines */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "980px" }}>
          <div
            style={{
              fontSize: "58px",
              fontWeight: "900",
              color: "#FFFFFF",
              lineHeight: 1.1,
              letterSpacing: "-1px",
              textShadow: "0 4px 20px rgba(0,0,0,0.8)",
            }}
          >
            Celebrating Sindh’s{" "}
            <span
              style={{
                color: "#cfa83b",
                backgroundImage: "linear-gradient(90deg, #f5d475, #cfa83b)",
              }}
            >
              Heritage, Leaders & Creators
            </span>
          </div>

          <div style={{ fontSize: "22px", color: "#d6cfc7", fontWeight: "300", lineHeight: 1.4, maxWidth: "860px" }}>
            The premier digital archive documenting the ancient Indus Civilization, Sufi wisdom of Shah Latif, 
            visionary statesmen, and modern cultural voices across the Mehran.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid rgba(207, 168, 59, 0.3)", paddingTop: "24px" }}>
          <div style={{ display: "flex", gap: "28px" }}>
            <span style={{ color: "#f5d475", fontSize: "15px", fontWeight: "700" }}>
              🏛️ Mohenjo-daro & World Heritage
            </span>
            <span style={{ color: "#FFFFFF", fontSize: "15px", opacity: 0.4 }}>&bull;</span>
            <span style={{ color: "#f5d475", fontSize: "15px", fontWeight: "700" }}>
              📜 Shah Jo Risalo & Sufi Wisdom
            </span>
            <span style={{ color: "#FFFFFF", fontSize: "15px", opacity: 0.4 }}>&bull;</span>
            <span style={{ color: "#f5d475", fontSize: "15px", fontWeight: "700" }}>
              ⭐ Top 20 All-Time Luminaries
            </span>
          </div>

          <div style={{ color: "#cfa83b", fontSize: "16px", fontWeight: "800", letterSpacing: "1px" }}>
            sindhconnect.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
