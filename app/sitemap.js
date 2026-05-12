import { TOOLS } from "@/components/tools";

export default function sitemap() {
  const base = "https://toolz.abhinavankur.com";
  const now = new Date();
  const routes = ["/", "/favorites", ...TOOLS.map((t) => t.href)];
  return routes.map((path) => ({
    url: base + path,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
