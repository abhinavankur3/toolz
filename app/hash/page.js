"use client";
import { useEffect, useState } from "react";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton } from "@/components/copy-button";

export default function HashPage() {
  const [input, setInput] = useState("toolz");
  const [hashes, setHashes] = useState({});

  useEffect(() => {
    if (typeof crypto === "undefined" || !crypto.subtle) return;
    const enc = new TextEncoder().encode(input);
    const algs = ["SHA-1", "SHA-256", "SHA-384", "SHA-512"];
    Promise.all(
      algs.map((a) =>
        crypto.subtle.digest(a, enc).then((b) => [
          a,
          Array.from(new Uint8Array(b)).map((x) => x.toString(16).padStart(2, "0")).join(""),
        ])
      )
    ).then((r) => setHashes(Object.fromEntries(r)));
  }, [input]);

  const inputBytes = typeof TextEncoder !== "undefined" ? new TextEncoder().encode(input).length : 0;

  return (
    <>
      <ToolHeader title="Hash Generator" desc="SHA-1, SHA-256, SHA-384, SHA-512 computed locally with WebCrypto." />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-h"><h3>Input</h3><span className="badge mono">{inputBytes} bytes</span></div>
        <div className="card-b">
          <textarea className="textarea mono" style={{ minHeight: 100 }} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </div>
      </div>
      <div className="col gap-3">
        {Object.entries(hashes).map(([a, h]) => (
          <div key={a} className="card">
            <div className="card-h"><h3>{a}</h3><CopyButton small value={h} toastMsg={a + " copied"} /></div>
            <div className="card-b">
              <div className="mono-out">{h}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
