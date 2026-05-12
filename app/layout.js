import "./globals.css";
import { ShellProvider } from "@/components/shell-context";
import { Shell } from "@/components/shell";

export const metadata = {
  metadataBase: new URL("https://toolz.abhinavankur.com"),
  title: {
    default: "toolz: a little IT-tools workshop",
    template: "%s · toolz",
  },
  description:
    "A small workshop of fast, focused IT utilities that run entirely in your browser.",
  applicationName: "toolz",
  authors: [{ name: "Abhinav Ankur" }],
  openGraph: {
    title: "toolz",
    description: "Fast, focused IT utilities. Local-first, no tracking.",
    type: "website",
  },
  twitter: { card: "summary" },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1916" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const themeScript = `
(function(){try{var t=localStorage.getItem("toolz.theme");if(t)t=JSON.parse(t);if(t!=="light"&&t!=="dark")t=null;if(!t)t=matchMedia&&matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";document.documentElement.setAttribute("data-theme",t);}catch(e){}})();
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        <ShellProvider>
          <Shell>{children}</Shell>
        </ShellProvider>
      </body>
    </html>
  );
}
