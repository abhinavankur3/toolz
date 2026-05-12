"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";

function parseCookieHeader(s) {
  return s
    .split(/;\s*/)
    .filter(Boolean)
    .map((p) => {
      const eq = p.indexOf("=");
      return eq === -1 ? { name: p, value: "" } : { name: p.slice(0, eq), value: p.slice(eq + 1) };
    });
}

function parseSetCookie(s) {
  const parts = s.split(/;\s*/);
  const [first, ...attrs] = parts;
  const eq = first.indexOf("=");
  const name = eq === -1 ? first : first.slice(0, eq);
  const value = eq === -1 ? "" : first.slice(eq + 1);
  const meta = {};
  attrs.forEach((a) => {
    const e = a.indexOf("=");
    const k = (e === -1 ? a : a.slice(0, e)).trim();
    const v = e === -1 ? true : a.slice(e + 1).trim();
    meta[k.toLowerCase()] = v;
  });
  return { name, value, meta };
}

export default function CookiePage() {
  const [mode, setMode] = useState("cookie");
  const [input, setInput] = useState(
    "session=abc123; user_id=42; theme=dark"
  );
  const [setInput2, setSetInput2] = useState("session=abc123; Path=/; HttpOnly; Secure; Max-Age=3600; SameSite=Strict");

  const cookies = useMemo(() => parseCookieHeader(input), [input]);
  const setCookie = useMemo(() => parseSetCookie(setInput2), [setInput2]);

  return (
    <>
      <ToolHeader title="Cookie Parser" desc="Parse Cookie and Set-Cookie HTTP headers." />
      <div className="row gap-2" style={{ marginBottom: 16 }}>
        <button type="button" className={"pill" + (mode === "cookie" ? " accent" : "")} onClick={() => setMode("cookie")}>Cookie</button>
        <button type="button" className={"pill" + (mode === "set" ? " accent" : "")} onClick={() => setMode("set")}>Set-Cookie</button>
      </div>
      {mode === "cookie" ? (
        <>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-h"><h3>Cookie header</h3></div>
            <div className="card-b">
              <textarea className="textarea mono" style={{ minHeight: 100 }} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
            </div>
          </div>
          <div className="card">
            <div className="card-h"><h3>Parsed</h3><span className="badge mono">{cookies.length} cookies</span></div>
            <div className="card-b col gap-1">
              {cookies.map((c, i) => (
                <div key={i} className="row gap-3" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                  <div className="mono" style={{ minWidth: 140, color: "var(--accent)", fontSize: 12, fontWeight: 500 }}>{c.name}</div>
                  <div className="mono flex1" style={{ fontSize: 13, wordBreak: "break-all" }}>{c.value}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="card-h"><h3>Set-Cookie header</h3></div>
            <div className="card-b">
              <textarea className="textarea mono" style={{ minHeight: 100 }} value={setInput2} onChange={(e) => setSetInput2(e.target.value)} spellCheck={false} />
            </div>
          </div>
          <div className="card">
            <div className="card-h"><h3>{setCookie.name}</h3><span className="badge mono">{Object.keys(setCookie.meta).length} attrs</span></div>
            <div className="card-b col gap-1">
              <div className="row gap-3" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                <div className="mono" style={{ minWidth: 110, color: "var(--ink-3)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em" }}>Value</div>
                <div className="mono flex1" style={{ fontSize: 13, wordBreak: "break-all" }}>{setCookie.value}</div>
              </div>
              {Object.entries(setCookie.meta).map(([k, v]) => (
                <div key={k} className="row gap-3" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                  <div className="mono" style={{ minWidth: 110, color: "var(--ink-3)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em" }}>{k}</div>
                  <div className="mono flex1" style={{ fontSize: 13 }}>{v === true ? "✓ (flag)" : String(v)}</div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
