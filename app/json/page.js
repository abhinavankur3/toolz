"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton } from "@/components/copy-button";

export default function JsonPage() {
  const [src, setSrc] = useState('{"name":"toolz","tags":["it","utilities"],"count":14,"meta":{"shipped":true,"version":"1.0"}}');
  const [indent, setIndent] = useState(2);

  const result = useMemo(() => {
    try {
      const obj = JSON.parse(src);
      return { ok: true, out: JSON.stringify(obj, null, indent), obj };
    } catch (e) {
      return { ok: false, err: e.message };
    }
  }, [src, indent]);

  const minify = () => { if (result.ok) setSrc(JSON.stringify(result.obj)); };
  const format = () => { if (result.ok) setSrc(result.out); };

  return (
    <>
      <ToolHeader
        title="JSON Formatter"
        desc="Pretty-print, minify, and inspect JSON."
        actions={
          <>
            <button className="btn" type="button" onClick={minify} disabled={!result.ok}>Minify</button>
            <button className="btn primary" type="button" onClick={format} disabled={!result.ok}>Format</button>
          </>
        }
      />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h">
            <h3>Input</h3>
            <span className="badge" style={{ color: result.ok ? "oklch(55% 0.13 145)" : "oklch(55% 0.18 30)" }}>
              {result.ok ? "valid" : "invalid"}
            </span>
          </div>
          <div className="card-b">
            <textarea className="textarea mono" style={{ minHeight: 360 }} value={src} onChange={(e) => setSrc(e.target.value)} spellCheck={false} />
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>Output</h3>
            <div className="row gap-2">
              <select
                className="select"
                style={{ width: 80, height: 28, padding: "4px 24px 4px 8px", fontSize: 12 }}
                value={indent}
                onChange={(e) => setIndent(+e.target.value)}
              >
                <option value="2">2 sp</option>
                <option value="4">4 sp</option>
                <option value="0">tab</option>
              </select>
              <CopyButton small value={result.ok ? result.out : ""} toastMsg="JSON copied" />
            </div>
          </div>
          <div className="card-b">
            {result.ok ? (
              <pre className="mono-out tall" style={{ minHeight: 360, margin: 0 }}>{result.out}</pre>
            ) : (
              <div className="mono-out tall" style={{ minHeight: 360, color: "oklch(55% 0.18 30)" }}>{result.err}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
