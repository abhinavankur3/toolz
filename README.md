# toolz

A small workshop of fast, focused IT utilities that run entirely in your browser.
No accounts, no servers, no tracking.

## Tools

**Generators** — UUID, Password (with strength meter), Lorem Ipsum, QR Code, Data Faker.

**Format** — JSON formatter, Markdown editor, Regex tester, Diff viewer, CSV ↔ JSON, YAML ↔ JSON, HTML ↔ Markdown, Case converter, Word counter.

**Encode** — Base64, URL encoder, Hash (SHA-1/256/384/512), JWT decoder, HTML entities, Number base, Cookie parser.

**Data** — Color converter, Palette + WCAG contrast, Timestamp converter, Analog clock with timezones, Cron expression parser, IP/CIDR calculator, HTTP status codes, User-Agent parser, Image compressor.

## Stack

- Next.js 15 App Router
- React 18
- Plain CSS with OKLCH design tokens
- Geist + Instrument Serif (Google Fonts)

Tools that need crypto use `crypto.subtle` (WebCrypto). The image compressor uses `<canvas>` + `toBlob()`. QR generation uses [`qrcode-generator`](https://www.npmjs.com/package/qrcode-generator). Everything runs client-side.

## Develop

```bash
npm install
npm run dev
```

Open http://localhost:3000.

```bash
npm run build   # static export-ready
```

All routes are statically prerendered.

## Layout

- `app/` — one folder per tool, each with `page.js` (client component) and `layout.js` (metadata).
- `components/shell.js` — sidebar, mobile drawer, tabbar, topbar, toast host.
- `components/shell-context.js` — favorites, recents, theme, query state. Persisted to `localStorage`.
- `components/tools.js` — central registry.
- `components/icons.js` — inline SVG icons.

## Keyboard

- `⌘K` / `Ctrl K` — focus the sidebar search.
- `Esc` — blur active input or close the mobile drawer.

## License

MIT.
