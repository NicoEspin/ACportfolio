// components/Navbar.tsx
"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { NavMenu } from "./NavMenu";

type TabItem = { href: string; label: string };
type Position = { left: number; width: number; opacity: number };

export type NavbarProps = {
  items?: TabItem[];
  variant?: "glass" | "solid" | "transparent";
  top?: number;
  className?: string;
};

const DEFAULT_ITEMS: TabItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/projects", label: "Portfolio" },
  { href: "/contact", label: "Contacto" },
];

export const Navbar: React.FC<NavbarProps> = ({
  items = DEFAULT_ITEMS,
  variant = "transparent",
  top = 0,
  className = "",
}) => {
  return (
    <>
      {/* NavMenu para móvil */}
      <NavMenu items={items} />

      {/* Navbar original para desktop */}
      <div 
        className={`hidden md:flex sticky z-50 justify-center ${className}`}
        style={{ 
          top: `${top}px`,
          background: 'none',
          backgroundColor: 'transparent',
          backgroundImage: 'none'
        }}
      >
        <SlideTabs items={items} variant={variant} />
      </div>
    </>
  );
};

const SlideTabs: React.FC<{ items: TabItem[]; variant: string }> = ({
  items,
  variant,
}) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  // Solo aplicar background si NO es transparent
  const bgClass = variant === "transparent" ? "" : 
    variant === "glass" ? "bg-black/30 backdrop-blur-xl border border-white/10" :
    "bg-neutral-900 border border-white/10";

  const transparentStyles = variant === "transparent" ? {
    background: 'none',
    backgroundColor: 'transparent',
    border: 'none'
  } : {};

  return (
    <ul
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      className={`relative flex w-fit max-w-md rounded-full px-2 py-2 items-center justify-between ${bgClass}`}
      style={transparentStyles}
      role="tablist"
      aria-label="Navigation"
    >
      {/* Logo */}
      <li className="flex items-center px-2">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.webp"
            alt="Logo"
            width={32}
            height={32}
            className="h-10 w-auto"
            priority
          />
        </Link>
      </li>

      {/* Navigation Links */}
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
    if (!isAnchor) return;
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
      className="relative z-10 block cursor-pointer px-3 py-2 text-xs uppercase text-white md:px-5 md:py-3 md:text-sm font-medium transition-colors hover:text-white/80"
      role="tab"
      aria-controls={isAnchor ? href.slice(1) : undefined}
    >
      <Link href={href} scroll={false} onClick={handleClick}>
        {children}
      </Link>
    </li>
  );
};

const Cursor: React.FC<{ position: Position }> = ({ position }) => (
  <motion.li
    animate={{ ...position }}
    className="absolute z-0 h-8 rounded-full bg-purple-500/20 md:h-10"
    aria-hidden="true"
  />
);