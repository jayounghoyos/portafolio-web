import { ImageResponse } from "next/og";

export const alt = "Juan Andrés Young Hoyos — ML & Robotics Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Machine-log OG card: dark console, signal chartreuse, mono telemetry. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0D0C08",
          color: "#EFE7D7",
          padding: "56px 64px",
          fontFamily: "monospace",
          backgroundImage:
            "linear-gradient(to right, rgba(239,231,215,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(239,231,215,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.2em",
            color: "#837B6A",
          }}
        >
          <span>◆ SENSOR_01 · CHASSIS POV · FEED LIVE</span>
          <span>06°14′N 75°34′W</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, lineHeight: 1.02, display: "flex", flexDirection: "column" }}>
            <span>Juan Andrés</span>
            <span style={{ display: "flex" }}>
              Young Hoyos<span style={{ color: "#C8D958" }}>.</span>
            </span>
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#B0A793" }}>
            ML &amp; Robotics Engineer — building machines that learn.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.2em",
            color: "#837B6A",
            borderTop: "1px solid #2B2820",
            paddingTop: 24,
          }}
        >
          <span style={{ color: "#C8D958" }}>▸ jayoungh.dev</span>
          <span>LOG 00–08 · MEDELLÍN — CO</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
