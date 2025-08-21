"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Eye, ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  slogan: string;
  images: string[];
}

const ProjectSection = () => {
  // Datos de los proyectos destacados
  const featuredProjects: Project[] = [
    {
      id: "vezla",
      name: "Vezla",
      category: "branding",
      description:
        "Vezla es una marca de zapatillas urbanas que combina estilo, comodidad y personalidad. El desarrollo de su identidad visual se centró en transmitir dinamismo y autenticidad. El logotipo, de diseño personalizado, representa fluidez y actitud juvenil. Se aplicó la marca en distintos soportes, desde indumentaria hasta piezas gráficas, logrando una imagen sólida y coherente.",
      slogan: "Identidad para una marca en movimiento",
      images: [
        "/projects/branding/vezla/vezla-01.webp",
        "/projects/branding/vezla/vezla-02.webp",
        "/projects/branding/vezla/vezla-03.webp",
        "/projects/branding/vezla/vezla-04.webp",
        "/projects/branding/vezla/vezla-05.webp",
      ],
    },
    {
      id: "natutreats",
      name: "NatuTreats",
      category: "Social Media Design",
      description:
        "Diseñé una serie de flyers en formato carrusel para redes sociales, pensados para una panadería especializada en productos naturales para mascotas. El objetivo fue crear piezas gráficas que captaran la atención de inmediato, apelando a la ternura animal y a la conexión emocional con sus cuidadores. A través de colores cálidos, ilustraciones amigables y una composición dinámica, busqué transmitir la visión, misión y valores de la marca: el amor por los animales, el compromiso con su bienestar y la calidad artesanal en cada producto.",
      slogan: "Delicias que despiertan colitas felices.",
      images: [
        "/projects/redes/natu/natu-01.webp",
        "/projects/redes/natu/natu-02.webp",
        "/projects/redes/natu/natu-03.webp",
        "/projects/redes/natu/natu-04.webp",
      ],
    },
    {
      id: "branca",
      name: "Branca",
      category: "advertising design",
      description:
        "Participé en un concurso donde la propuesta era crear una publicidad para Fernet Branca sin mostrar la marca ni nombrarla directamente. El desafío fue transmitir la identidad y espíritu del fernet de manera sutil y creativa, usando referencias visuales que evocan su esencia. El diseño busca conectar con el público a través de símbolos y elementos que representan la experiencia única que ofrece la bebida, dejando que la imagen hable por sí misma.",
      slogan: "Arte Único.",
      images: [
        "/projects/publicitario/branca/branca-01.webp",
        "/projects/publicitario/branca/branca-02.webp",
        "/projects/publicitario/branca/branca-03.webp",
      ],
    },
    {
      id: "madre-de-la-patria-2",
      name: "Madre de la patria 2",
      category: "Editorial Design",
      description:
        "En este proyecto de diseño editorial, creé dos propuestas de portada para el libro Madre de la Patria de Mirta Fachini, una obra que honra la vida y el sacrificio de María Remedios del Valle. Mi objetivo fue transmitir la fuerza, el valor y la sensibilidad de esta mujer emblemática, utilizando un lenguaje visual que invita a la reflexión y al reconocimiento de su legado histórico y humano. Cada diseño busca emocionar y conectar con el lector desde lo más profundo.",
      slogan: "Portadas que honran historias de valor y coraje.",
      images: [
        "/projects/editorial/patriav2/patriav2-01.webp",
        "/projects/editorial/patriav2/patriav2-02.webp",
      ],
    },
  ];

  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Función para ver todos los proyectos
  const handleViewAllProjects = () => {
    // Implementar navegación a página de proyectos
    console.log("Navigating to all projects");
  };

  return (
    <section className="relative bg-[#0C0824] text-white overflow-hidden py-16 sm:py-20 lg:py-24">
      {/* Gradient overlays suaves para difuminar arriba y abajo */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#1E1E1E] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#1E1E1E] to-transparent pointer-events-none z-10" />

      {/* Animated Background Elements */}
      <motion.div
        className="absolute w-60 h-60 bg-purple-500 rounded-full blur-3xl opacity-20"
        style={{ top: "10%", right: "5%" }}
        animate={{ y: [0, -30, 0], x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-15"
        style={{ bottom: "20%", left: "5%" }}
        animate={{ y: [0, 25, 0], x: [0, -15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <motion.div
            className="inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-purple-400/30 text-purple-400 text-sm font-medium mb-6 backdrop-blur-sm">
              Portfolio
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-4l   text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Mis{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Proyectos
            </span>
          </motion.h2>
        </div>

        {/* Projects Bento Grid - Layout exacto de la captura */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-8 gap-4 lg:gap-6 mb-12"
          style={{ gridTemplateRows: "auto auto" }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Primera fila */}
          {/* Vezla - Ocupa 5 columnas */}
          <Link href={`/projects/${featuredProjects[0].id}`} className="md:col-span-5">
            <motion.div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-600/20 to-yellow-800/40 border border-gray-700/50 hover:border-purple-400/50 transition-all duration-500 cursor-pointer min-h-[280px] lg:min-h-[320px] w-full h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <img
                  src={featuredProjects[0].images[0]}
                  alt={featuredProjects[0].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-md text-white text-sm font-medium">
                    Branding
                  </span>
                </div>
                <div className="mb-2">
                  <p className="text-white/80 text-sm">Creación de identidad</p>
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold text-white">
                  Vezla
                </h3>
              </div>
            </motion.div>
          </Link>

          {/* NatuTreats - Ocupa 3 columnas */}
          <Link href={`/projects/${featuredProjects[1].id}`} className="md:col-span-3">
            <motion.div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-yellow-400/30 to-orange-600/40 border border-gray-700/50 hover:border-purple-400/50 transition-all duration-500 cursor-pointer min-h-[280px] lg:min-h-[320px] w-full h-full"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ scale: 1.03, y: -3 }}
            >
              <div className="absolute inset-0">
                <img
                  src={featuredProjects[1].images[0]}
                  alt={featuredProjects[1].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              </div>

              <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-between">
                <div className="flex justify-end"></div>

                <div>
                  <div className="mb-2">
                    <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-md text-white text-sm font-medium">
                      Diseños
                    </span>
                  </div>
                  <div className="mb-2">
                    <p className="text-white/80 text-sm">Redes sociales</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Segunda fila */}
          {/* Branca - Ocupa 4 columnas */}
          <Link href={`/projects/${featuredProjects[2].id}`} className="md:col-span-4">
            <motion.div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-800/30 to-cyan-900/40 border border-gray-700/50 hover:border-purple-400/50 transition-all duration-500 cursor-pointer min-h-[280px] lg:min-h-[320px] w-full h-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.03, y: -3 }}
            >
              <div className="absolute inset-0">
                <img
                  src={featuredProjects[2].images[0]}
                  alt={featuredProjects[2].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              </div>

              <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-end">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-md text-white text-sm font-medium">
                    Diseños Publicitarios
                  </span>
                </div>
                <div className="mb-2">
                  <p className="text-white/80 text-sm">Anuncios</p>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Madre de la Patria - Ocupa 4 columnas */}
          <Link href={`/projects/${featuredProjects[3].id}`} className="md:col-span-4">
            <motion.div
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-600/30 to-slate-800/40 border border-gray-700/50 hover:border-purple-400/50 transition-all duration-500 cursor-pointer min-h-[280px] lg:min-h-[320px] w-full h-full"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ scale: 1.03, y: -3 }}
            >
              <div className="absolute inset-0">
                <img
                  src={featuredProjects[3].images[0]}
                  alt={featuredProjects[3].name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
              </div>

              <div className="absolute inset-0 p-4 lg:p-6 flex flex-col justify-end">
                <div className="mb-3">
                  <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-md text-white text-sm font-medium">
                    Editorial
                  </span>
                </div>
                <div className="mb-2">
                  <p className="text-white/80 text-sm">Revistas, Libros</p>
                </div>
              </div>
            </motion.div>
          </Link>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <div className="inline-block p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-400/20 backdrop-blur-sm">
            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
              ¿Te gustaría explorar mis Proyectos?
            </h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Cada proyecto es una oportunidad única de crear algo
              extraordinario.
            </p>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-semibold transition-all duration-300 transform hover:scale-105"
            >
              <span>Ver más</span>
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectSection;