"use client";
import { useEffect, useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";

function parseUA(ua) {
  if (!ua) return null;
  const tests = [
    { key: "browser", patterns: [
      [/Edg\/([\d.]+)/, "Edge"],
      [/OPR\/([\d.]+)/, "Opera"],
      [/Firefox\/([\d.]+)/, "Firefox"],
      [/Chrome\/([\d.]+)/, "Chrome"],
      [/Version\/([\d.]+).*Safari/, "Safari"],
      [/MSIE ([\d.]+)/, "Internet Explorer"],
    ]},
    { key: "engine", patterns: [
      [/Gecko\/(\d+)/, "Gecko"],
      [/AppleWebKit\/([\d.]+)/, "WebKit"],
      [/Trident\/([\d.]+)/, "Trident"],
      [/Blink/, "Blink"],
    ]},
    { key: "os", patterns: [
      [/Windows NT ([\d.]+)/, "Windows"],
      [/Mac OS X ([\d_.]+)/, "macOS"],
      [/Android ([\d.]+)/, "Android"],
      [/iPhone OS ([\d_]+)/, "iOS"],
      [/CPU OS ([\d_]+) like Mac OS/, "iPadOS"],
      [/Linux/, "Linux"],
    ]},
    { key: "device", patterns: [
      [/iPhone/, "iPhone"],
      [/iPad/, "iPad"],
      [/Android.*Mobile/, "Android phone"],
      [/Android/, "Android tablet"],
      [/Mobile/, "Mobile"],
    ]},
  ];
  const out = {};
  tests.forEach(({ key, patterns }) => {
    for (const [re, name] of patterns) {
      const m = ua.match(re);
      if (m) {
        out[key] = m[1] ? `${name} ${m[1].replace(/_/g, ".")}` : name;
        break;
      }
    }
  });
  if (/(bot|crawler|spider|preview)/i.test(ua)) out.bot = "Yes";
  return out;
}

export default function UserAgentPage() {
  const [ua, setUa] = useState("");

  useEffect(() => {
    if (typeof navigator !== "undefined") setUa(navigator.userAgent);
  }, []);

  const parsed = useMemo(() => parseUA(ua), [ua]);

  const rows = parsed
    ? [
        ["Browser", parsed.browser || "Unknown"],
        ["Engine", parsed.engine || "Unknown"],
        ["OS", parsed.os || "Unknown"],
        ["Device", parsed.device || "Desktop"],
        ["Bot", parsed.bot || "No"],
      ]
    : [];

  return (
    <>
      <ToolHeader title="User-Agent Parser" desc="Inspect a UA string: browser, engine, OS, device." />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-h"><h3>UA string</h3></div>
        <div className="card-b">
          <textarea className="textarea mono" style={{ minHeight: 100, fontSize: 12 }} value={ua} onChange={(e) => setUa(e.target.value)} spellCheck={false} />
        </div>
      </div>
      <div className="card">
        <div className="card-h"><h3>Parsed</h3></div>
        <div className="card-b col gap-1">
          {rows.map(([k, v]) => (
            <div key={k} className="row gap-3" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
              <div style={{ minWidth: 90, fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", fontFamily: "var(--mono)" }}>{k}</div>
              <div className="flex1" style={{ fontSize: 14 }}>{v}</div>
            </div>
          ))}
          {!rows.length && <div className="muted" style={{ fontSize: 13 }}>Paste a user-agent string to inspect it.</div>}
        </div>
      </div>
    </>
  );
}
