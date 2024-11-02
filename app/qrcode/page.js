"use client";
import { useState } from "react";
import QRCode from "react-qr-code";
import { ChromePicker } from "react-color";

export default function QRCodeGenerator() {
  const [data, setData] = useState("");
  const [size, setSize] = useState(128);
  const [errorMargin, setErrorMargin] = useState("L");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");
  const [qrCode, setQrCode] = useState("");

  return (
    <div className="min-h-screen w-[85vw] flex flex-col justify-center items-center">
      <div className=" border border-seconary-content rounded-lg p-6 flex flex-col w-[40vw]">
        <div className="text-center mb-4">
          <div className="text-3xl mb-4">Generate QR code</div>
        </div>
        <div className="mb-4 flex flex-col">
          <div className="mb-2">Text or URL</div>
          <div className="flex ">
            <input
              type="text"
              value={data}
              className="input input-bordered w-full mb-4 mr-2"
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div>
            <div className="flex justify-between mb-4">
              <div className="flex items-center ">
                <div className="mr-4">Size</div>
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => {
                    setSize(e.target.value);
                  }}
                  defaultValue={128}
                >
                  <option value={128}>128 x 128</option>
                  <option value={256}>256 x 256</option>
                  <option value={512}>512 x 512</option>
                </select>
              </div>
              <div className="flex items-center ">
                <div className="mr-4">Error Correction Level</div>
                <select
                  className="select select-bordered w-full"
                  onChange={(e) => {
                    setErrorMargin(e.target.value);
                  }}
                  defaultValue={"L"}
                >
                  <option value={"L"}>Low (L)</option>
                  <option value={"M"}>Medium (M)</option>
                  <option value={"Q"}>Quartile (Q)</option>
                  <option value={"H"}>High (H)</option>
                </select>
              </div>
            </div>
            <div className="flex justify-between mb-4">
              <div>
                <div className="mb-2">Background Color</div>
                <ChromePicker
                  color={bgColor}
                  onChange={(color) => setBgColor(color.hex)}
                />
              </div>
              <div>
                <div className="mb-2">Foreground Color</div>
                <ChromePicker
                  color={fgColor}
                  onChange={(color) => setFgColor(color.hex)}
                />
              </div>
            </div>
          </div>
          <button
            className="btn mb-4 bg-black text-white hover:text-black hover:bg-base-300"
            onClick={() => setQrCode(data)}
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
            Generate
          </button>
        </div>

        {qrCode && (
          <div className="flex justify-center items-center p-12 max-w-full">
            <QRCode
              size={size}
              value={qrCode}
              level={errorMargin}
              bgColor={bgColor}
              fgColor={fgColor}
            />
          </div>
        )}
      </div>
    </div>
  );
}
