"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton } from "@/components/copy-button";

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
  h = h.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  h = h.replace(/^> (.+)$/gm, "<blockquote>$1</blockquote>");
  h = h.replace(/^- (.+)$/gm, "<li>$1</li>");
  h = h.replace(/(<li>[\s\S]*?<\/li>\n?)+/g, (m) => "<ul>" + m + "</ul>");
  h = h.replace(/^---$/gm, "<hr>");
  h = h
    .split(/\n{2,}/)
    .map((p) => {
      if (p.match(/^<(h\d|ul|pre|blockquote|hr)/)) return p;
      return p.trim() ? "<p>" + p.replace(/\n/g, "<br>") + "</p>" : "";
    })
    .join("\n");
  return h;
}

export default function MarkdownPage() {
  const [md, setMd] = useState(`# Welcome to toolz.

A small workshop of **fast**, *focused* IT utilities that run entirely in your browser.

## Features
- No tracking, no servers
- Keyboard-first
- Theme + density tweakable

> Quick, clean, and a little opinionated.

Try editing this \`markdown\` and the preview updates live.

---

[Open the repo →](#)`);

  const html = useMemo(() => mdToHtml(md), [md]);

  return (
    <>
      <ToolHeader title="Markdown Editor" desc="Write Markdown, see the rendered result in real time." />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Source</h3><span className="badge mono">{md.length} ch</span></div>
          <div className="card-b">
            <textarea className="textarea mono" style={{ minHeight: 440, fontSize: 13 }} value={md} onChange={(e) => setMd(e.target.value)} spellCheck={false} />
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>Preview</h3>
            <CopyButton small value={html} label="Copy HTML" toastMsg="HTML copied" />
          </div>
          <div className="card-b">
            <div className="md-prev" style={{ minHeight: 440 }} dangerouslySetInnerHTML={{ __html: html }} />
          </div>
        </div>
      </div>
    </>
  );
}
