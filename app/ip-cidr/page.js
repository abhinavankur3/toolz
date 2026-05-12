"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";
import { CopyIconButton } from "@/components/copy-button";

function ipToInt(ip) {
  return ip.split(".").reduce((a, p) => (a << 8) + (parseInt(p, 10) & 255), 0) >>> 0;
}
function intToIp(n) {
  return [24, 16, 8, 0].map((s) => (n >>> s) & 255).join(".");
}

export default function IpCidrPage() {
  const [input, setInput] = useState("192.168.1.42/24");

  const calc = useMemo(() => {
    try {
      const [ip, bitsStr] = input.split("/");
      if (!ip) return { ok: false, err: "Provide an IP, optionally with /CIDR" };
      const bits = bitsStr === undefined ? 32 : parseInt(bitsStr, 10);
      if (isNaN(bits) || bits < 0 || bits > 32) return { ok: false, err: "CIDR must be 0–32" };
      const octets = ip.split(".");
      if (octets.length !== 4 || octets.some((o) => o === "" || isNaN(+o) || +o < 0 || +o > 255)) {
        return { ok: false, err: "Invalid IPv4 address" };
      }
      const ipInt = ipToInt(ip);
      const mask = bits === 0 ? 0 : (0xffffffff << (32 - bits)) >>> 0;
      const network = (ipInt & mask) >>> 0;
      const broadcast = (network | (~mask >>> 0)) >>> 0;
      const total = bits === 32 ? 1 : Math.pow(2, 32 - bits);
      const usable = total > 2 ? total - 2 : total;
      const firstHost = total > 2 ? network + 1 : network;
      const lastHost = total > 2 ? broadcast - 1 : broadcast;
      return {
        ok: true,
        rows: [
          ["IP address", ip],
          ["CIDR", `/${bits}`],
          ["Subnet mask", intToIp(mask)],
          ["Wildcard", intToIp(~mask >>> 0)],
          ["Network", intToIp(network)],
          ["Broadcast", intToIp(broadcast)],
          ["First host", intToIp(firstHost)],
          ["Last host", intToIp(lastHost)],
          ["Hosts", String(usable)],
          ["Total addresses", String(total)],
        ],
      };
    } catch (e) {
      return { ok: false, err: e.message };
    }
  }, [input]);

  return (
    <>
      <ToolHeader title="IP / CIDR Calculator" desc="Network, broadcast, mask, and host range for any IPv4 CIDR." />
      <div className="card" style={{ marginBottom: 16 }}>
        <div className="card-b">
          <input className="input mono" style={{ fontSize: 18, fontWeight: 500 }} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
        </div>
      </div>
      <div className="card">
        <div className="card-h"><h3>Calculated</h3></div>
        <div className="card-b col gap-1">
          {calc.ok ? (
            calc.rows.map(([k, v]) => (
              <div key={k} className="row gap-3" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                <div style={{ minWidth: 130, fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", fontFamily: "var(--mono)" }}>{k}</div>
                <div className="mono flex1" style={{ fontSize: 14, fontVariantNumeric: "tabular-nums" }}>{v}</div>
                <CopyIconButton value={v} />
              </div>
            ))
          ) : (
            <div className="mono-out" style={{ color: "oklch(55% 0.18 30)" }}>{calc.err}</div>
          )}
        </div>
      </div>
    </>
  );
}
