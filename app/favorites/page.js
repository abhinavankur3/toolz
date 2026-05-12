"use client";
import Link from "next/link";
import { Icons } from "@/components/icons";
import { TOOLS } from "@/components/tools";
import { useShell } from "@/components/shell-context";

export default function FavoritesPage() {
  const { favs } = useShell();
  const favTools = TOOLS.filter((t) => favs.includes(t.id));

  return (
    <>
      <div className="page-head">
        <h1>Favorites</h1>
        <p>Tools you&apos;ve pinned. Tap the star on any tool to add it here.</p>
      </div>
      {favTools.length === 0 ? (
        <div className="empty">No favorites yet. Tap the star on a tool to pin it.</div>
      ) : (
        <div className="tool-grid">
          {favTools.map((t) => {
            const Icon = Icons[t.icon];
            return (
              <Link key={t.id} href={t.href} className="tool-card">
                <button className="star" data-on={1} type="button" tabIndex={-1}>
                  <Icons.star size={14} filled />
                </button>
                <div className="ico-box">{Icon ? <Icon size={16} /> : null}</div>
                <div className="name">{t.name}</div>
                <div className="desc">{t.desc}</div>
              </Link>
            );
          })}
        </div>
      )}
    </>
  );
}
