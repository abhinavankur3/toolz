"use client";
import { useMemo, useState } from "react";
import TurndownService from "turndown";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton } from "@/components/copy-button";

const td = new TurndownService({ headingStyle: "atx", codeBlockStyle: "fenced" });

function esc(s) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}
function mdToHtml(md) {
  let h = md;
  h = h.replace(/```(\w*)\n([\s\S]*?)```/g, (_, l, c) => `<pre><code>${esc(c)}</code></pre>`);
  h = h.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  h = h.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  h = h.replace(/^# (.+)$/gm, "<h1>$1</h1>");
  h = h.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  h = h.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  h = h.replace(/`([^`]+)`/g, "<code>$1</code>");
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  h = h.replace(/^- (.+)$/gm, "<li>$1</li>");
  h = h.replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (m) => "<ul>" + m + "</ul>");
  h = h
    .split(/\n{2,}/)
    .map((p) => (p.match(/^<(h\d|ul|pre)/) ? p : p.trim() ? "<p>" + p.replace(/\n/g, "<br>") + "</p>" : ""))
    .join("\n");
  return h;
}

export default function HtmlMdPage() {
  const [mode, setMode] = useState("html2md");
  const [input, setInput] = useState(
    `<h1>Welcome</h1>\n<p>A tiny <strong>workshop</strong> of <em>focused</em> tools.</p>\n<ul>\n  <li>Local-first</li>\n  <li>Keyboard friendly</li>\n</ul>`
  );

  const result = useMemo(() => {
    try {
      if (mode === "html2md") return { ok: true, val: td.turndown(input) };
      return { ok: true, val: mdToHtml(input) };
    } catch (e) {
      return { ok: false, err: e.message };
    }
  }, [mode, input]);

  return (
    <>
      <ToolHeader title="HTML ↔ Markdown" desc="Convert HTML to Markdown (via Turndown) and back." />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h">
            <h3>{mode === "html2md" ? "HTML" : "Markdown"}</h3>
            <div className="row gap-2">
              <button type="button" className={"pill" + (mode === "html2md" ? " accent" : "")} onClick={() => setMode("html2md")}>HTML → MD</button>
              <button type="button" className={"pill" + (mode === "md2html" ? " accent" : "")} onClick={() => setMode("md2html")}>MD → HTML</button>
            </div>
          </div>
          <div className="card-b">
            <textarea className="textarea mono" style={{ minHeight: 280 }} value={input} onChange={(e) => setInput(e.target.value)} spellCheck={false} />
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>{mode === "html2md" ? "Markdown" : "HTML"}</h3>
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
