"use client";
import { useMemo, useState } from "react";
import { Icons } from "@/components/icons";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton } from "@/components/copy-button";

export default function Base64Page() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState("Hello, toolz!");

  const out = useMemo(() => {
    try {
      if (mode === "encode") {
        return { ok: true, val: btoa(unescape(encodeURIComponent(input))) };
      }
      return { ok: true, val: decodeURIComponent(escape(atob(input))) };
    } catch {
      return { ok: false, val: "Invalid input" };
    }
  }, [mode, input]);

  return (
    <>
      <ToolHeader
        title="Base64 Encoder / Decoder"
        desc="Convert text to base64 and back, with full Unicode support."
        actions={
          <button
            className="btn primary"
            type="button"
            onClick={() => {
              setMode(mode === "encode" ? "decode" : "encode");
              setInput(out.val);
            }}
          >
            <Icons.swap size={14} />Swap
          </button>
        }
      />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h">
            <h3>{mode === "encode" ? "Plain text" : "Base64"}</h3>
            <div className="row gap-2">
              <button type="button" className={"pill" + (mode === "encode" ? " accent" : "")} onClick={() => setMode("encode")}>Encode</button>
              <button type="button" className={"pill" + (mode === "decode" ? " accent" : "")} onClick={() => setMode("decode")}>Decode</button>
            </div>
          </div>
          <div className="card-b">
            <textarea className="textarea mono" style={{ minHeight: 240 }} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>{mode === "encode" ? "Base64" : "Plain text"}</h3>
            <CopyButton small value={out.val} toastMsg="Copied" />
          </div>
          <div className="card-b">
            <div className="mono-out tall" style={{ minHeight: 240, color: out.ok ? "var(--ink)" : "oklch(55% 0.18 30)" }}>{out.val}</div>
          </div>
        </div>
      </div>
    </>
  );
}
