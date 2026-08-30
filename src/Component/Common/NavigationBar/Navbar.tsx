"use client";

import type { CSSProperties, ReactNode } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./navbar.module.css";

interface NavBarProps { to: string; linkName: string; }

export default function Navbar({ links, hasDrawer, drawer, direction = "row", activeStyle }: {
  readonly links: NavBarProps[];
  readonly hasDrawer?: boolean;
  readonly drawer?: ReactNode;
  readonly direction?: "row" | "column";
  readonly activeStyle?: CSSProperties;
}) {
  const currentPath = usePathname();

  if (direction === "column") {
    return (
      <nav className={styles.column} aria-label="보조 메뉴">
        {links.map((link) => <Link href={link.to} key={link.linkName}>{link.linkName}</Link>)}
        {hasDrawer && drawer}
      </nav>
    );
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav} aria-label="주요 메뉴">
        <Link className={styles.brand} href="/" aria-label="HJ Devlog 홈">
          <span>HJ</span> Devlog
        </Link>
        <div className={styles.links}>
          {links.map((link) => {
            const active = link.to === currentPath || (link.to === "/" && currentPath?.startsWith("/blog"));
            return (
              <Link className={active ? styles.active : undefined} style={active ? activeStyle : undefined} aria-current={active ? "page" : undefined} href={link.to} key={link.linkName}>
                {link.linkName === "Blog" ? "글" : "방명록"}
              </Link>
            );
          })}
        </div>
        {hasDrawer && <div className={styles.actions}>{drawer}</div>}
      </nav>
    </header>
  );
}
