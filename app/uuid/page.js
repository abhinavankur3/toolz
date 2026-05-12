"use client";
import { useCallback, useEffect, useState } from "react";
import { Icons } from "@/components/icons";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton, CopyIconButton } from "@/components/copy-button";
import { useShell } from "@/components/shell-context";

function fallbackUuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export default function UuidPage() {
  const { toast } = useShell();
  const [count, setCount] = useState(5);
  const [version, setVersion] = useState("v4");
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [ids, setIds] = useState([]);

  const gen = useCallback(() => {
    const out = [];
    for (let i = 0; i < count; i++) {
      let s = (typeof crypto !== "undefined" && crypto.randomUUID) ? crypto.randomUUID() : fallbackUuid();
      if (version === "nil") s = "00000000-0000-0000-0000-000000000000";
      if (!hyphens) s = s.replace(/-/g, "");
      if (uppercase) s = s.toUpperCase();
      out.push(s);
    }
    setIds(out);
  }, [count, version, uppercase, hyphens]);

  useEffect(() => { gen(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ToolHeader
        title="UUID Generator"
        desc="RFC 4122 universally unique identifiers, freshly minted."
        actions={
          <button className="btn primary" type="button" onClick={gen}>
            <Icons.refresh size={14} />Generate
          </button>
        }
      />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Options</h3><span className="badge">{version}</span></div>
          <div className="card-b col gap-4">
            <div className="field">
              <label>Count <span className="muted mono" style={{ float: "right" }}>{count}</span></label>
              <input type="range" className="range" min="1" max="50" value={count} onChange={(e) => setCount(+e.target.value)} />
            </div>
            <div className="field">
              <label>Version</label>
              <select className="select" value={version} onChange={(e) => setVersion(e.target.value)}>
                <option value="v4">v4 (random)</option>
                <option value="nil">nil (all zeros)</option>
              </select>
            </div>
            <div className="col gap-2">
              <label className="check"><input type="checkbox" checked={uppercase} onChange={(e) => setUppercase(e.target.checked)} />Uppercase</label>
              <label className="check"><input type="checkbox" checked={hyphens} onChange={(e) => setHyphens(e.target.checked)} />Hyphens</label>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>Output</h3>
            <CopyButton small value={ids.join("\n")} label={`Copy all (${ids.length})`} toastMsg={`Copied ${ids.length} UUIDs`} />
          </div>
          <div className="card-b">
            <div className="mono-out tall" style={{ padding: "10px 14px" }}>
              {ids.map((id, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "2px 0" }}>
                  <span style={{ color: "var(--ink-4)", fontSize: 11, minWidth: 24 }}>{(i + 1).toString().padStart(2, "0")}</span>
                  <span style={{ flex: 1 }}>{id}</span>
                  <CopyIconButton value={id} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
