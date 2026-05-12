"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";

const STATUSES = [
  [100, "Continue", "Client should continue the request."],
  [101, "Switching Protocols", "Server agrees to switch protocols."],
  [200, "OK", "The request succeeded."],
  [201, "Created", "Resource created successfully."],
  [202, "Accepted", "Request accepted for processing."],
  [204, "No Content", "Success but no body to return."],
  [206, "Partial Content", "Partial range delivered (Range requests)."],
  [301, "Moved Permanently", "Use the new URL henceforth."],
  [302, "Found", "Resource is at a different URL temporarily."],
  [303, "See Other", "Client should GET another URL."],
  [304, "Not Modified", "Cached response is still valid."],
  [307, "Temporary Redirect", "Retry the same method at the new URL."],
  [308, "Permanent Redirect", "Use the new URL permanently."],
  [400, "Bad Request", "Server can't parse the request."],
  [401, "Unauthorized", "Authentication required."],
  [402, "Payment Required", "Reserved for future use."],
  [403, "Forbidden", "Server refuses to authorize."],
  [404, "Not Found", "No resource at this URL."],
  [405, "Method Not Allowed", "Method not supported on this resource."],
  [406, "Not Acceptable", "Can't satisfy Accept headers."],
  [408, "Request Timeout", "Client took too long to send the request."],
  [409, "Conflict", "Conflict with current state of the resource."],
  [410, "Gone", "Resource is permanently gone."],
  [411, "Length Required", "Content-Length header required."],
  [412, "Precondition Failed", "A request precondition failed."],
  [413, "Payload Too Large", "Request body is too large."],
  [414, "URI Too Long", "URL exceeds server limits."],
  [415, "Unsupported Media Type", "Server can't process the body's media type."],
  [418, "I'm a Teapot", "RFC 2324 joke status."],
  [422, "Unprocessable Entity", "Semantically invalid request."],
  [425, "Too Early", "Server unwilling to process replayed request."],
  [426, "Upgrade Required", "Client should switch to a different protocol."],
  [428, "Precondition Required", "Origin requires the request to be conditional."],
  [429, "Too Many Requests", "Rate-limited."],
  [431, "Request Header Fields Too Large", "Headers exceed server limit."],
  [451, "Unavailable For Legal Reasons", "Legally restricted resource."],
  [500, "Internal Server Error", "Generic server failure."],
  [501, "Not Implemented", "Method/feature not supported."],
  [502, "Bad Gateway", "Upstream gave an invalid response."],
  [503, "Service Unavailable", "Server temporarily unable to handle the request."],
  [504, "Gateway Timeout", "Upstream didn't respond in time."],
  [505, "HTTP Version Not Supported", "Server doesn't support this HTTP version."],
  [507, "Insufficient Storage", "Server can't store the representation."],
  [511, "Network Authentication Required", "Captive portal-style auth required."],
];

function categoryFor(code) {
  if (code < 200) return { lbl: "Informational", c: "oklch(60% 0.13 250)" };
  if (code < 300) return { lbl: "Success", c: "oklch(60% 0.15 145)" };
  if (code < 400) return { lbl: "Redirect", c: "oklch(65% 0.14 80)" };
  if (code < 500) return { lbl: "Client error", c: "oklch(60% 0.18 30)" };
  return { lbl: "Server error", c: "oklch(55% 0.2 25)" };
}

export default function HttpStatusPage() {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    if (!q) return STATUSES;
    const lc = q.toLowerCase();
    return STATUSES.filter(
      ([code, name, desc]) =>
        String(code).includes(q) || name.toLowerCase().includes(lc) || desc.toLowerCase().includes(lc)
    );
  }, [q]);

  return (
    <>
      <ToolHeader title="HTTP Status Codes" desc="Search the standard HTTP status codes with descriptions." />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-b">
          <input className="input" placeholder="Search by code or name (try '404', 'rate')" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
      </div>
      <div className="card">
        <div className="card-h"><h3>{filtered.length} of {STATUSES.length}</h3></div>
        <div className="card-b col gap-1">
          {filtered.map(([code, name, desc]) => {
            const cat = categoryFor(code);
            return (
              <div key={code} className="row gap-3" style={{ padding: "12px 0", borderBottom: "1px solid var(--line)", alignItems: "flex-start" }}>
                <div className="mono" style={{ minWidth: 50, fontSize: 18, fontWeight: 500, color: cat.c }}>{code}</div>
                <div className="flex1">
                  <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 2 }}>{name}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{desc}</div>
                </div>
                <span className="pill" style={{ color: cat.c }}>{cat.lbl}</span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
