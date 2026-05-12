"use client";
import { useState } from "react";
import { Icons } from "./icons";
import { useShell } from "./shell-context";

export function CopyButton({ value, label = "Copy", small = false, toastMsg }) {
  const [done, setDone] = useState(false);
  const { toast } = useShell();
  const click = () => {
    if (value == null || value === "") return;
    navigator.clipboard?.writeText(String(value));
    setDone(true);
    if (toastMsg) toast(toastMsg);
    setTimeout(() => setDone(false), 1400);
  };
  return (
    <button className={"btn " + (small ? "" : "primary")} onClick={click} type="button">
      {done ? <Icons.check size={14} /> : <Icons.copy size={14} />}
      {done ? "Copied" : label}
    </button>
  );
}

export function CopyIconButton({ value, toastMsg = "Copied" }) {
  const { toast } = useShell();
  return (
    <button
      className="icon-btn"
      type="button"
      onClick={() => {
        if (value == null || value === "") return;
        navigator.clipboard?.writeText(String(value));
        toast(toastMsg);
      }}
      title="Copy"
      aria-label="Copy value"
    >
      <Icons.copy size={13} />
    </button>
  );
}
