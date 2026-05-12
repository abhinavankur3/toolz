"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";

export default function WordCountPage() {
  const [src, setSrc] = useState(
    "Write or paste any text, and the stats below update live. Useful for blog posts, README files, tweets, or anything where word count matters."
  );

  const stats = useMemo(() => {
    const chars = src.length;
    const charsNoSpace = src.replace(/\s/g, "").length;
    const wordsArr = src.match(/\S+/g) || [];
    const words = wordsArr.length;
    const sentences = (src.match(/[.!?]+(?:\s|$)/g) || []).length;
    const paragraphs = src.split(/\n\s*\n/).filter((p) => p.trim().length).length;
    const lines = src.split("\n").length;
    const readMin = Math.max(1, Math.ceil(words / 200));
    const speakMin = Math.max(1, Math.ceil(words / 130));
    return { chars, charsNoSpace, words, sentences, paragraphs, lines, readMin, speakMin };
  }, [src]);

  const items = [
    ["Characters", stats.chars],
    ["Characters (no spaces)", stats.charsNoSpace],
    ["Words", stats.words],
    ["Sentences", stats.sentences],
    ["Paragraphs", stats.paragraphs],
    ["Lines", stats.lines],
    ["Reading time", `~${stats.readMin} min`],
    ["Speaking time", `~${stats.speakMin} min`],
  ];

  return (
    <>
      <ToolHeader title="Word Counter" desc="Words, characters, paragraphs, reading + speaking time." />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Text</h3></div>
          <div className="card-b">
            <textarea className="textarea" style={{ minHeight: 320 }} value={src} onChange={(e) => setSrc(e.target.value)} spellCheck={false} />
          </div>
        </div>
        <div className="card">
          <div className="card-h"><h3>Stats</h3></div>
          <div className="card-b col gap-1">
            {items.map(([k, v]) => (
              <div key={k} className="row gap-3" style={{ padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
                <div style={{ minWidth: 170, fontSize: 11, color: "var(--ink-3)", textTransform: "uppercase", letterSpacing: ".06em", fontFamily: "var(--mono)" }}>{k}</div>
                <div className="mono flex1" style={{ fontSize: 16, fontVariantNumeric: "tabular-nums" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
