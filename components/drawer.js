"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const submenus = [
  { name: "UUID Generator", href: "/uuid" },
  { name: "JSON Formatter", href: "/json" },
  { name: "Markdown Editor", href: "/markdown" },
  { name: "QR Code Generator", href: "/qrcode" },
];
export default function Drawer({ children }) {
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState(pathname);

  return (
    <div className="h-screen flex">
      <div className="menu bg-base-300 text-base-content min-h-full w-60 p-4">
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
