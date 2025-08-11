"use client";

import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import TechColumn from "./TechColumn";

// Importar los logos (asegurate de que las rutas sean correctas)
import capcutLogo from "../assets/capcut.svg";
import figmaLogo from "../assets/figma-logo.svg";
import ilustratorLogo from "../assets/ilustrator.svg";
import photoshopLogo from "../assets/photoshop.svg";
import premiereLogo from "../assets/premiere.svg";


const SkillsSection = () => {
  const Technologies = [
    {
      name: "Adobe Illustrator",
      icon: ilustratorLogo,
      description: "Diseño vectorial profesional para logotipos e ilustraciones",
    },
    {
      name: "Adobe Photoshop",
      icon: photoshopLogo,
      description: "Edición y retoque de imágenes digitales",
    },
    {
      name: "Adobe Premiere",
      icon: premiereLogo,
      description: "Edición profesional de video y motion graphics",
    },
    {
      name: "Figma",
      icon: figmaLogo,
      description: "Diseño de interfaces y prototipado colaborativo",
    },
    {
      name: "CapCut",
      icon: capcutLogo,
      description: "Edición de video móvil y contenido para redes sociales",
    },
  ];

  return (
    <section className="relative bg-[#1E1E1E] text-white overflow-hidden px-4 py-20 h-screen">
      {/* Animated Blobs - Similar to other sections */}
      <motion.div
        className="absolute w-60 h-60 bg-purple-500 rounded-full blur-3xl opacity-30"
        style={{ top: "10%", right: "5%" }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20"
        style={{ bottom: "20%", left: "5%" }}
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                Mis{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                  Habilidades
                </span>
              </h2>
              
              <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">
                Combinando creatividad y estrategia para crear soluciones de diseño 
                que impactan
              </p>
            </div>

            {/* Tools/Herramientas Badge */}
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-purple-500/20 border border-purple-400/30 rounded-full px-3 py-1 flex items-center gap-2">
                <Settings size={16} className="text-purple-400" />
                <span className="text-purple-400 text-sm font-medium">Herramientas</span>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                Uso plataformas líderes
              </h3>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                para potenciar
              </h3>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">
                cada{" "}
                <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
                  marca.
                </span>
              </h3>
            </div>

            <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-lg">
              Como diseñadora gráfica, creo piezas visuales que 
              comunican identidad y valor. Uso herramientas líderes 
              para asegurar innovación, calidad y coherencia. Hoy, un 
              diseño profesional es clave para conectar y destacar.
            </p>
          </div>

          {/* Right Content - Infinite Carousel */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="h-[400px] lg:h-[600px] overflow-hidden grid md:grid-cols-2 gap-4
              [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]"
            >
              <TechColumn Technologies={Technologies} />
              <TechColumn
                reverse
                Technologies={Technologies.slice().reverse()}
                className="hidden md:flex"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;