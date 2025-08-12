// components/Navbar.tsx
"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type TabItem = { href: string; label: string };
type Position = { left: number; width: number; opacity: number };

export type NavbarProps = {
  items?: TabItem[];
  /** 'glass' = fondo translúcido con blur (recomendado), 'solid' = fondo sólido, 'transparent' = sin fondo */
  variant?: "glass" | "solid" | "transparent";
  /** offset desde el top cuando es sticky (por defecto 0) */
  top?: number;
  className?: string;
};

const DEFAULT_ITEMS: TabItem[] = [
  { href: "#hero", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  // Enrutado a otra page:
  { href: "/projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export const Navbar: React.FC<NavbarProps> = ({
  items = DEFAULT_ITEMS,
  variant = "glass",
  top = 0,
  className = "",
}) => {
  const bg =
    variant === "glass"
      ? "bg-black/30 backdrop-blur-xl border border-white/10"
      : variant === "solid"
      ? "bg-neutral-900 border border-white/10"
      : "bg-transparent";

  return (
    <nav
      className={`sticky z-50 w-full flex justify-center ${className}`}
      style={{ top }}
    >
      <SlideTabs items={items} bgClass={bg} />
    </nav>
  );
};

const SlideTabs: React.FC<{ items: TabItem[]; bgClass: string }> = ({
  items,
  bgClass,
}) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      className={`relative mx-auto my-4 flex w-fit rounded-full px-2 ${bgClass}`}
      role="tablist"
      aria-label="Sections"
    >
      {items.map((item) => (
        <Tab key={item.href} href={item.href} setPosition={setPosition}>
          {item.label}
        </Tab>
      ))}
      <Cursor position={position} />
    </ul>
  );
};

type TabProps = {
  href: string;
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<Position>>;
};

const Tab: React.FC<TabProps> = ({ href, children, setPosition }) => {
  const ref = useRef<HTMLLIElement>(null);

  const isAnchor = href.startsWith("#");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!isAnchor) return; // deja que Next.js navegue normalmente
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current || !ref.current.offsetParent) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative z-10 block cursor-pointer px-2 py-1.5 text-xs uppercase text-white md:px-5 md:py-3 md:text-base"
      role="tab"
      aria-controls={isAnchor ? href.slice(1) : undefined}
    >
      <Link href={href} scroll={false} onClick={handleClick} className="py-3">
        {children}
      </Link>
    </li>
  );
};

const Cursor: React.FC<{ position: Position }> = ({ position }) => (
  <motion.li
    animate={{ ...position }}
    className="absolute z-0 h-7 rounded-full bg-white/10 md:h-12"
    aria-hidden="true"
  />
);
