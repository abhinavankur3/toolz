"use client";
import { useMemo, useState } from "react";
import { ToolHeader } from "@/components/tool-header";
import { CopyButton } from "@/components/copy-button";

const LOREM = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure reprehenderit in voluptate velit esse cillum eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum at vero eos accusamus iusto odio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos quas molestias excepturi obcaecati cupiditate similique mollitia animi sapiente delectus aut maxime rerum facilis distinctio expedita".split(" ");

export default function LoremPage() {
  const [type, setType] = useState("paragraphs");
  const [count, setCount] = useState(3);
  const [startClassic, setStartClassic] = useState(true);

  const out = useMemo(() => {
    const sentence = () => {
      const len = 6 + Math.floor(Math.random() * 12);
      const w = [];
      for (let i = 0; i < len; i++) w.push(LOREM[Math.floor(Math.random() * LOREM.length)]);
      w[0] = w[0][0].toUpperCase() + w[0].slice(1);
      return w.join(" ") + ".";
    };
    const para = () => {
      const len = 3 + Math.floor(Math.random() * 4);
      return Array(len).fill(0).map(sentence).join(" ");
    };
    if (type === "words") {
      const arr = [];
      for (let i = 0; i < count; i++) arr.push(LOREM[Math.floor(Math.random() * LOREM.length)]);
      return arr.join(" ");
    }
    if (type === "sentences") {
      return Array(count).fill(0).map(sentence).join(" ");
    }
    let paras = Array(count).fill(0).map(para);
    if (startClassic && type === "paragraphs") {
      paras[0] = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. " + paras[0];
    }
    return paras.join("\n\n");
  }, [type, count, startClassic]);

  return (
    <>
      <ToolHeader title="Lorem Ipsum Generator" desc="Filler text for layouts and design comps." />
      <div className="tool-2col">
        <div className="card">
          <div className="card-h"><h3>Options</h3></div>
          <div className="card-b col gap-4">
            <div className="field">
              <label>Type</label>
              <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>
            <div className="field">
              <label>Count <span className="muted mono" style={{ float: "right" }}>{count}</span></label>
              <input type="range" className="range" min="1" max="20" value={count} onChange={(e) => setCount(+e.target.value)} />
            </div>
            {type === "paragraphs" && (
              <label className="check">
                <input type="checkbox" checked={startClassic} onChange={(e) => setStartClassic(e.target.checked)} />
                Start with &quot;Lorem ipsum…&quot;
              </label>
            )}
          </div>
        </div>
        <div className="card">
          <div className="card-h">
            <h3>Output</h3>
            <CopyButton small value={out} toastMsg="Lorem copied" />
          </div>
          <div className="card-b">
            <div className="mono-out tall" style={{ whiteSpace: "pre-wrap", minHeight: 280, fontFamily: "var(--sans)", fontSize: 13.5, lineHeight: 1.6 }}>{out}</div>
          </div>
        </div>
      </div>
    </>
  );
}
