"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const ShellCtx = createContext(null);

function usePersisted(key, initial) {
  const [v, setV] = useState(initial);
  const loaded = useRef(false);
  useEffect(() => {
    try {
      const r = localStorage.getItem("toolz." + key);
      if (r != null) setV(JSON.parse(r));
    } catch {}
    loaded.current = true;
  }, [key]);
  useEffect(() => {
    if (!loaded.current) return;
    try { localStorage.setItem("toolz." + key, JSON.stringify(v)); } catch {}
  }, [key, v]);
  return [v, setV];
}

export function ShellProvider({ children }) {
  const [favs, setFavs] = usePersisted("favs", ["password", "json", "regex"]);
  const [recent, setRecent] = usePersisted("recent", []);
  const [query, setQuery] = useState("");
  const [theme, setTheme] = usePersisted("theme", "light");
  const [toasts, setToasts] = useState([]);
  const tIdRef = useRef(0);

  const toast = useCallback((msg) => {
    const id = ++tIdRef.current;
    setToasts((l) => [...l, { id, msg }]);
    setTimeout(() => setToasts((l) => l.map((t) => (t.id === id ? { ...t, exit: true } : t))), 1800);
    setTimeout(() => setToasts((l) => l.filter((t) => t.id !== id)), 2100);
  }, []);

  const toggleFav = useCallback((id) => {
    setFavs((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }, [setFavs]);

  const trackVisit = useCallback((id) => {
    if (!id) return;
    setRecent((r) => [id, ...r.filter((x) => x !== id)].slice(0, 8));
  }, [setRecent]);

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.setAttribute("data-card", "shadowed");
  }, [theme]);

  const value = {
    favs, toggleFav,
    recent, trackVisit,
    query, setQuery,
    theme, setTheme,
    toasts, toast,
  };

  return <ShellCtx.Provider value={value}>{children}</ShellCtx.Provider>;
}

export function useShell() {
  const ctx = useContext(ShellCtx);
  if (!ctx) throw new Error("useShell outside ShellProvider");
  return ctx;
}
