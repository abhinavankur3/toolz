"use client";
import { useEffect, useRef, useState } from "react";
import qrcode from "qrcode-generator";
import { Icons } from "@/components/icons";
import { ToolHeader } from "@/components/tool-header";
import { useShell } from "@/components/shell-context";

export default function QrPage() {
  const { toast } = useShell();
  const [text, setText] = useState("https://toolz.local");
  const [size, setSize] = useState(280);
  const [ec, setEc] = useState("M");
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.innerHTML = "";
    try {
      const qr = qrcode(0, ec);
      qr.addData(text || " ");
      qr.make();
      const cells = qr.getModuleCount();
      const cs = Math.floor(size / (cells + 4));
      const px = cs * (cells + 4);
      const c = document.createElement("canvas");
      c.width = c.height = px;
      const ctx = c.getContext("2d");
      const bg = getComputedStyle(document.body).getPropertyValue("--bg-card").trim();
      const fg = getComputedStyle(document.body).getPropertyValue("--ink").trim();
      ctx.fillStyle = bg || "#fff";
      ctx.fillRect(0, 0, px, px);
      ctx.fillStyle = fg || "#000";
      for (let r = 0; r < cells; r++) {
        for (let c2 = 0; c2 < cells; c2++) {
          if (qr.isDark(r, c2)) ctx.fillRect((c2 + 2) * cs, (r + 2) * cs, cs, cs);
        }
      }
      ref.current.appendChild(c);
    } catch (e) {
      ref.current.innerHTML =
        '<div style="color:var(--ink-3);padding:40px;text-align:center">Too much data to encode</div>';
    }
  }, [text, size, ec]);

  const download = () => {
    const canvas = ref.current?.querySelector("canvas");
    if (!canvas) return;
    const a = document.createElement("a");
    a.download = "qr.png";
    a.href = canvas.toDataURL();
    a.click();
    toast("QR downloaded");
  };

  return (
    <>
      <ToolHeader title="QR Code Generator" desc="Encode any text or URL into a scannable QR code." />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Content</h3></div>
          <div className="card-b col gap-4">
            <div className="field">
              <label>Text or URL</label>
              <textarea
                className="textarea"
                style={{ minHeight: 140 }}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
            <div className="row gap-3" style={{ flexWrap: "wrap" }}>
              <div className="field" style={{ flex: 1, minWidth: 140 }}>
                <label>Error correction</label>
                <select className="select" value={ec} onChange={(e) => setEc(e.target.value)}>
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </div>
              <div className="field" style={{ flex: 1, minWidth: 140 }}>
                <label>Size <span className="muted mono" style={{ float: "right" }}>{size}px</span></label>
                <input
                  type="range"
                  className="range"
                  min="120"
                  max="420"
                  step="20"
                  value={size}
                  onChange={(e) => setSize(+e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>Preview</h3>
            <button className="btn" type="button" onClick={download}>
              <Icons.download size={14} />PNG
            </button>
          </div>
          <div
            className="card-b"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 32 }}
          >
            <div ref={ref} />
          </div>
        </div>
      </div>
    </>
  );
}
