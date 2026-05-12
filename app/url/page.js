"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton } from "@/components/copy-button";

export default function UrlPage() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("https://example.com/search?q=hello world&lang=en");

  const out = useMemo(() => {
    try {
      return mode === "encode" ? encodeURIComponent(input) : decodeURIComponent(input);
    } catch {
      return "Invalid input";
    }
  }, [mode, input]);

  return (
    <>
      <ToolHeader title="URL Encoder / Decoder" desc="Percent-encode and decode URL components." />
      <div className="tool-1col">
        <div className="card">
          <div className="card-h">
            <h3>{mode === "encode" ? "Original" : "Encoded"}</h3>
            <div className="row gap-2">
              <button type="button" className={"pill" + (mode === "encode" ? " accent" : "")} onClick={() => setMode("encode")}>Encode</button>
              <button type="button" className={"pill" + (mode === "decode" ? " accent" : "")} onClick={() => setMode("decode")}>Decode</button>
            </div>
          </div>
          <div className="card-b">
            <textarea className="textarea mono" style={{ minHeight: 140 }} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>Result</h3>
            <CopyButton small value={out} toastMsg="Copied" />
          </div>
          <div className="card-b">
            <div className="mono-out" style={{ minHeight: 120 }}>{out}</div>
          </div>
        </div>
      </div>
    </>
  );
}
