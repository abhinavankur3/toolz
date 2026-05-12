"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Icons } from "./icons";
import { TOOLS, CATEGORIES } from "./tools";
import { useShell } from "./shell-context";

function SidebarItem({ tool, active }) {
  const { favs, toggleFav } = useShell();
  const Icon = Icons[tool.icon];
  const isFav = favs.includes(tool.id);
  return (
    <Link href={tool.href} className="sb-item" data-active={active ? 1 : 0} title={tool.name}>
      <span className="ico">{Icon ? <Icon size={16} /> : null}</span>
      <span className="lbl">{tool.name}</span>
      <button
        type="button"
        className="star"
        data-on={isFav ? 1 : 0}
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFav(tool.id); }}
        title={isFav ? "Unfavorite" : "Favorite"}
        aria-label={`${isFav ? "Unfavorite" : "Favorite"} ${tool.name}`}
        aria-pressed={isFav}
      >
        <Icons.star size={14} filled={isFav} />
      </button>
    </Link>
  );
}

function Sidebar({ currentId }) {
  const { favs, recent, query, setQuery, theme, setTheme } = useShell();

  const filtered = useMemo(() => {
    if (!query) return null;
    const q = query.toLowerCase();
    return TOOLS.filter(
      (t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q) || t.id.includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const list = filtered || TOOLS;
    const g = {};
    list.forEach((t) => { (g[t.category] = g[t.category] || []).push(t); });
    return g;
  }, [filtered]);

  const favTools = TOOLS.filter((t) => favs.includes(t.id));
  const recentTools = recent.map((id) => TOOLS.find((t) => t.id === id)).filter(Boolean).slice(0, 4);

  return (
    <aside className="sidebar">
      <div className="sb-head">
        <Link href="/" className="wordmark">
          <span>toolz<i>.</i></span>
        </Link>
      </div>
      <div className="sb-search">
        <Icons.search size={14} />
        <input
          placeholder="Search tools…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!query && <span className="kbd" aria-hidden="true">⌘K</span>}
        {query && (
          <button className="icon-btn" type="button" style={{ width: 20, height: 20 }} onClick={() => setQuery("")} aria-label="Clear search">
            <Icons.x size={12} />
          </button>
        )}
      </div>
      <div className="sb-scroll">
        {!filtered && favTools.length > 0 && (
          <div className="sb-group">
            <div className="sb-group-h"><span>Favorites</span><span className="count">{favTools.length}</span></div>
            <div>{favTools.map((t) => <SidebarItem key={t.id} tool={t} active={currentId === t.id} />)}</div>
          </div>
        )}
        {!filtered && recentTools.length > 0 && (
          <div className="sb-group">
            <div className="sb-group-h"><span>Recent</span></div>
            <div>{recentTools.map((t) => <SidebarItem key={"r" + t.id} tool={t} active={currentId === t.id} />)}</div>
          </div>
        )}
        {Object.entries(grouped).map(([cat, tools]) => (
          <div key={cat} className="sb-group">
            <div className="sb-group-h"><span>{CATEGORIES[cat] || cat}</span><span className="count">{tools.length}</span></div>
            <div>{tools.map((t) => <SidebarItem key={t.id} tool={t} active={currentId === t.id} />)}</div>
          </div>
        ))}
        {filtered && filtered.length === 0 && (
          <div className="empty" style={{ margin: "var(--pad-3)" }}>No tools match &quot;{query}&quot;</div>
        )}
      </div>
      <div className="sb-foot">
        <div className="sb-foot-l">
          <span className="dot"></span>
          <span>Local · {TOOLS.length} tools</span>
        </div>
        <button
          className="icon-btn"
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title="Toggle theme"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {theme === "dark" ? <Icons.sun size={15} /> : <Icons.moon size={15} />}
        </button>
      </div>
    </aside>
  );
}

function Topbar({ tool }) {
  const { favs, toggleFav } = useShell();
  const router = useRouter();
  return (
    <div className="topbar">
      <div className="crumb">
        <button className="icon-btn" type="button" onClick={() => router.push("/")} title="Home" aria-label="Home">
          <Icons.home size={15} />
        </button>
        <span className="sep">/</span>
        {tool ? (
          <>
            <span>{CATEGORIES[tool.category]}</span>
            <span className="sep">/</span>
            <b>{tool.name}</b>
          </>
        ) : (
          <b>Home</b>
        )}
      </div>
      <div className="topbar-r">
        {tool && (
          <button
            className="btn ghost"
            type="button"
            onClick={() => toggleFav(tool.id)}
            title={favs.includes(tool.id) ? "Unfavorite" : "Favorite"}
          >
            <Icons.star size={14} filled={favs.includes(tool.id)} />
            {favs.includes(tool.id) ? "Favorited" : "Favorite"}
          </button>
        )}
      </div>
    </div>
  );
}

function MobileHeader({ onMenu }) {
  const { theme, setTheme } = useShell();
  return (
    <div className="m-head m-only">
      <Link href="/" className="wordmark">
        <span>toolz<i>.</i></span>
      </Link>
      <div className="m-head-actions">
        <button
          className="m-icon-btn"
          type="button"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          title="Toggle theme"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {theme === "dark" ? <Icons.sun size={18} /> : <Icons.moon size={18} />}
        </button>
        <button className="m-icon-btn" type="button" onClick={onMenu} title="All tools" aria-label="Open tool list">
          <Icons.text size={18} />
        </button>
      </div>
    </div>
  );
}

function MobileToolbar({ tool }) {
  const { favs, toggleFav } = useShell();
  const isFav = favs.includes(tool.id);
  return (
    <div className="m-toolbar m-only">
      <Link href="/" className="m-back">
        <Icons.arrowL size={18} />Back
      </Link>
      <div className="ttl">{tool.name}</div>
      <button
        className="m-icon-btn"
        type="button"
        onClick={() => toggleFav(tool.id)}
        title={isFav ? "Unfavorite" : "Favorite"}
        aria-label={`${isFav ? "Unfavorite" : "Favorite"} ${tool.name}`}
        aria-pressed={isFav}
      >
        <Icons.star size={18} filled={isFav} stroke={isFav ? "var(--accent)" : "currentColor"} />
      </button>
    </div>
  );
}

function MobileTabbar({ onOpenDrawer }) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const onFavs = pathname === "/favorites";
  return (
    <nav className="m-tabbar m-only">
      <Link href="/" className="m-tab" data-on={onHome ? 1 : 0}>
        <Icons.home size={20} />Home
      </Link>
      <Link href="/favorites" className="m-tab" data-on={onFavs ? 1 : 0}>
        <Icons.star size={20} />Favorites
      </Link>
      <button type="button" className="m-tab" onClick={onOpenDrawer}>
        <Icons.text size={20} />All
      </button>
    </nav>
  );
}

