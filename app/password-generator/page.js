"use client";
import { use, useEffect, useState } from "react";

const generatePassword = ({
  isAlphabets,
  isNumbers,
  isSpecialCharacters,
  length,
}) => {
  const alphabets = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  let charset = "";

  if (isAlphabets) {
    charset += alphabets;
  }
  if (isNumbers) {
    charset += numbers;
  }
  if (isSpecialCharacters) {
    charset += specialCharacters;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  return password;
};

export default function UUID() {
  const [password, setPassword] = useState(
    generatePassword({
      isAlphabets: true,
      isNumbers: true,
      isSpecialCharacters: true,
      length: 16,
    })
  );
  const [isAlphabets, setIsAlphabets] = useState(true);
  const [isNumbers, setIsNumbers] = useState(true);
  const [isSpecialCharacters, setIsSpecialCharacters] = useState(true);
  const [length, setLength] = useState(16);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }, [copied]);

  useEffect(() => {
    setPassword(
      generatePassword({ isAlphabets, isNumbers, isSpecialCharacters, length })
    );
  }, [isAlphabets, isNumbers, isSpecialCharacters, length]);

  return (
    <div className="h-screen w-full lg:w-[85vw] flex flex-col justify-center items-center">
      <div className=" border border-seconary-content rounded-lg p-6 flex flex-col w-[90vw] lg:w-[45vw]">
        <div className="text-center mb-4">
          <div className="text-3xl mb-4">Generate Password</div>
          <div>Create unique Passwords</div>
        </div>
        <div className="mb-4 flex justify-between align-middle">
          <div className="flex align-baseline">
            No. of characters
            <input
              type="number"
              defaultValue={16}
              onChange={(e) => setLength(e.target.value)}
              className="input input-bordered w-16 h-8 ml-2"
            ></input>
          </div>
          <div className="flex align-middle">
            Alphabets
            <input
              type="checkbox"
              defaultChecked
              onChange={(e) => setIsAlphabets(e.target.checked)}
              className="checkbox checkbox-neutral ml-2"
            />
          </div>
          <div className="flex align-middle">
            Numbers
            <input
              type="checkbox"
              defaultChecked
              onChange={(e) => setIsNumbers(e.target.checked)}
              className="checkbox checkbox-neutral ml-2"
            />
          </div>
          <div className="flex align-middle">
            Special characters
            <input
              type="checkbox"
              defaultChecked
              onChange={(e) => setIsSpecialCharacters(e.target.checked)}
              className="checkbox checkbox-neutral ml-2"
            />
          </div>
        </div>
        <div className="mb-4 flex flex-col">
          <div className="mb-4">Generated Password</div>
          <div className="flex ">
            <input
              type="text"
              value={password}
              className="input input-bordered w-full mb-4 mr-2"
              readOnly
            />
            <button
              className="btn"
              onClick={() => {
                if (!copied) {
                  navigator.clipboard.writeText(password);
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

          <button
            className="btn bg-black text-white hover:text-black hover:bg-base-300"
            onClick={() =>
              setPassword(
                generatePassword({
                  isAlphabets,
                  isNumbers,
                  isSpecialCharacters,
                  length,
                })
              )
            }
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
            Regenerate Password
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}
