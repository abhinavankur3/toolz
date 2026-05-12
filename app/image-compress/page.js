"use client";
import { useRef, useState } from "react";
import { Icons } from "@/components/icons";
import { ToolHeader } from "@/components/tool-header";
import { useShell } from "@/components/shell-context";

function formatBytes(n) {
  if (n < 1024) return n + " B";
  if (n < 1024 * 1024) return (n / 1024).toFixed(1) + " KB";
  return (n / 1024 / 1024).toFixed(2) + " MB";
}

export default function ImageCompressPage() {
  const { toast } = useShell();
  const [src, setSrc] = useState(null); // { file, dataUrl, w, h }
  const [out, setOut] = useState(null); // { blob, url, w, h, size }
  const [maxW, setMaxW] = useState(1600);
  const [quality, setQuality] = useState(0.82);
  const [format, setFormat] = useState("image/jpeg");
  const inRef = useRef(null);

  const load = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => setSrc({ file, dataUrl: reader.result, w: img.width, h: img.height });
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const compress = () => {
    if (!src) return;
    const img = new Image();
    img.onload = () => {
      const ratio = Math.min(1, maxW / img.width);
      const w = Math.round(img.width * ratio);
      const h = Math.round(img.height * ratio);
      const canvas = document.createElement("canvas");
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, w, h);
      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          setOut({ blob, url, w, h, size: blob.size });
        },
        format,
        quality
      );
    };
    img.src = src.dataUrl;
  };

  const download = () => {
    if (!out) return;
    const a = document.createElement("a");
    a.href = out.url;
    const ext = format.split("/")[1].replace("jpeg", "jpg");
    a.download = "compressed." + ext;
    a.click();
    toast("Downloaded");
  };

  return (
    <>
      <ToolHeader title="Image Compressor" desc="Resize, recompress, and convert images locally in your browser." />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-h"><h3>Source</h3>{src && <span className="badge mono">{src.w}×{src.h} · {formatBytes(src.file.size)}</span>}</div>
        <div className="card-b">
          <input
            ref={inRef}
            type="file"
            accept="image/*"
            onChange={(e) => load(e.target.files?.[0])}
            style={{ display: "none" }}
          />
          {src ? (
            <div className="row gap-3">
              <img src={src.dataUrl} alt="" style={{ maxWidth: 220, maxHeight: 160, borderRadius: 8, border: "1px solid var(--line)" }} />
              <div className="col gap-2 flex1">
                <div style={{ fontSize: 13, fontWeight: 500 }}>{src.file.name}</div>
                <div className="muted" style={{ fontSize: 12 }}>{src.file.type || "image"}</div>
                <button className="btn" type="button" onClick={() => inRef.current?.click()}>Choose another</button>
              </div>
            </div>
          ) : (
            <button
              className="btn primary"
              type="button"
              onClick={() => inRef.current?.click()}
              style={{ width: "100%", height: 120, fontSize: 14 }}
            >
              <Icons.image size={16} /> Choose image
            </button>
          )}
        </div>
      </div>
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Options</h3></div>
          <div className="card-b col gap-4">
            <div className="field">
              <label>Max width <span className="muted mono" style={{ float: "right" }}>{maxW}px</span></label>
              <input type="range" className="range" min="200" max="4000" step="20" value={maxW} onChange={(e) => setMaxW(+e.target.value)} />
            </div>
            <div className="field">
              <label>Quality <span className="muted mono" style={{ float: "right" }}>{Math.round(quality * 100)}%</span></label>
              <input type="range" className="range" min="0.1" max="1" step="0.01" value={quality} onChange={(e) => setQuality(+e.target.value)} />
            </div>
            <div className="field">
              <label>Format</label>
              <select className="select" value={format} onChange={(e) => setFormat(e.target.value)}>
                <option value="image/jpeg">JPEG</option>
                <option value="image/png">PNG</option>
                <option value="image/webp">WebP</option>
              </select>
            </div>
            <button className="btn primary" type="button" onClick={compress} disabled={!src}>
              <Icons.refresh size={14} />Compress
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>Output</h3>
            {out && <button className="btn" type="button" onClick={download}><Icons.download size={14} />Save</button>}
          </div>
          <div className="card-b">
            {out ? (
              <div className="col gap-3">
                <img src={out.url} alt="" style={{ maxWidth: "100%", borderRadius: 8, border: "1px solid var(--line)" }} />
                <div className="row gap-3">
                  <div>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: ".06em" }}>Size</div>
                    <div className="mono" style={{ fontSize: 18 }}>{out.w}×{out.h}</div>
                  </div>
                  <div style={{ flex: 1 }}></div>
                  <div style={{ textAlign: "right" }}>
                    <div className="mono" style={{ fontSize: 10, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: ".06em" }}>Bytes</div>
                    <div className="mono" style={{ fontSize: 18 }}>
                      {formatBytes(out.size)}
                      {src && (
                        <span style={{ marginLeft: 8, color: "oklch(60% 0.16 145)", fontSize: 13 }}>
                          (−{Math.round((1 - out.size / src.file.size) * 100)}%)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="empty">Choose an image and tap Compress.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
