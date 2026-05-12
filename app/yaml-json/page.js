"use client";
import { useMemo, useState } from "react";
import yaml from "js-yaml";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton } from "@/components/copy-button";

export default function YamlJsonPage() {
  const [mode, setMode] = useState("yaml2json");
  const [input, setInput] = useState("name: toolz\ntags:\n  - it\n  - utilities\ncount: 14\nmeta:\n  shipped: true\n  version: '1.0'");

  const result = useMemo(() => {
    try {
      if (mode === "yaml2json") {
        const obj = yaml.load(input);
        return { ok: true, val: JSON.stringify(obj, null, 2) };
      }
      const obj = JSON.parse(input);
      return { ok: true, val: yaml.dump(obj, { lineWidth: 100 }) };
    } catch (e) {
      return { ok: false, err: e.message };
    }
  }, [mode, input]);

  return (
    <>
      <ToolHeader title="YAML ↔ JSON" desc="Round-trip YAML and JSON safely." />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h">
            <h3>{mode === "yaml2json" ? "YAML" : "JSON"}</h3>
            <div className="row gap-2">
              <button type="button" className={"pill" + (mode === "yaml2json" ? " accent" : "")} onClick={() => setMode("yaml2json")}>YAML → JSON</button>
              <button type="button" className={"pill" + (mode === "json2yaml" ? " accent" : "")} onClick={() => setMode("json2yaml")}>JSON → YAML</button>
            </div>
          </div>
          <div className="card-b">
            <textarea className="textarea mono" style={{ minHeight: 280 }} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>{mode === "yaml2json" ? "JSON" : "YAML"}</h3>
            <CopyButton small value={result.ok ? result.val : ""} toastMsg="Copied" />
          </div>
          <div className="card-b">
            <div className="mono-out tall" style={{ minHeight: 280, color: result.ok ? "var(--ink)" : "oklch(55% 0.18 30)" }}>
              {result.ok ? result.val : result.err}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
