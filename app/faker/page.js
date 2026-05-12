"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Icons } from "@/components/icons";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton, CopyIconButton } from "@/components/copy-button";

const FIRST = ["Ada", "Grace", "Linus", "Margaret", "Alan", "Barbara", "Donald", "Edsger", "Vinton", "Tim", "Anita", "Radia", "Hedy", "Claude", "Niklaus", "Brian", "Dennis", "Ken", "Bjarne", "Rasmus"];
const LAST = ["Lovelace", "Hopper", "Torvalds", "Hamilton", "Turing", "Liskov", "Knuth", "Dijkstra", "Cerf", "Berners-Lee", "Borg", "Perlman", "Lamarr", "Shannon", "Wirth", "Kernighan", "Ritchie", "Thompson", "Stroustrup", "Lerdorf"];
const DOMAINS = ["toolz.dev", "studio.app", "workshop.io", "lab.ng", "fast.so", "stack.co"];
const CITIES = ["Lagos", "Bengaluru", "Berlin", "Lisbon", "Tokyo", "Helsinki", "Buenos Aires", "Singapore", "Nairobi", "Mexico City"];
const COMPANIES = ["Acme", "Initech", "Hooli", "Pied Piper", "Soylent", "Massive Dynamic", "Stark Industries", "Wayne Enterprises", "Aperture", "Cyberdyne"];
const ROLES = ["Founder", "Engineer", "Designer", "Manager", "Researcher", "Analyst", "Architect", "Director"];

function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function num(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function slug(s) { return s.toLowerCase().replace(/[^a-z0-9]+/g, ""); }

function person() {
  const first = rand(FIRST);
  const last = rand(LAST);
  const domain = rand(DOMAINS);
  return {
    name: `${first} ${last}`,
    email: `${slug(first)}.${slug(last)}@${domain}`,
    phone: `+${num(1, 99)} ${num(100, 999)} ${num(1000, 9999)}`,
    company: rand(COMPANIES),
    role: rand(ROLES),
    city: rand(CITIES),
    uuid: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2),
  };
}

export default function FakerPage() {
  const [count, setCount] = useState(10);
  const [rows, setRows] = useState([]);

  const gen = useCallback(() => {
    setRows(Array.from({ length: count }, () => person()));
  }, [count]);

  useEffect(() => { gen(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const json = useMemo(() => JSON.stringify(rows, null, 2), [rows]);

  return (
    <>
      <ToolHeader
        title="Data Faker"
        desc="Generate fake people: name, email, phone, company, role."
        actions={
          <>
            <button className="btn" type="button" onClick={gen}><Icons.refresh size={14} />Regenerate</button>
            <CopyButton small value={json} label="Copy JSON" toastMsg="Copied JSON" />
          </>
        }
      />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-b col gap-3">
          <div className="field">
            <label>Count <span className="muted mono" style={{ float: "right" }}>{count}</span></label>
            <input type="range" className="range" min="1" max="100" value={count} onChange={(e) => setCount(+e.target.value)} />
          </div>
          <button className="btn primary" type="button" onClick={gen}>Generate {count}</button>
        </div>
      </div>
      <div className="card">
        <div className="card-h"><h3>Rows</h3><span className="badge mono">{rows.length}</span></div>
        <div className="card-b col gap-1" style={{ maxHeight: 480, overflowY: "auto" }}>
          {rows.map((r, i) => (
            <div key={i} style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
              <div className="row gap-3">
                <div style={{ minWidth: 24, color: "var(--ink-4)", fontSize: 11, fontFamily: "var(--mono)" }}>{(i + 1).toString().padStart(2, "0")}</div>
                <div className="flex1">
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{r.name}</div>
                  <div className="mono" style={{ fontSize: 11, color: "var(--ink-3)" }}>{r.email} · {r.phone}</div>
                  <div style={{ fontSize: 12, color: "var(--ink-3)" }}>{r.role} @ {r.company} · {r.city}</div>
                </div>
                <CopyIconButton value={JSON.stringify(r, null, 2)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
