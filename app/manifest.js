export default function manifest() {
  return {
    name: "toolz",
    short_name: "toolz",
    description: "A small workshop of fast, focused IT utilities that run entirely in your browser.",
    start_url: "/",
    display: "standalone",
    background_color: "#fafaf7",
    theme_color: "#fafaf7",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml", purpose: "any maskable" },
    ],
  };
}
