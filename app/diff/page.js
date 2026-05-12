"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";

function lineDiff(a, b) {
  const al = a.split("\n");
  const bl = b.split("\n");
  const n = al.length, m = bl.length;
  const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = al[i] === bl[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  const out = [];
  let i = 0, j = 0;
  while (i < n && j < m) {
    if (al[i] === bl[j]) { out.push({ t: "=", v: al[i] }); i++; j++; }
    else if (dp[i + 1][j] >= dp[i][j + 1]) { out.push({ t: "-", v: al[i] }); i++; }
    else { out.push({ t: "+", v: bl[j] }); j++; }
  }
  while (i < n) { out.push({ t: "-", v: al[i++] }); }
  while (j < m) { out.push({ t: "+", v: bl[j++] }); }
  return out;
}

export default function DiffPage() {
  const [a, setA] = useState("The quick brown fox\njumps over\nthe lazy dog");
  const [b, setB] = useState("The quick brown fox\nleaps over\nthe lazy cat");

  const diff = useMemo(() => lineDiff(a, b), [a, b]);
  const adds = diff.filter((d) => d.t === "+").length;
  const dels = diff.filter((d) => d.t === "-").length;

  return (
    <>
      <ToolHeader
        title="Diff Viewer"
        desc="Line-by-line comparison between two blocks of text."
        actions={<span className="pill">+{adds} −{dels}</span>}
      />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Original</h3></div>
          <div className="card-b">
            <textarea className="textarea mono" style={{ minHeight: 240 }} value={a} onChange={(e) => setA(e.target.value)} spellCheck={false} />
          </div>
        </div>
        <div className="card">
          <div className="card-h"><h3>Changed</h3></div>
          <div className="card-b">
            <textarea className="textarea mono" style={{ minHeight: 240 }} value={b} onChange={(e) => setB(e.target.value)} spellCheck={false} />
          </div>
        </div>
      </div>
      <div className="card" style={{ marginTop: 16 }}>
        <div className="card-h"><h3>Diff</h3></div>
        <div className="card-b">
          <pre className="mono-out tall" style={{ minHeight: 200, margin: 0, padding: 0, background: "var(--bg-sunk)", border: "1px solid var(--line)", borderRadius: 8 }}>
            {diff.map((d, i) => {
              const bg = d.t === "+" ? "oklch(94% 0.07 145)" : d.t === "-" ? "oklch(94% 0.07 30)" : "transparent";
              const c = d.t === "+" ? "oklch(40% 0.18 145)" : d.t === "-" ? "oklch(40% 0.20 30)" : "var(--ink-2)";
              return (
                <div key={i} style={{ display: "flex", gap: 8, padding: "2px 12px", background: bg, color: c }}>
                  <span style={{ width: 14, opacity: 0.6 }}>{d.t}</span>
                  <span style={{ flex: 1, whiteSpace: "pre-wrap" }}>{d.v || " "}</span>
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </>
  );
}
