"use client";
import { useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton, CopyIconButton } from "@/components/copy-button";

function rels(s) {
  const abs = Math.abs(s);
  if (abs < 60) return s + "s";
  if (abs < 3600) return Math.round(s / 60) + "m";
  if (abs < 86400) return Math.round(s / 3600) + "h";
  if (abs < 86400 * 30) return Math.round(s / 86400) + "d";
  if (abs < 86400 * 365) return Math.round(s / (86400 * 30)) + "mo";
  return Math.round(s / (86400 * 365)) + "y";
}

export default function TimestampPage() {
  const [ts, setTs] = useState(() => Math.floor(Date.now() / 1000));
  const [iso, setIso] = useState("");
  const [now, setNow] = useState(() => Math.floor(Date.now() / 1000));

  useEffect(() => {
    const t = setInterval(() => setNow(Math.floor(Date.now() / 1000)), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const d = new Date(ts * 1000);
    if (!isNaN(d.getTime())) setIso(d.toISOString());
  }, [ts]);

  const setFromIso = (v) => {
    setIso(v);
    const d = new Date(v);
    if (!isNaN(d.getTime())) setTs(Math.floor(d.getTime() / 1000));
  };

  const d = new Date(ts * 1000);
  const valid = !isNaN(d.getTime());

  return (
    <>
      <ToolHeader
        title="Timestamp Converter"
        desc="Unix epoch ↔ ISO 8601 ↔ human-readable, with live current time."
        actions={
          <button className="btn" type="button" onClick={() => setTs(now)}>
            <Icons.refresh size={14} />Now
          </button>
        }
      />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-b row gap-4" style={{ alignItems: "center" }}>
          <div>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: ".06em" }}>Current epoch</div>
            <div className="mono" style={{ fontSize: 28, fontVariantNumeric: "tabular-nums", fontWeight: 500 }}>{now}</div>
          </div>
          <div style={{ flex: 1 }}></div>
          <div style={{ textAlign: "right" }}>
            <div className="mono" style={{ fontSize: 10, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: ".06em" }}>Δ from input</div>
            <div className="mono" style={{ fontSize: 18, color: valid ? "var(--ink)" : "var(--ink-4)" }}>
              {valid ? (now - ts >= 0 ? rels(now - ts) + " ago" : "in " + rels(ts - now)) : "·"}
            </div>
          </div>
        </div>
      </div>
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Unix Epoch</h3><span className="badge mono">seconds</span></div>
          <div className="card-b col gap-3">
            <input
              className="input mono"
              type="number"
              value={ts}
              onChange={(e) => setTs(+e.target.value)}
              style={{ fontSize: 18, fontWeight: 500 }}
            />
            <div className="row gap-2">
              <button className="btn" type="button" onClick={() => setTs(ts - 3600)}>−1h</button>
              <button className="btn" type="button" onClick={() => setTs(ts - 86400)}>−1d</button>
              <button className="btn" type="button" onClick={() => setTs(ts + 86400)}>+1d</button>
              <button className="btn" type="button" onClick={() => setTs(ts + 3600)}>+1h</button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-h"><h3>ISO 8601</h3><CopyButton small value={iso} toastMsg="ISO copied" /></div>
          <div className="card-b">
            <input className="input mono" value={iso} onChange={(e) => setFromIso(e.target.value)} />
          </div>
        </div>
        <div className="card" style={{ gridColumn: "1 / -1" }}>
          <div className="card-h"><h3>Formats</h3></div>
          <div className="card-b col gap-1">
            {[
              ["UTC", d.toUTCString()],
              ["Local", d.toString().split(" GMT")[0]],
              ["RFC 3339", iso],
              ["Epoch (ms)", String(ts * 1000)],
              ["Relative", valid ? (now - ts >= 0 ? rels(now - ts) + " ago" : "in " + rels(ts - now)) : "·"],
            ].map(([k, v]) => (
              <div key={k} className="row gap-3" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                <div style={{ minWidth: 90, fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", fontFamily: "var(--mono)" }}>{k}</div>
                <div className="mono flex1" style={{ fontSize: 13 }}>{v}</div>
                <CopyIconButton value={v} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
