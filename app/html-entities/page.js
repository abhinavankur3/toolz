"use client";
import { useMemo, useState } from "react";
import { Icons } from "@/components/icons";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton } from "@/components/copy-button";

function encode(s) {
  return s.replace(/[ -香<>&"']/g, (c) => "&#" + c.charCodeAt(0) + ";");
}
function decode(s) {
  const t = document.createElement("textarea");
  t.innerHTML = s;
  return t.value;
}

export default function HtmlEntitiesPage() {
  const [mode, setMode] = useState("encode");
  const [input, setInput] = useState('Café <em>★</em> "quote" résumé');

  const out = useMemo(() => {
    try {
      return mode === "encode" ? encode(input) : decode(input);
    } catch {
      return "";
    }
  }, [mode, input]);

  return (
    <>
      <ToolHeader
        title="HTML Entities"
        desc="Encode special characters to numeric entities or decode back to text."
        actions={
          <button
            className="btn primary"
            type="button"
            onClick={() => { setMode(mode === "encode" ? "decode" : "encode"); setInput(out); }}
          >
            <Icons.swap size={14} />Swap
          </button>
        }
      />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h">
            <h3>{mode === "encode" ? "Plain text" : "Encoded"}</h3>
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
            <h3>{mode === "encode" ? "Encoded" : "Plain text"}</h3>
            <CopyButton small value={out} toastMsg="Copied" />
          </div>
          <div className="card-b">
            <div className="mono-out tall" style={{ minHeight: 240 }}>{out}</div>
          </div>
        </div>
      </div>
    </>
  );
}
