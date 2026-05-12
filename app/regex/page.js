"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";

function escapeHtml(s) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

const PRESETS = [
  { label: "Email", p: "[\\w._+-]+@[\\w.-]+\\.[a-z]{2,}", f: "gi" },
  { label: "URL", p: "https?://[\\w./?#&=:%-]+", f: "g" },
  { label: "Hex color", p: "#(?:[0-9a-f]{3}){1,2}\\b", f: "gi" },
  { label: "UUID", p: "[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}", f: "gi" },
  { label: "IPv4", p: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b", f: "g" },
];

export default function RegexPage() {
  const [pattern, setPattern] = useState("(\\w+)@(\\w+\\.\\w+)");
  const [flags, setFlags] = useState("g");
  const [text, setText] = useState(
    "Send mail to hello@toolz.app or support@example.com, we'll reply within 24 hours.\n\nAlt: contact+v2@studio.dev"
  );

  const result = useMemo(() => {
    try {
      const matches = [
        ...text.matchAll(flags.includes("g") ? new RegExp(pattern, flags) : new RegExp(pattern, flags + "g")),
      ];
      let highlighted = "";
      let last = 0;
      matches.forEach((m) => {
        highlighted += escapeHtml(text.slice(last, m.index));
        highlighted += `<mark>${escapeHtml(m[0])}</mark>`;
        last = m.index + m[0].length;
      });
      highlighted += escapeHtml(text.slice(last));
      return { ok: true, matches, highlighted };
    } catch (e) {
      return { ok: false, err: e.message };
    }
  }, [pattern, flags, text]);

  return (
    <>
      <ToolHeader title="Regex Tester" desc="Build, test, and visualize JavaScript regular expressions." />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-b col gap-3">
          <div className="row gap-2">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 0,
                flex: 1,
                background: "var(--bg-sunk)",
                border: "1px solid var(--line)",
                borderRadius: 8,
                padding: "0 12px",
              }}
            >
              <span className="mono" style={{ color: "var(--ink-3)", fontSize: 18 }}>/</span>
              <input
                className="mono"
                style={{ flex: 1, border: 0, background: "transparent", outline: 0, padding: "10px 6px", fontSize: 13 }}
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                spellCheck={false}
              />
              <span className="mono" style={{ color: "var(--ink-3)", fontSize: 18 }}>/</span>
              <input
                className="mono"
                style={{ width: 60, border: 0, background: "transparent", outline: 0, padding: "10px 6px", fontSize: 13, color: "var(--accent)" }}
                value={flags}
                onChange={(e) => setFlags(e.target.value)}
                spellCheck={false}
              />
            </div>
            <span className="badge" style={{ color: result.ok ? "oklch(55% 0.13 145)" : "oklch(55% 0.18 30)" }}>
              {result.ok ? `${result.matches.length} match${result.matches.length !== 1 ? "es" : ""}` : "error"}
            </span>
          </div>
          <div className="row gap-2" style={{ flexWrap: "wrap" }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-4)", marginRight: 4 }}>PRESETS</span>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                className="pill"
                onClick={() => {
                  setPattern(p.p);
                  setFlags(p.f);
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Test string</h3></div>
          <div className="card-b">
            <textarea className="textarea mono" style={{ minHeight: 240 }} value={text} onChange={(e) => setText(e.target.value)} spellCheck={false} />
          </div>
        </div>
        <div className="card">
          <div className="card-h"><h3>Matches</h3></div>
          <div className="card-b">
            {result.ok ? (
              <>
                <div
                  className="regex-out mono-out"
                  style={{ minHeight: 100, marginBottom: 12 }}
                  dangerouslySetInnerHTML={{
                    __html: result.highlighted || '<span style="color:var(--ink-4)">no matches</span>',
                  }}
                />
                <div className="col gap-2">
                  {result.matches.map((m, i) => (
                    <div
                      key={i}
                      className="mono"
                      style={{
                        padding: "8px 12px",
                        background: "var(--bg-sunk)",
                        border: "1px solid var(--line)",
                        borderRadius: 8,
                        fontSize: 12,
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span style={{ color: "var(--ink-4)", minWidth: 24 }}>#{i + 1}</span>
                      <span style={{ color: "var(--accent)" }}>{m[0]}</span>
                      {m.length > 1 && (
                        <span style={{ color: "var(--ink-3)", marginLeft: "auto" }}>
                          {m.slice(1).map((g, j) => (
                            <span key={j} style={{ marginLeft: 8 }}>
                              {`$${j + 1}: `}
                              <span style={{ color: "var(--ink)" }}>{g}</span>
                            </span>
                          ))}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="mono-out" style={{ color: "oklch(55% 0.18 30)" }}>{result.err}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
