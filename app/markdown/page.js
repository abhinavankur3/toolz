"use client";
import { useState, useEffect } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

export default function Markdown() {
  const [markdown, setMarkdown] = useState(`# Welcome to the Markdown Editor

This is a live preview of your Markdown.

## Features

- **Bold** and *italic* text
- [Links](https://toolz.abhinavankur.com)
- Lists:
  1. Ordered
  2. Unordered

\`\`\`javascript showLineNumbers
const data = []
data.push('Hello World!')
\`\`\`

> Blockquotes

Enjoy writing!`);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  return (
    <div className="h-screen w-[85vw] flex justify-around items-center">
      <div className=" border border-seconary-content rounded-lg p-6 flex flex-col w-[40vw] min-h-[90vh]">
        <div className="text-center mb-4">
          <div className="text-3xl mb-4">Markdown Editor</div>
        </div>
        <div className="mb-4 flex flex-col">
          <div className="mb-2">Input Markdown:</div>
          <div className="flex ">
            <textarea
              className="textarea textarea-bordered w-full mb-4"
              rows={20}
              onChange={(e) => setMarkdown(e.target.value)}
              value={markdown}
            ></textarea>
          </div>
        </div>
        <div>
          <button
            className="btn w-full bg-black text-white hover:text-black hover:bg-base-300"
            onClick={() => {
              if (!copied) {
                navigator.clipboard.writeText(markdown);
                setCopied(true);
              }
            }}
          >
            {copied ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                />
              </svg>
            )}
          </button>
        </div>
      </div>
      <div
        className=" border border-seconary-content rounded-lg p-6 flex flex-col w-[40vw] min-h-[90vh]"
        data-color-mode="light"
      >
        <div className="text-center mb-4">
          <div className="text-3xl mb-4">Markdown Viewer</div>
        </div>
        <MarkdownPreview
          source={markdown}
          style={{ padding: 16 }}
          className="bg-white"
        />
        <div></div>
      </div>
    </div>
  );
}
