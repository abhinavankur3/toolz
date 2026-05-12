"use client";
import { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { TOOLS, CATEGORIES } from "@/components/tools";
import { useShell } from "@/components/shell-context";

export default function Home() {
  const { query, setQuery, favs, recent } = useShell();
  const router = useRouter();

  const filtered = useMemo(() => {
    if (!query) return TOOLS;
    const q = query.toLowerCase();
    return TOOLS.filter(
      (t) => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
    );
  }, [query]);

  const recentTools = recent
    .map((id) => TOOLS.find((t) => t.id === id))
    .filter(Boolean)
    .slice(0, 5);

  const grouped = {};
  filtered.forEach((t) => {
    (grouped[t.category] = grouped[t.category] || []).push(t);
  });

  const greet = (() => {
    const h = new Date().getHours();
    if (h < 5) return "Working late";
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <>
      <div className="home-hero">
        <div className="eyebrow"><span className="dot"></span>{greet}</div>
        <h1>A small <em>workshop</em> of focused IT tools.</h1>
        <p>
          Everything below runs entirely in your browser. No accounts, no servers, no tracking.
          Just the bits you reach for when you&apos;re building.
        </p>
        <div className="home-search">
          <Icons.search size={16} />
          <input
            placeholder='What do you need to do? Try "base64", "regex", "color"…'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && filtered.length) router.push(filtered[0].href);
            }}
          />
          <span className="kbd">↵</span>
        </div>
      </div>

      {recentTools.length > 0 && !query && (
        <>
          <div className="section-h">
            <h2>Recent</h2>
            <span className="meta">{recentTools.length} tool{recentTools.length !== 1 ? "s" : ""}</span>
          </div>
          <div className="recent-row">
            {recentTools.map((t) => {
              const Icon = Icons[t.icon];
              return (
                <Link key={t.id} href={t.href} className="recent-card">
                  <div className="ico-box">{Icon ? <Icon size={14} /> : null}</div>
                  <div className="col" style={{ gap: 0 }}>
                    <div className="name">{t.name}</div>
                    <div className="ago">last used recently</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </>
      )}

      {Object.entries(grouped).map(([cat, tools]) => (
        <div key={cat}>
          <div className="section-h">
            <h2>{CATEGORIES[cat] || cat}</h2>
            <span className="meta">{tools.length}</span>
          </div>
          <div className="tool-grid">
            {tools.map((t) => {
              const Icon = Icons[t.icon];
              const isFav = favs.includes(t.id);
              return (
                <Link key={t.id} href={t.href} className="tool-card">
                  <button className="star" data-on={isFav ? 1 : 0} type="button" tabIndex={-1}>
                    <Icons.star size={14} filled={isFav} />
                  </button>
                  <div className="ico-box">{Icon ? <Icon size={16} /> : null}</div>
                  <div className="name">{t.name}</div>
                  <div className="desc">{t.desc}</div>
                </Link>
              );
            })}
          </div>
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="empty" style={{ marginTop: 32 }}>
          Nothing matches &ldquo;{query}&rdquo;. Try a different search.
        </div>
      )}
    </>
  );
}
