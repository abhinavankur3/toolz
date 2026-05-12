"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";
import { CopyIconButton } from "@/components/copy-button";

function words(s) {
  return s
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[_\-\s]+/g, " ")
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean);
}
function slugify(s) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CasePage() {
  const [src, setSrc] = useState("The Quick brown fox JUMPS over the lazy dog");

  const out = useMemo(() => {
    const w = words(src);
    return [
      ["lower", src.toLowerCase()],
      ["UPPER", src.toUpperCase()],
      ["Title Case", w.map((x) => x[0].toUpperCase() + x.slice(1)).join(" ")],
      ["Sentence case", src.charAt(0).toUpperCase() + src.slice(1).toLowerCase()],
      ["camelCase", w.map((x, i) => (i ? x[0].toUpperCase() + x.slice(1) : x)).join("")],
      ["PascalCase", w.map((x) => x[0].toUpperCase() + x.slice(1)).join("")],
      ["snake_case", w.join("_")],
      ["kebab-case", w.join("-")],
      ["CONSTANT_CASE", w.join("_").toUpperCase()],
      ["dot.case", w.join(".")],
      ["url-slug", slugify(src)],
    ];
  }, [src]);

  return (
    <>
      <ToolHeader title="Case Converter" desc="Re-cast a string into every common identifier style." />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-h"><h3>Input</h3></div>
        <div className="card-b">
          <textarea className="textarea" style={{ minHeight: 100 }} value={src} onChange={(e) => setSrc(e.target.value)} spellCheck={false} />
        </div>
      </div>
      <div className="card">
        <div className="card-h"><h3>Output</h3></div>
        <div className="card-b col gap-1">
          {out.map(([k, v]) => (
            <div key={k} className="row gap-3" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
              <div style={{ minWidth: 130, fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", fontFamily: "var(--mono)" }}>{k}</div>
              <div className="mono flex1" style={{ fontSize: 13, wordBreak: "break-all" }}>{v}</div>
              <CopyIconButton value={v} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
