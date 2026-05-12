"use client";
import { useMemo, useState } from "react";
import Papa from "papaparse";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton } from "@/components/copy-button";

export default function CsvJsonPage() {
  const [mode, setMode] = useState("csv2json");
  const [input, setInput] = useState("name,role,location\nAda,founder,London\nGrace,engineer,New York\nLinus,kernel hacker,Helsinki");

  const result = useMemo(() => {
    try {
      if (mode === "csv2json") {
        const r = Papa.parse(input.trim(), { header: true, skipEmptyLines: true });
        if (r.errors.length) return { ok: false, err: r.errors[0].message };
        return { ok: true, val: JSON.stringify(r.data, null, 2) };
      }
      const arr = JSON.parse(input);
      if (!Array.isArray(arr)) return { ok: false, err: "Expected a JSON array of objects" };
      return { ok: true, val: Papa.unparse(arr) };
    } catch (e) {
      return { ok: false, err: e.message };
    }
  }, [mode, input]);

  return (
    <>
      <ToolHeader title="CSV ↔ JSON" desc="Convert between CSV (with headers) and JSON arrays." />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h">
            <h3>{mode === "csv2json" ? "CSV" : "JSON"}</h3>
            <div className="row gap-2">
              <button type="button" className={"pill" + (mode === "csv2json" ? " accent" : "")} onClick={() => setMode("csv2json")}>CSV → JSON</button>
              <button type="button" className={"pill" + (mode === "json2csv" ? " accent" : "")} onClick={() => setMode("json2csv")}>JSON → CSV</button>
            </div>
          </div>
          <div className="card-b">
            <textarea className="textarea mono" style={{ minHeight: 280 }} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>{mode === "csv2json" ? "JSON" : "CSV"}</h3>
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
