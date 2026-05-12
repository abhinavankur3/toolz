const I = ({ d, children, size = 16, fill, stroke = "currentColor", strokeWidth = 1.5, filled, ...rest }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill={fill || "none"}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    {d ? <path d={d} /> : children}
  </svg>
);

export const Icons = {
  uuid: (p) => (
    <I {...p}>
      <circle cx="7" cy="7" r="2.5" />
      <circle cx="17" cy="7" r="2.5" />
      <circle cx="7" cy="17" r="2.5" />
      <circle cx="17" cy="17" r="2.5" />
    </I>
  ),
  password: (p) => <I {...p} d="M7 11V8a5 5 0 1 1 10 0v3M5 11h14v9H5z" />,
  json: (p) => (
    <I
      {...p}
      d="M8 4c-2 0-3 1-3 3v2c0 1.5-.7 3-2 3 1.3 0 2 1.5 2 3v2c0 2 1 3 3 3M16 4c2 0 3 1 3 3v2c0 1.5.7 3 2 3-1.3 0-2 1.5-2 3v2c0 2-1 3-3 3"
    />
  ),
  markdown: (p) => (
    <I {...p}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 14V10l2 2 2-2v4M14 10v4M14 14l2-2M14 14l-2-2" />
    </I>
  ),
  qr: (p) => (
    <I {...p}>
      <rect x="4" y="4" width="6" height="6" />
      <rect x="14" y="4" width="6" height="6" />
      <rect x="4" y="14" width="6" height="6" />
      <path d="M14 14h2v2M18 14v6M14 18h2v2" />
    </I>
  ),
  clock: (p) => (
    <I {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </I>
  ),
  base64: (p) => <I {...p} d="M9 4 5 8l4 4M15 12l4 4-4 4M14 4l-4 16" />,
  url: (p) => (
    <I
      {...p}
      d="M10 14a4 4 0 0 0 5.7 0l2.8-2.8a4 4 0 1 0-5.7-5.7L11.5 7M14 10a4 4 0 0 0-5.7 0l-2.8 2.8a4 4 0 1 0 5.7 5.7L12.5 17"
    />
  ),
  hash: (p) => <I {...p} d="M9 4 7 20M17 4l-2 16M4 9h16M3 15h16" />,
  lorem: (p) => <I {...p} d="M4 6h16M4 10h12M4 14h16M4 18h10" />,
  color: (p) => (
    <I {...p}>
      <path d="M12 3a9 9 0 1 0 0 18c1.5 0 2.5-1.2 2.5-2.5 0-.7-.3-1.3-.5-1.8-.3-.5-.5-1-.5-1.7 0-1.4 1-2.5 2.5-2.5h2c1.7 0 3-1.3 3-3a9 9 0 0 0-9-6.5z" />
      <circle cx="7.5" cy="11" r="1" fill="currentColor" />
      <circle cx="11" cy="7" r="1" fill="currentColor" />
      <circle cx="15" cy="7.5" r="1" fill="currentColor" />
    </I>
  ),
  regex: (p) => (
    <I {...p}>
      <path d="M14 4v8M10.5 6l7 4M10.5 10l7-4" />
      <circle cx="6" cy="18" r="2" />
    </I>
  ),
  jwt: (p) => (
    <I
      {...p}
      d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"
    />
  ),
  time: (p) => (
    <I {...p}>
      <path d="M3 12a9 9 0 1 0 9-9" />
      <path d="M3 4v5h5M12 7v5l3 2" />
    </I>
  ),
  search: (p) => (
    <I {...p}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </I>
  ),
  copy: (p) => (
    <I {...p}>
      <rect x="9" y="9" width="11" height="11" rx="2" />
      <path d="M5 15V6a2 2 0 0 1 2-2h9" />
    </I>
  ),
  check: (p) => <I {...p} d="m5 12 5 5 9-11" />,
  star: (p) => (
    <I
      {...p}
      d="M12 4l2.5 5.2 5.7.8-4.1 4 1 5.7L12 17l-5.1 2.7 1-5.7L3.8 10l5.7-.8z"
      fill={p?.filled ? "currentColor" : "none"}
    />
  ),
  sun: (p) => (
    <I {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </I>
  ),
  moon: (p) => <I {...p} d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />,
  refresh: (p) => (
    <I {...p}>
      <path d="M3 12a9 9 0 0 1 15.5-6.4L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.5 6.4L3 16" />
      <path d="M3 21v-5h5" />
    </I>
  ),
  download: (p) => <I {...p} d="M12 4v12m0 0-4-4m4 4 4-4M4 20h16" />,
  x: (p) => <I {...p} d="M6 6l12 12M18 6L6 18" />,
  swap: (p) => <I {...p} d="M7 4v16M7 20l-3-3M7 20l3-3M17 20V4M17 4l-3 3M17 4l3 3" />,
  sliders: (p) => <I {...p} d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h14M18 18h2" />,
  home: (p) => (
    <I
      {...p}
      d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-7h-6v7H4a1 1 0 0 1-1-1z"
    />
  ),
  arrowL: (p) => <I {...p} d="M19 12H5M11 6l-6 6 6 6" />,
  arrowR: (p) => <I {...p} d="M5 12h14M13 6l6 6-6 6" />,
  chevron: (p) => <I {...p} d="m9 6 6 6-6 6" />,
  text: (p) => <I {...p} d="M4 6h16M4 12h12M4 18h16" />,
  diff: (p) => (
    <I {...p}>
      <path d="M4 4v12a2 2 0 0 0 2 2h6" />
      <path d="M20 20V8a2 2 0 0 0-2-2h-6" />
      <path d="M8 4 4 8l4 4M16 12l4 4-4 4" />
    </I>
  ),
  csv: (p) => (
    <I {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 4v16M15 4v16M3 12h18" />
    </I>
  ),
  yaml: (p) => <I {...p} d="M4 4h6l2 4 2-4h6M12 8v12M8 14h8" />,
  cron: (p) => (
    <I {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2M3 12h2M19 12h2" />
    </I>
  ),
  numberBase: (p) => <I {...p} d="M5 4v16M19 4v16M4 9h2M4 15h2M18 9h2M18 15h2M8 4l-3 16M19 4l-3 16" />,
  caseConvert: (p) => <I {...p} d="M3 18 7 6l4 12M4 14h6M14 18l3-9 3 9M15 16h4" />,
  count: (p) => <I {...p} d="M4 6h16M4 12h16M4 18h10M18 16v4M16 18h4" />,
  entity: (p) => <I {...p} d="M9 4 7 20M17 4l-2 16M4 10h16M5 14h16" />,
  ip: (p) => (
    <I {...p}>
      <rect x="3" y="6" width="18" height="12" rx="2" />
      <path d="M7 10h2M7 14h2M11 10h6M11 14h6" />
    </I>
  ),
  http: (p) => (
    <I {...p}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </I>
  ),
  ua: (p) => (
    <I {...p}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21a8 8 0 0 1 16 0" />
    </I>
  ),
  image: (p) => (
    <I {...p}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="m3 17 5-5 4 4 3-3 6 6" />
    </I>
  ),
  palette: (p) => (
    <I {...p}>
      <path d="M12 3a9 9 0 0 0 0 18 2 2 0 0 0 0-4h-1a2 2 0 0 1 0-4h2a4 4 0 0 0 4-4 6 6 0 0 0-6-6z" />
      <circle cx="7.5" cy="11" r="1" fill="currentColor" />
      <circle cx="11" cy="7" r="1" fill="currentColor" />
      <circle cx="15" cy="8" r="1" fill="currentColor" />
    </I>
  ),
  cookie: (p) => (
    <I {...p}>
      <path d="M12 3a9 9 0 1 0 9 9 4 4 0 0 1-4-4 4 4 0 0 1-4-4 1 1 0 0 0-1-1z" />
      <circle cx="8" cy="13" r="1" fill="currentColor" />
      <circle cx="13" cy="16" r="1" fill="currentColor" />
      <circle cx="15" cy="11" r="1" fill="currentColor" />
    </I>
  ),
  faker: (p) => (
    <I {...p}>
      <rect x="3" y="4" width="18" height="14" rx="2" />
      <circle cx="9" cy="11" r="2.5" />
      <path d="M3 18a6 6 0 0 1 12 0M14 8h4M14 12h3" />
    </I>
  ),
};
