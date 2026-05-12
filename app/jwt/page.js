"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton } from "@/components/copy-button";

const SAMPLE = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiZW1haWwiOiJqYW5lQHRvb2x6LmFwcCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcxOTQwMDAwMCwiZXhwIjoxNzE5NDg2NDAwfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

export default function JwtPage() {
  const [token, setToken] = useState(SAMPLE);

  const decoded = useMemo(() => {
    const parts = token.split(".");
    if (parts.length !== 3) return { ok: false, err: "Token must have 3 dot-separated parts" };
    try {
      const dec = (s) => {
        s = s.replace(/-/g, "+").replace(/_/g, "/");
        while (s.length % 4) s += "=";
        return JSON.parse(decodeURIComponent(escape(atob(s))));
      };
      const head = dec(parts[0]);
      const body = dec(parts[1]);
      return { ok: true, head, body, sig: parts[2] };
    } catch (e) {
      return { ok: false, err: "Invalid JWT: " + e.message };
    }
  }, [token]);

  const claim = (key, label) => {
    const v = decoded.ok ? decoded.body[key] : null;
    if (v == null) return null;
    let display = String(v);
    if (key === "iat" || key === "exp" || key === "nbf") {
      const d = new Date(v * 1000);
      display = `${v} → ${d.toUTCString()}`;
    }
    return (
      <div className="row gap-3" style={{ padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
        <div className="mono" style={{ minWidth: 60, color: "var(--ink-3)", fontSize: 11, textTransform: "uppercase", letterSpacing: ".06em" }}>{label || key}</div>
        <div className="mono flex1" style={{ fontSize: 12 }}>{display}</div>
      </div>
    );
  };

  return (
    <>
      <ToolHeader title="JWT Decoder" desc="Decode JSON Web Tokens into header, payload, and signature. No signature verification." />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-h"><h3>Token</h3></div>
        <div className="card-b">
          <textarea
            className="textarea mono"
            style={{ minHeight: 110, fontSize: 12, wordBreak: "break-all" }}
            value={token}
            onChange={(e) => setToken(e.target.value)}
            spellCheck={false}
          />
        </div>
      </div>
      {decoded.ok ? (
        <div className="tool-2col">
          <div className="card">
            <div className="card-h"><h3>Header</h3><span className="badge mono">{decoded.head.alg || "·"}</span></div>
            <div className="card-b">
              <pre className="mono-out" style={{ margin: 0, minHeight: 100 }}>{JSON.stringify(decoded.head, null, 2)}</pre>
            </div>
          </div>
          <div className="card">
            <div className="card-h">
              <h3>Payload</h3>
              <CopyButton small value={JSON.stringify(decoded.body, null, 2)} toastMsg="Payload copied" />
            </div>
            <div className="card-b">
              <pre className="mono-out" style={{ margin: 0, minHeight: 100 }}>{JSON.stringify(decoded.body, null, 2)}</pre>
            </div>
          </div>
          <div className="card" style={{ gridColumn: "1 / -1" }}>
            <div className="card-h"><h3>Claims</h3></div>
            <div className="card-b col gap-1">
              {claim("sub", "Subject")}
              {claim("name", "Name")}
              {claim("email", "Email")}
              {claim("role", "Role")}
              {claim("iat", "Issued")}
              {claim("exp", "Expires")}
              {claim("iss", "Issuer")}
              {claim("aud", "Audience")}
            </div>
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="card-b">
            <div className="mono-out" style={{ color: "oklch(55% 0.18 30)" }}>{decoded.err}</div>
          </div>
        </div>
      )}
    </>
  );
}
