"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const submenus = [
  { name: "UUID Generator", href: "/uuid" },
  { name: "Password Generator", href: "/password-generator" },
  { name: "JSON Formatter", href: "/json" },
  { name: "Markdown Editor", href: "/markdown" },
  { name: "QR Code Generator", href: "/qrcode" },
  { name: "Analog Clock", href: "/analogClock" },
];
export default function Drawer({ children }) {
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState(pathname);

  return (
    <div className="h-screen flex flex-col lg:flex-row">
      <div className="menu bg-base-300 text-base-content lg:min-h-full min-w-60 p-4">
        {submenus.map((submenu) => (
          <Link
            key={submenu.name}
            href={submenu.href}
            onClick={() => setCurrentMenu(submenu.href)}
          >
            <div
              className={`mb-2 p-2 rounded cursor-pointer ${
                currentMenu === submenu.href
                  ? "bg-base-100 text-black"
                  : "hover:bg-base-100"
              }`}
            >
              {submenu.name}
            </div>
          </Link>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}
