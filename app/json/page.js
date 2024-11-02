"use client";
import { useState, useEffect } from "react";
export default function JSONValidator() {
  const [jsonData, setJsonData] = useState("");
  const [formattedJson, setFormattedJson] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  return (
    <div className="h-screen w-[85vw] flex flex-col justify-center items-center">
      <div className=" border border-seconary-content rounded-lg p-6 flex flex-col w-[50vw]">
        <div className="text-center mb-4">
          <div className="text-3xl mb-4">Format and Validate JSON</div>
        </div>
        <div className="mb-4 flex flex-col">
          <div className="mb-2">Input JSON:</div>
          <div className="flex ">
            <textarea
              className="textarea textarea-bordered w-full mb-4"
              rows={6}
              onChange={(e) => setJsonData(e.target.value)}
              value={jsonData}
            ></textarea>
          </div>
          <button
            className="btn mb-4 bg-black text-white hover:text-black hover:bg-base-300"
            onClick={() => {
              setError("");
              if (jsonData) {
                try {
                  const parsedJson = JSON.parse(jsonData);
                  setFormattedJson(JSON.stringify(parsedJson, null, 2));
                } catch (error) {
                  setError(error.message);
                  setFormattedJson("");
                }
              }
            }}
          >
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
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
            Format and Validate
          </button>
          {error && (
            <div className="text-white p-2 rounded-lg bg-error mb-4">
              {error}
            </div>
          )}
          {formattedJson && (
            <>
              <div className="mb-2 flex w-full justify-between items-center">
                <div>Formatted JSON:</div>
                <button
                  className="btn btn-sm"
                  onClick={() => {
                    if (!copied) {
                      navigator.clipboard.writeText(formattedJson);
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

              <div className="flex ">
                <textarea
                  className="textarea textarea-bordered w-full mb-4"
                  rows={6}
                  onChange={(e) => setJsonData(e.target.value)}
                  value={formattedJson}
                  readOnly
                ></textarea>
              </div>
            </>
          )}
        </div>
        <div></div>
      </div>
    </div>
  );
}
