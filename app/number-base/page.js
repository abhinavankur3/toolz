"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";
import { CopyIconButton } from "@/components/copy-button";

const BASES = [
  { name: "Binary", base: 2 },
  { name: "Octal", base: 8 },
  { name: "Decimal", base: 10 },
  { name: "Hex", base: 16 },
];

export default function NumberBasePage() {
  const [value, setValue] = useState("255");
  const [fromBase, setFromBase] = useState(10);

  const parsed = useMemo(() => {
    const v = value.trim().replace(/^0[bxo]/i, "");
    if (!v) return null;
    const n = parseInt(v, fromBase);
    return isNaN(n) ? null : n;
  }, [value, fromBase]);

  return (
    <>
      <ToolHeader title="Number Base Converter" desc="Convert between binary, octal, decimal, and hexadecimal." />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-h"><h3>Input</h3></div>
        <div className="card-b col gap-4">
          <div className="row gap-3" style={{ flexWrap: "wrap" }}>
            <div className="field" style={{ flex: 2, minWidth: 200 }}>
              <label>Value</label>
              <input className="input mono" value={value} onChange={(e) => setValue(e.target.value)} style={{ fontSize: 18, fontWeight: 500 }} />
            </div>
            <div className="field" style={{ flex: 1, minWidth: 140 }}>
              <label>From base</label>
              <select className="select" value={fromBase} onChange={(e) => setFromBase(+e.target.value)}>
                {BASES.map((b) => <option key={b.base} value={b.base}>{b.name} ({b.base})</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-h">
          <h3>All bases</h3>
          {parsed != null && <span className="badge mono">{parsed.toLocaleString()}</span>}
        </div>
        <div className="card-b col gap-1">
          {parsed == null ? (
            <div className="mono-out" style={{ color: "oklch(55% 0.18 30)" }}>Invalid number for base {fromBase}</div>
          ) : (
            BASES.map((b) => {
              const v = parsed.toString(b.base);
              return (
                <div key={b.base} className="row gap-3" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                  <div style={{ minWidth: 100, fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", fontFamily: "var(--mono)" }}>
                    {b.name} ({b.base})
                  </div>
                  <div className="mono flex1" style={{ fontSize: 14, wordBreak: "break-all" }}>{v}</div>
                  <CopyIconButton value={v} />
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}
