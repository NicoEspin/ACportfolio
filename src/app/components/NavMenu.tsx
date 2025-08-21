// components/NavMenu.tsx
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

type NavItem = { 
  href: string; 
  label: string; 
};

export type NavMenuProps = {
  items?: NavItem[];
  className?: string;
  top?: number;
};

const DEFAULT_ITEMS: NavItem[] = [
  { href: "/", label: "Inicio" },
  { href: "/projects", label: "Portfolio" },
  { href: "/contact", label: "Contacto" },
];

export const NavMenu: React.FC<NavMenuProps> = ({
  items = DEFAULT_ITEMS,
  className = "",
  top = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Efecto para bloquear/desbloquear el scroll del body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.height = '100vh';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    }

    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.height = 'auto';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    const isAnchor = href.startsWith("#");
    
    if (isAnchor) {
      const id = href.slice(1);
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }
    
    setIsOpen(false);
  };

  return (
    <div 
      className={`sticky top-0 z-50 md:hidden ${className}`}
      style={{ 
        top: `${top}px`,
        background: 'none',
        backgroundColor: 'transparent',
        backgroundImage: 'none'
      }}
    >
      <div className="relative flex justify-end">
        {/* Botón del menú */}
        <motion.button
          onClick={toggleMenu}
          className="m-4 p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-colors relative z-[70]"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </motion.div>
        </motion.button>

        {/* Overlay del menú - ahora es hermano del botón */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ 
                clipPath: "circle(0px at calc(100% - 48px) 48px)" 
              }}
              animate={{ 
                clipPath: "circle(100vh at calc(100% - 48px) 80px)" 
              }}
              exit={{ 
                clipPath: "circle(0px at calc(100% - 48px) 48px)" 
              }}
              transition={{ 
                duration: 0.5, 
                ease: [0.4, 0, 0.2, 1] 
              }}
              className="absolute top-0 right-0 bg-[#1E1E1E] z-[60] overflow-hidden"
              style={{ 
                width: '100vw',
                height: '100vh',
                touchAction: 'none',
                background: "radial-gradient(125% 125% at 50% 10%, #000000 40%, #0d1a36 100%)"
              }}
              onClick={(e) => {
                if (e.target === e.currentTarget) {
                  setIsOpen(false);
                }
              }}
            >
              {/* Contenedor centrado para los nav items */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.nav
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ 
                    delay: 0.2, 
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  className="flex flex-col items-center justify-center space-y-8 z-[65]"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Logo dentro del menú */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ 
                      delay: 0.2,
                      duration: 0.4,
                      ease: "easeOut"
                    }}
                    className="relative z-[66] mb-4"
                  >
                    <Link
                      href="/"
                      onClick={() => handleNavClick("/")}
                      className="flex items-center"
                    >
                      <Image
                        src="/logo.webp"
                        alt="Logo"
                        width={48}
                        height={48}
                        className="h-20 w-auto"
                        priority
                      />
                    </Link>
                  </motion.div>

                  {items.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ 
                        delay: 0.3 + index * 0.1,
                        duration: 0.4,
                        ease: "easeOut"
                      }}
                      className="relative z-[66]"
                    >
                      <Link
                        href={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className="text-white text-2xl md:text-3xl font-medium hover:text-white/80 transition-colors duration-300 block py-2 px-4"
                        style={{ 
                          color: '#ffffff',
                          textDecoration: 'none',
                          display: 'block'
                        }}
                      >
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="block"
                        >
                          {item.label}
                        </motion.span>
                      </Link>
                    </motion.div>
                  ))}
                </motion.nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};