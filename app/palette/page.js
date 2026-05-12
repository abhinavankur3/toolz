"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";
import { CopyIconButton } from "@/components/copy-button";

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
function luminance([r, g, b]) {
  const c = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a, b) {
  const la = luminance(hex2rgb(a)), lb = luminance(hex2rgb(b));
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}
function rating(r) {
  if (r >= 7) return { lbl: "AAA", c: "oklch(60% 0.18 145)" };
  if (r >= 4.5) return { lbl: "AA", c: "oklch(65% 0.16 145)" };
  if (r >= 3) return { lbl: "AA Large", c: "oklch(70% 0.16 80)" };
  return { lbl: "Fail", c: "oklch(60% 0.18 30)" };
}

export default function PalettePage() {
  const [base, setBase] = useState("#3563E9");
  const [against, setAgainst] = useState("#FFFFFF");

  const palette = useMemo(() => {
    const rgb = hex2rgb(base);
    const tints = [0.9, 0.75, 0.6, 0.45, 0.3, 0.15].map((t) => {
      const [r, g, b] = rgb;
      return rgb2hex([r + (255 - r) * t, g + (255 - g) * t, b + (255 - b) * t]);
    });
    const shades = [0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((t) => {
      const [r, g, b] = rgb;
      return rgb2hex([r * (1 - t), g * (1 - t), b * (1 - t)]);
    });
    return [...tints, base.toUpperCase(), ...shades];
  }, [base]);

  const c = contrast(base, against);
  const r = rating(c);

  return (
    <>
      <ToolHeader title="Palette + Contrast" desc="Generate a tint+shade scale and check WCAG contrast." />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Base color</h3></div>
          <div className="card-b col gap-4">
            <div className="row gap-3">
              <input type="color" value={base} onChange={(e) => setBase(e.target.value.toUpperCase())} style={{ width: 50, height: 36, border: "1px solid var(--line)", borderRadius: 8, padding: 0, cursor: "pointer" }} />
              <input className="input mono flex1" value={base} onChange={(e) => setBase(e.target.value)} />
            </div>
            <div className="swatch-big" style={{ background: base }}></div>
          </div>
        </div>
        <div className="card">
          <div className="card-h"><h3>Contrast</h3><span className="badge mono" style={{ color: r.c }}>{r.lbl}</span></div>
          <div className="card-b col gap-4">
            <div className="row gap-3">
              <input type="color" value={against} onChange={(e) => setAgainst(e.target.value.toUpperCase())} style={{ width: 50, height: 36, border: "1px solid var(--line)", borderRadius: 8, padding: 0, cursor: "pointer" }} />
              <input className="input mono flex1" value={against} onChange={(e) => setAgainst(e.target.value)} />
            </div>
            <div style={{ padding: 20, borderRadius: 10, background: against, color: base, textAlign: "center", fontSize: 20, fontWeight: 500 }}>
              Sample text
            </div>
            <div className="row gap-3" style={{ justifyContent: "space-between" }}>
              <div>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: ".06em" }}>Ratio</div>
                <div className="mono" style={{ fontSize: 28, fontWeight: 500 }}>{c.toFixed(2)}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="mono" style={{ fontSize: 10, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: ".06em" }}>WCAG</div>
                <div className="mono" style={{ fontSize: 18, color: r.c }}>{r.lbl}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-h"><h3>Tints &amp; shades</h3></div>
        <div className="card-b">
          <div className="row gap-2">
            {palette.map((p, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setBase(p)}
                style={{
                  flex: 1,
                  height: 90,
                  background: p,
                  border: i === 6 ? "2px solid var(--ink)" : "1px solid var(--line)",
                  borderRadius: 8,
                  cursor: "pointer",
                  position: "relative",
                }}
              >
                <span
                  className="mono"
                  style={{
                    position: "absolute",
                    bottom: 6,
                    left: 4,
                    right: 4,
                    fontSize: 9,
                    color: luminance(hex2rgb(p)) > 0.5 ? "#000" : "#fff",
                    opacity: 0.85,
                  }}
                >
                  {p}
                </span>
              </button>
            ))}
          </div>
          <div className="row gap-3" style={{ marginTop: 12 }}>
            <div className="mono flex1" style={{ fontSize: 12, color: "var(--ink-3)" }}>Click any swatch to make it the new base.</div>
            <CopyIconButton value={palette.join(", ")} toastMsg="Palette copied" />
          </div>
        </div>
      </div>
    </>
  );
}
