"use client";
import { useEffect, useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";

export default function ClockPage() {
  const [now, setNow] = useState(new Date());
  const [tz, setTz] = useState("UTC");
  const [show24, setShow24] = useState(false);

  useEffect(() => {
    setTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const allZones = useMemo(() => {
    try {
      if (typeof Intl !== "undefined" && typeof Intl.supportedValuesOf === "function") {
        return Intl.supportedValuesOf("timeZone");
      }
    } catch {}
    return [
      "UTC",
      "America/Los_Angeles",
      "America/Denver",
      "America/Chicago",
      "America/New_York",
      "America/Sao_Paulo",
      "Europe/London",
      "Europe/Berlin",
      "Europe/Paris",
      "Africa/Lagos",
      "Asia/Dubai",
      "Asia/Kolkata",
      "Asia/Singapore",
      "Asia/Tokyo",
      "Australia/Sydney",
      "Pacific/Auckland",
    ];
  }, []);

  const zones = useMemo(
    () => (allZones.includes(tz) ? allZones : [tz, ...allZones]),
    [allZones, tz]
  );

  const featured = useMemo(
    () =>
      [
        "UTC",
        "America/Los_Angeles",
        "America/New_York",
        "Europe/London",
        "Europe/Berlin",
        "Asia/Kolkata",
        "Asia/Tokyo",
        "Australia/Sydney",
        tz,
      ].filter((v, i, a) => a.indexOf(v) === i && allZones.includes(v)),
    [tz, allZones]
  );

  const parts = useMemo(() => {
    const d = new Date(now.toLocaleString("en-US", { timeZone: tz }));
    return { h: d.getHours(), m: d.getMinutes(), s: d.getSeconds() };
  }, [now, tz]);

  const hourDeg = (parts.h % 12) * 30 + parts.m * 0.5;
  const minDeg = parts.m * 6 + parts.s * 0.1;
  const secDeg = parts.s * 6;

  const fmt = now.toLocaleTimeString("en-US", { timeZone: tz, hour12: !show24, hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const fmtDate = now.toLocaleDateString("en-US", { timeZone: tz, weekday: "long", year: "numeric", month: "long", day: "numeric" });

  return (
    <>
      <ToolHeader title="Analog Clock" desc="A pleasant analog clock with timezone awareness." />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Now</h3><span className="badge mono">{tz}</span></div>
          <div className="card-b" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 40 }}>
            <div className="clock-stage">
              <svg viewBox="0 0 320 320" width="320" height="320">
                <circle cx="160" cy="160" r="150" fill="var(--bg-sunk)" stroke="var(--line)" strokeWidth="1" />
                <circle cx="160" cy="160" r="142" fill="none" stroke="var(--line)" strokeWidth="0.5" strokeDasharray="0.5 7.8" />
                {[...Array(12)].map((_, i) => {
                  const a = (i * 30) * Math.PI / 180;
                  const x1 = 160 + Math.sin(a) * 130;
                  const y1 = 160 - Math.cos(a) * 130;
                  const x2 = 160 + Math.sin(a) * 142;
                  const y2 = 160 - Math.cos(a) * 142;
                  return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="var(--ink)" strokeWidth={i % 3 === 0 ? 2 : 1} strokeLinecap="round" />;
                })}
                {[12, 3, 6, 9].map((n, i) => {
                  const a = (i * 90) * Math.PI / 180;
                  const x = 160 + Math.sin(a) * 110;
                  const y = 160 - Math.cos(a) * 110 + 7;
                  return (
                    <text key={n} x={x} y={y} textAnchor="middle" fontSize="20" fontFamily="var(--mono)" fill="var(--ink)" fontWeight="500">
                      {n}
                    </text>
                  );
                })}
                <g transform={`rotate(${hourDeg} 160 160)`}>
                  <line x1="160" y1="172" x2="160" y2="90" stroke="var(--ink)" strokeWidth="5" strokeLinecap="round" />
                </g>
                <g transform={`rotate(${minDeg} 160 160)`}>
                  <line x1="160" y1="175" x2="160" y2="62" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
                </g>
                <g transform={`rotate(${secDeg} 160 160)`}>
                  <line x1="160" y1="180" x2="160" y2="50" stroke="var(--accent)" strokeWidth="1.2" strokeLinecap="round" />
                  <circle cx="160" cy="55" r="4" fill="var(--accent)" />
                </g>
                <circle cx="160" cy="160" r="5" fill="var(--ink)" />
                <circle cx="160" cy="160" r="2" fill="var(--bg-card)" />
              </svg>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-h"><h3>Digital</h3></div>
          <div className="card-b col gap-4">
            <div>
              <div className="mono" style={{ fontSize: 56, fontWeight: 500, letterSpacing: "-.03em", fontVariantNumeric: "tabular-nums" }}>{fmt}</div>
              <div className="muted" style={{ marginTop: 8 }}>{fmtDate}</div>
            </div>
            <div className="divider"></div>
            <div className="field">
              <label>Timezone</label>
              <select className="select" value={tz} onChange={(e) => setTz(e.target.value)}>
                {zones.map((z) => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
            <label className="check"><input type="checkbox" checked={show24} onChange={(e) => setShow24(e.target.checked)} />24-hour format</label>
            <div className="row gap-3" style={{ marginTop: 8, flexWrap: "wrap" }}>
              {featured.slice(0, 4).map((z) => (
                <div key={z} style={{ padding: "10px 14px", border: "1px solid var(--line)", borderRadius: 8, background: "var(--bg-sunk)", minWidth: 130, flex: 1 }}>
                  <div className="mono" style={{ fontSize: 10, color: "var(--ink-4)", textTransform: "uppercase", letterSpacing: ".06em" }}>{z.split("/").pop().replace("_", " ")}</div>
                  <div className="mono" style={{ fontSize: 16, fontVariantNumeric: "tabular-nums" }}>
                    {now.toLocaleTimeString("en-US", { timeZone: z, hour12: !show24, hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