function MobileDrawer({ open, onClose }) {
  const grouped = {};
  TOOLS.forEach((t) => { (grouped[t.category] = grouped[t.category] || []).push(t); });
  return (
    <div className="m-drawer m-only" data-on={open ? 1 : 0} aria-hidden={!open}>
      <div className="m-toolbar">
        <button className="m-back" type="button" onClick={onClose}>
          <Icons.x size={18} />Close
        </button>
        <div className="ttl">All tools</div>
        <div style={{ width: 36 }} />
      </div>
      <div className="m-list">
        {Object.entries(grouped).map(([cat, tools]) => (
          <div key={cat} className="m-list-group">
            <h3>{CATEGORIES[cat]}</h3>
            {tools.map((t) => {
              const Icon = Icons[t.icon];
              return (
                <Link key={t.id} href={t.href} className="m-list-row" onClick={onClose}>
                  <div className="ico-box">{Icon ? <Icon size={16} /> : null}</div>
                  <div className="lbl">
                    <div className="name">{t.name}</div>
                    <div className="desc">{t.desc}</div>
                  </div>
                  <span className="chev"><Icons.chevron size={14} /></span>
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function ToastHost() {
  const { toasts } = useShell();
  return (
    <div className="toasts" role="status" aria-live="polite" aria-atomic="true">
      {toasts.map((t) => (
        <div key={t.id} className={"toast" + (t.exit ? " exit" : "")}>
          <Icons.check size={14} />
          {t.msg}
        </div>
      ))}
    </div>
  );
}

export function Shell({ children }) {
  const pathname = usePathname();
  const { trackVisit } = useShell();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const tool = useMemo(() => {
    if (!pathname || pathname === "/" || pathname === "/favorites") return null;
    return TOOLS.find((t) => pathname.startsWith(t.href)) || null;
  }, [pathname]);

  useEffect(() => {
    if (tool) trackVisit(tool.id);
  }, [tool, trackVisit]);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        document.querySelector(".sb-search input")?.focus();
      }
      if (e.key === "Escape") {
        if (document.activeElement?.tagName === "INPUT") document.activeElement.blur();
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      <div className="app">
        <Sidebar currentId={tool?.id || null} />
        <main className="main" id="main-content">
          {tool ? (
            <MobileToolbar tool={tool} />
          ) : (
            <MobileHeader onMenu={() => setDrawerOpen(true)} />
          )}
          <Topbar tool={tool} />
          <div className="page">{children}</div>
        </main>
      </div>
      {!tool && <MobileTabbar onOpenDrawer={() => setDrawerOpen(true)} />}
      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <ToastHost />
    </>
  );
}
