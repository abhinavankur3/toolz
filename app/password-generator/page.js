"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icons } from "@/components/icons";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton } from "@/components/copy-button";

export default function PasswordPage() {
  const [len, setLen] = useState(20);
  const [lower, setLower] = useState(true);
  const [upper, setUpper] = useState(true);
  const [nums, setNums] = useState(true);
  const [syms, setSyms] = useState(true);
  const [pw, setPw] = useState("");

  const gen = useCallback(() => {
    const pools = [];
    if (lower) pools.push("abcdefghijkmnpqrstuvwxyz");
    if (upper) pools.push("ABCDEFGHJKLMNPQRSTUVWXYZ");
    if (nums) pools.push("23456789");
    if (syms) pools.push("!@#$%^&*-_=+?");
    if (!pools.length) { setPw(""); return; }
    const all = pools.join("");
    const arr = new Uint32Array(len);
    crypto.getRandomValues(arr);
    let out = "";
    pools.forEach((p, i) => { out += p[arr[i] % p.length]; });
    for (let i = pools.length; i < len; i++) out += all[arr[i] % all.length];
    out = out.split("").sort(() => Math.random() - 0.5).join("");
    setPw(out);
  }, [len, lower, upper, nums, syms]);

  useEffect(() => { gen(); }, [gen]);

  const score = useMemo(() => {
    const variety = (lower ? 26 : 0) + (upper ? 26 : 0) + (nums ? 10 : 0) + (syms ? 13 : 0);
    if (!variety || !pw) return { lbl: "none", pct: 0, c: "var(--ink-4)" };
    const bits = Math.log2(variety) * len;
    if (bits < 40) return { lbl: "weak", pct: 25, c: "oklch(60% 0.18 30)" };
    if (bits < 70) return { lbl: "ok", pct: 50, c: "oklch(70% 0.16 80)" };
    if (bits < 110) return { lbl: "strong", pct: 80, c: "oklch(65% 0.16 145)" };
    return { lbl: "very strong", pct: 100, c: "oklch(60% 0.18 145)" };
  }, [len, lower, upper, nums, syms, pw]);

  return (
    <>
      <ToolHeader
        title="Password Generator"
        desc="Cryptographically strong passwords, generated locally in your browser."
        actions={
          <button className="btn primary" type="button" onClick={gen}>
            <Icons.refresh size={14} />Regenerate
          </button>
        }
      />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-b col gap-4">
          <div className="mono-out" style={{ fontSize: 18, padding: "16px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
            <span style={{ flex: 1, wordBreak: "break-all" }}>{pw || "·"}</span>
            <CopyButton small value={pw} toastMsg="Password copied" />
          </div>
          <div className="row gap-3">
            <div style={{ flex: 1, height: 4, background: "var(--bg-active)", borderRadius: 999, overflow: "hidden" }}>
              <div style={{ width: score.pct + "%", height: "100%", background: score.c, transition: "width .2s, background .2s" }} />
            </div>
            <span className="mono" style={{ fontSize: 11, color: score.c, minWidth: 90, textAlign: "right", textTransform: "uppercase", letterSpacing: ".06em" }}>{score.lbl}</span>
          </div>
        </div>
      </div>
      <div className="card">
        <div className="card-h"><h3>Options</h3></div>
        <div className="card-b col gap-4">
          <div className="field">
            <label>Length <span className="muted mono" style={{ float: "right" }}>{len}</span></label>
            <input type="range" className="range" min="6" max="64" value={len} onChange={(e) => setLen(+e.target.value)} />
          </div>
          <div className="row gap-4" style={{ flexWrap: "wrap" }}>
            <label className="check"><input type="checkbox" checked={lower} onChange={(e) => setLower(e.target.checked)} />Lowercase</label>
            <label className="check"><input type="checkbox" checked={upper} onChange={(e) => setUpper(e.target.checked)} />Uppercase</label>
            <label className="check"><input type="checkbox" checked={nums} onChange={(e) => setNums(e.target.checked)} />Numbers</label>
            <label className="check"><input type="checkbox" checked={syms} onChange={(e) => setSyms(e.target.checked)} />Symbols</label>
          </div>
        </div>
      </div>
    </>
  );
}
