"use client";
import { useMemo, useState } from "react";
import cronstrue from "cronstrue";
import { ToolHeader } from "@/components/tool-header";

const PRESETS = [
  ["Every minute", "* * * * *"],
  ["Every 5 min", "*/5 * * * *"],
  ["Hourly", "0 * * * *"],
  ["Daily at 09:00", "0 9 * * *"],
  ["Weekday 09:00", "0 9 * * 1-5"],
  ["Weekly Sun 00:00", "0 0 * * 0"],
  ["Monthly 1st 00:00", "0 0 1 * *"],
];

function parseField(spec, min, max) {
  if (spec === "*") return null;
  const set = new Set();
  spec.split(",").forEach((part) => {
    let step = 1;
    let range = part;
    if (part.includes("/")) {
      const [r, s] = part.split("/");
      range = r;
      step = parseInt(s, 10);
    }
    let start, end;
    if (range === "*") { start = min; end = max; }
    else if (range.includes("-")) {
      const [a, b] = range.split("-").map(Number);
      start = a; end = b;
    } else {
      start = end = parseInt(range, 10);
    }
    for (let i = start; i <= end; i += step) set.add(i);
  });
  return set;
}

function nextRuns(expr, count = 5) {
  const parts = expr.trim().split(/\s+/);
  if (parts.length !== 5) throw new Error("Cron expression must have 5 fields");
  const [mi, hr, dom, mo, dow] = parts;
  const M = parseField(mi, 0, 59);
  const H = parseField(hr, 0, 23);
  const D = parseField(dom, 1, 31);
  const Mo = parseField(mo, 1, 12);
  const W = parseField(dow, 0, 6);
  const match = (d) =>
    (!M || M.has(d.getMinutes())) &&
    (!H || H.has(d.getHours())) &&
    (!D || D.has(d.getDate())) &&
    (!Mo || Mo.has(d.getMonth() + 1)) &&
    (!W || W.has(d.getDay()));
  const out = [];
  let cur = new Date(Date.now() + 60000);
  cur.setSeconds(0, 0);
  const cap = 525600 * 2; // 2 years of minutes
  for (let i = 0; i < cap && out.length < count; i++) {
    if (match(cur)) out.push(new Date(cur));
    cur = new Date(cur.getTime() + 60000);
  }
  return out;
}

export default function CronPage() {
  const [expr, setExpr] = useState("*/15 9-17 * * 1-5");

  const human = useMemo(() => {
    try { return { ok: true, val: cronstrue.toString(expr) }; }
    catch (e) { return { ok: false, err: e.message || "Invalid expression" }; }
  }, [expr]);

  const runs = useMemo(() => {
    try { return { ok: true, val: nextRuns(expr, 5) }; }
    catch (e) { return { ok: false, err: e.message }; }
  }, [expr]);

  return (
    <>
      <ToolHeader title="Cron Expression" desc="Humanize a cron expression and preview its next 5 runs." />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-b col gap-3">
          <input className="input mono" style={{ fontSize: 18, fontWeight: 500 }} value={expr} onChange={(e) => setExpr(e.target.value)} spellCheck={false} />
          <div className="row gap-2" style={{ flexWrap: "wrap" }}>
            <span className="mono" style={{ fontSize: 11, color: "var(--ink-4)", marginRight: 4 }}>PRESETS</span>
            {PRESETS.map(([lbl, e]) => (
              <button key={lbl} type="button" className="pill" onClick={() => setExpr(e)}>{lbl}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Human-readable</h3></div>
          <div className="card-b">
            <div className="mono-out" style={{ fontSize: 15, color: human.ok ? "var(--ink)" : "oklch(55% 0.18 30)" }}>
              {human.ok ? human.val : human.err}
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-h"><h3>Next 5 runs</h3></div>
          <div className="card-b col gap-1">
            {runs.ok ? (
              runs.val.map((d, i) => (
                <div key={i} className="row gap-3" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                  <div className="mono" style={{ minWidth: 24, color: "var(--ink-4)" }}>#{i + 1}</div>
                  <div className="mono flex1" style={{ fontSize: 13 }}>{d.toLocaleString()}</div>
                </div>
              ))
            ) : (
              <div className="mono-out" style={{ color: "oklch(55% 0.18 30)" }}>{runs.err}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
