"use client";
import { useMemo, useState } from "react";
import { Icons } from "@/components/icons";
import { ToolHeader } from "@/components/tool-header";
import { useShell } from "@/components/shell-context";

function hex2rgb(hex) {
  const h = hex.replace("#", "");
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, "0").slice(0, 6);
  const n = parseInt(x, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
function rgb2hex([r, g, b]) {
  return (
    "#" +
    [r, g, b]
      .map((x) => Math.max(0, Math.min(255, Math.round(x))).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}
function rgb2hsl([r, g, b]) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export default function ColorPage() {
  const { toast } = useShell();
  const [hex, setHex] = useState("#3563E9");
  const rgb = useMemo(() => hex2rgb(hex), [hex]);
  const hsl = useMemo(() => rgb2hsl(rgb), [rgb]);
  const oklch = `oklch(from ${hex} l c h)`;

  const tints = [0.9, 0.7, 0.5, 0.3, 0.1].map((t) => {
    const [r, g, b] = rgb;
    return rgb2hex([r + (255 - r) * t, g + (255 - g) * t, b + (255 - b) * t]);
  });
  const shades = [0.1, 0.3, 0.5, 0.7, 0.9].map((t) => {
    const [r, g, b] = rgb;
    return rgb2hex([r * (1 - t), g * (1 - t), b * (1 - t)]);
  });

  const copy = (val, label) => {
    navigator.clipboard?.writeText(val);
    toast((label || "Value") + " copied");
  };

  const row = (label, val) => (
    <div className="row gap-3" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
      <div style={{ minWidth: 50, fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", fontFamily: "var(--mono)" }}>{label}</div>
      <div className="mono flex1" style={{ fontSize: 13 }}>{val}</div>
      <button className="icon-btn" type="button" onClick={() => copy(val, label)}>
        <Icons.copy size={13} />
      </button>
    </div>
  );

  return (
    <>
      <ToolHeader title="Color Converter" desc="Convert between HEX, RGB, HSL, OKLCH and inspect tints + shades." />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Pick</h3></div>
          <div className="card-b col gap-4">
            <div className="swatch-big" style={{ background: hex }}></div>
            <div className="row gap-3">
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value.toUpperCase())}
                style={{ width: 50, height: 36, border: "1px solid var(--line)", borderRadius: 8, background: "transparent", padding: 0, cursor: "pointer" }}
              />
              <input className="input mono flex1" value={hex} onChange={(e) => setHex(e.target.value)} />
            </div>
            <div className="col gap-1">
              {row("HEX", hex.toUpperCase())}
              {row("RGB", `rgb(${rgb.join(", ")})`)}
              {row("HSL", `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`)}
              {row("OKLCH", oklch)}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-h"><h3>Tints &amp; Shades</h3></div>
          <div className="card-b col gap-4">
            <div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontFamily: "var(--mono)" }}>Tints (lighter)</div>
              <div className="row gap-2">
                {tints.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { setHex(c); copy(c, c); }}
                    style={{ flex: 1, height: 70, background: c, border: "1px solid var(--line)", borderRadius: 8, cursor: "pointer", position: "relative" }}
                  >
                    <span className="mono" style={{ position: "absolute", bottom: 6, left: 0, right: 0, fontSize: 10, color: "var(--ink)", background: "var(--bg-card)", padding: "1px 4px", margin: "0 6px", borderRadius: 3, opacity: 0.85 }}>{c}</span>
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "var(--ink-3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: ".06em", fontFamily: "var(--mono)" }}>Shades (darker)</div>
              <div className="row gap-2">
                {shades.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => { setHex(c); copy(c, c); }}
                    style={{ flex: 1, height: 70, background: c, border: "1px solid var(--line)", borderRadius: 8, cursor: "pointer", position: "relative" }}
                  >
                    <span className="mono" style={{ position: "absolute", bottom: 6, left: 0, right: 0, fontSize: 10, color: "var(--bg-card)", background: "var(--ink)", padding: "1px 4px", margin: "0 6px", borderRadius: 3, opacity: 0.9 }}>{c}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="divider"></div>
            <div className="row gap-3">
              <div style={{ flex: 1, padding: 12, border: "1px solid var(--line)", borderRadius: 8, background: "var(--bg-card)" }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>On white</div>
                <div style={{ padding: 10, background: "#fff", borderRadius: 6, color: hex, fontWeight: 500, fontSize: 14 }}>Sample text</div>
              </div>
              <div style={{ flex: 1, padding: 12, border: "1px solid var(--line)", borderRadius: 8, background: "var(--bg-card)" }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 6 }}>On black</div>
                <div style={{ padding: 10, background: "#000", borderRadius: 6, color: hex, fontWeight: 500, fontSize: 14 }}>Sample text</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
