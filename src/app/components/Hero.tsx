"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="min-h-screen bg-[#1E1E1E] text-white relative overflow-hidden">
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
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full">
                  Ver proyectos
                </button>
              </Link>
              <button className="mb-10 border-2 border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white font-semibold py-3 px-8 rounded-full transition-all duration-300">
                Contactar
              </button>
            </div>
          </div>

          {/* Right Content - Image with Premium Backglow */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative">
              {/* Pure Backglow Effect - Contained to Image Area */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[600px] z-[-1]"
                animate={{ 
                  scale: [1.0, 1.2, 1.0],
                  opacity: [0.7, 0.9, 0.7]
                }}
                transition={{ 
                  duration: 8, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                {/* Primary Dynamic Glow */}
                <motion.div
                  className="absolute top-16 left-16 w-80 h-80 bg-gradient-to-br from-purple-500/60 via-pink-500/40 to-cyan-500/20 rounded-full blur-3xl"
                  animate={{ 
                    x: [0, 20, -15, 0],
                    y: [0, -25, 10, 0],
                    scale: [1, 1.2, 0.9, 1]
                  }}
                  transition={{ 
                    duration: 12, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />

                {/* Secondary Color Layer */}
                <motion.div
                  className="absolute top-20 right-12 w-72 h-72 bg-gradient-to-tl from-pink-400/50 via-purple-500/35 to-indigo-400/25 rounded-full blur-2xl"
                  animate={{ 
                    x: [0, -18, 12, 0],
                    y: [0, 15, -20, 0],
                    scale: [0.8, 1.1, 0.9, 0.8]
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 2
                  }}
                />

                {/* Accent Glow */}
                <motion.div
                  className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-r from-violet-400/40 via-fuchsia-400/30 to-sky-400/20 rounded-full blur-2xl"
                  animate={{ 
                    x: [0, 15, -10, 0],
                    y: [0, -12, 18, 0],
                    scale: [1.1, 0.8, 1.2, 1.1]
                  }}
                  transition={{ 
                    duration: 14, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 4
                  }}
                />

                {/* Floating Accent Orbs */}
                <motion.div
                  className="absolute top-8 right-16 w-20 h-20 bg-gradient-to-br from-pink-300/60 to-violet-400/40 rounded-full blur-xl"
                  animate={{ 
                    x: [0, 25, -15, 0],
                    y: [0, -20, 30, 0],
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{ 
                    duration: 16, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />

                <motion.div
                  className="absolute bottom-12 left-8 w-24 h-24 bg-gradient-to-tr from-cyan-300/50 to-purple-400/35 rounded-full blur-xl"
                  animate={{ 
                    x: [0, -20, 25, 0],
                    y: [0, 15, -25, 0],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ 
                    duration: 18, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 3
                  }}
                />

                {/* Subtle Edge Diffusion */}
                <motion.div
                  className="absolute top-8 left-8 right-8 bottom-8 bg-gradient-radial from-transparent via-purple-500/5 to-pink-500/10 blur-lg rounded-full"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
              </motion.div>

              {/* Image Container with Enhanced Effects */}
              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  duration: 1.2, 
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.2 
                }}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.3, ease: "easeOut" }
                }}
              >
                <Image
                  src="/antto-hero.webp"
                  alt="Anttonella - Diseñadora Gráfica"
                  width={400}
                  height={500}
                  className="w-full h-auto object-cover relative z-10 drop-shadow-[0_35px_35px_rgba(139,92,246,0.3)] hover:drop-shadow-[0_35px_35px_rgba(139,92,246,0.5)] transition-all duration-500"
                  priority
                />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Enhanced Scroll indicator */}
        <motion.div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-20"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-pink-400 rounded-full blur-md opacity-50"></div>
            <ArrowDown className="w-6 h-6 text-pink-400 relative z-10 mb-5" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;