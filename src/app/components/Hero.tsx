"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="min-h-screen bg-[#1E1E1E] text-white relative overflow-hidden">
      {/* Background glow aligned to the right */}
      <div
        className="absolute z-0 right-0 hidden md:block overflow-hidden"
        style={{
          top: "-40px",
          width: "862.32px",
          height: "1578px",
          pointerEvents: "none",
          WebkitMaskImage:
            "linear-gradient(to left, black 90%, transparent), linear-gradient(to bottom, black 98%, transparent)",
          WebkitMaskComposite: "destination-in",
          maskImage:
            "linear-gradient(to left, black 90%, transparent), linear-gradient(to bottom, black 98%, transparent)",
          maskComposite: "intersect",
        }}
      >
        <Image
          src="/back-glow.svg"
          alt="Glow"
          fill
          className="object-right-top object-cover"
          priority
        />
      </div>

      {/* Animated Blobs */}
      <motion.div
        className="absolute w-60 h-60 bg-purple-500 rounded-full blur-3xl opacity-30"
        style={{ top: "10%", left: "5%" }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20 hidden sm:block"
        style={{ bottom: "15%", right: "10%" }}
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-40 h-40 bg-purple-300 rounded-full blur-2xl opacity-25 hidden md:block"
        style={{ top: "50%", left: "40%" }}
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="px-4 md:px-15 mx-auto py-8 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[calc(100vh-8rem)]">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            <p className="text-pink-400 text-lg md:text-xl font-light">
              Hola, soy Anttonella
            </p>

            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-tight">
                Diseñadora
              </h1>
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent leading-tight">
                Gráfica
              </h1>
            </div>

            <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl">
              Conecto marcas con personas a través del diseño inteligente.
              Construyo identidades visuales que comunican valores, generan
              confianza y destacan en un entorno competitivo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/projects">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                  Ver proyectos
                </button>
              </Link>
              <button className="border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Contactar
              </button>
            </div>
          </div>

          {/* Right Content - Image */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              <div className="rounded-3xl overflow-hidden relative">
                <Image
                  src="/antto-hero.webp"
                  alt="Anttonella - Diseñadora Gráfica"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 animate-bounce mt-20">
          <ArrowDown className="w-6 h-6 text-pink-400" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
