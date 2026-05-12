export const TOOLS = [
  { id: "uuid", name: "UUID Generator", desc: "Random RFC 4122 identifiers", category: "generators", icon: "uuid", href: "/uuid" },
  { id: "password", name: "Password Generator", desc: "Strong, configurable passwords", category: "generators", icon: "password", href: "/password-generator" },
  { id: "lorem", name: "Lorem Ipsum", desc: "Placeholder filler text", category: "generators", icon: "lorem", href: "/lorem" },
  { id: "qr", name: "QR Code", desc: "Encode text into a QR code", category: "generators", icon: "qr", href: "/qrcode" },
  { id: "faker", name: "Data Faker", desc: "Fake names, emails, phones", category: "generators", icon: "faker", href: "/faker" },

  { id: "json", name: "JSON Formatter", desc: "Pretty-print, minify and validate", category: "format", icon: "json", href: "/json" },
  { id: "markdown", name: "Markdown Editor", desc: "Write and preview Markdown", category: "format", icon: "markdown", href: "/markdown" },
  { id: "regex", name: "Regex Tester", desc: "Test patterns with live highlights", category: "format", icon: "regex", href: "/regex" },
  { id: "diff", name: "Diff Viewer", desc: "Compare two blocks of text", category: "format", icon: "diff", href: "/diff" },
  { id: "csv-json", name: "CSV ↔ JSON", desc: "Convert between CSV and JSON", category: "format", icon: "csv", href: "/csv-json" },
  { id: "yaml-json", name: "YAML ↔ JSON", desc: "Convert between YAML and JSON", category: "format", icon: "yaml", href: "/yaml-json" },
  { id: "html-md", name: "HTML ↔ Markdown", desc: "Convert HTML to Markdown and back", category: "format", icon: "markdown", href: "/html-md" },
  { id: "case", name: "Case Converter", desc: "camel · snake · kebab · slug", category: "format", icon: "caseConvert", href: "/case" },
  { id: "word-count", name: "Word Counter", desc: "Words, characters, reading time", category: "format", icon: "count", href: "/word-count" },

  { id: "base64", name: "Base64", desc: "Encode and decode base64", category: "encode", icon: "base64", href: "/base64" },
  { id: "url", name: "URL Encoder", desc: "Percent-encode URL components", category: "encode", icon: "url", href: "/url" },
  { id: "hash", name: "Hash Generator", desc: "SHA-1, 256, 384, 512", category: "encode", icon: "hash", href: "/hash" },
  { id: "jwt", name: "JWT Decoder", desc: "Inspect a JSON Web Token", category: "encode", icon: "jwt", href: "/jwt" },
  { id: "html-entities", name: "HTML Entities", desc: "Encode/decode HTML entities", category: "encode", icon: "entity", href: "/html-entities" },
  { id: "number-base", name: "Number Base", desc: "bin · oct · dec · hex", category: "encode", icon: "numberBase", href: "/number-base" },
  { id: "cookie", name: "Cookie Parser", desc: "Parse Cookie / Set-Cookie headers", category: "encode", icon: "cookie", href: "/cookie" },

  { id: "color", name: "Color Converter", desc: "HEX · RGB · HSL · OKLCH", category: "data", icon: "color", href: "/color" },
  { id: "palette", name: "Palette + Contrast", desc: "Tints, shades, WCAG ratio", category: "data", icon: "palette", href: "/palette" },
  { id: "timestamp", name: "Timestamp", desc: "Epoch ↔ ISO ↔ human", category: "data", icon: "time", href: "/timestamp" },
  { id: "clock", name: "Analog Clock", desc: "Pleasant clock, with timezones", category: "data", icon: "clock", href: "/analogClock" },
  { id: "cron", name: "Cron Expression", desc: "Humanize cron + next runs", category: "data", icon: "cron", href: "/cron" },
  { id: "ip-cidr", name: "IP / CIDR", desc: "Subnet math, range, mask", category: "data", icon: "ip", href: "/ip-cidr" },
  { id: "http-status", name: "HTTP Status", desc: "Look up HTTP status codes", category: "data", icon: "http", href: "/http-status" },
  { id: "user-agent", name: "User-Agent", desc: "Parse a browser UA string", category: "data", icon: "ua", href: "/user-agent" },
  { id: "image-compress", name: "Image Compressor", desc: "Resize, compress, convert", category: "data", icon: "image", href: "/image-compress" },
];

export const CATEGORIES = {
  generators: "Generators",
  format: "Format",
  encode: "Encode",
  data: "Data",
};
