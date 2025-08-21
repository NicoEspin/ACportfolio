"use client";

import { motion } from "framer-motion";
import { BookOpen, Instagram, Megaphone, Palette } from "lucide-react";

const services = [
  {
    icon: <Palette size={32} className="text-purple-400" />,
    title: "Branding",
    description:
      "Desarrollo de marcas completas, desde el concepto hasta la implementación final, logos, paletas, sistemas gráficos, manuales de marca.",
  },
  {
    icon: <BookOpen size={32} className="text-purple-400" />,
    title: "Diseño Editorial",
    description:
      "Creación de materiales impreso o digital. Revistas, libros, catálogos, diarios, etc.",
  },
  {
    icon: <Instagram size={32} className="text-purple-400" />,
    title: "Diseño para redes sociales",
    description:
      "Creación de contenido visual adaptado a plataformas como Instagram, Facebook, TikTok, etc.",
  },
  {
    icon: <Megaphone size={32} className="text-purple-400" />,
    title: "Diseño publicitario",
    description:
      "Desarrollo de piezas gráficas. Incluye flyers, banners, posters, avisos digitales o impresos, y campañas gráficas, etc.",
  },
];

const Services = () => {
  // Constantes para WhatsApp (igual que en Footer)
  const whatsappMessage = encodeURIComponent(
    "Hola Antto, te contacto porque me gustaron tus trabajos y me gustaría que creemos un proyecto juntos"
  );
  const whatsappNumber = "5493541217439";

  return (
    <section className="relative bg-[#1E1E1E] text-white overflow-hidden px-4 py-20 z-10">
      {/* Blobs animados */}
      <motion.div
        className="absolute w-60 h-60 bg-purple-500 rounded-full blur-3xl opacity-30"
        style={{ top: "20%", left: "5%" }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20  sm:block"
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

      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
          Servicios{" "}
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
            Especializados
          </span>
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12 text-base md:text-lg">
          Ofrezco soluciones completas de diseño que abarcan desde la
          conceptualización hasta la implementación final.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16 px-2">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#2A2A2A] p-6 rounded-2xl border border-[#3a3a3a] transition-all duration-300 text-left
    shadow-[inset_0_0.25px_0_#FFFFFF80,_0_-1px_20px_#BB9BFF26]
    hover:shadow-[inset_0_0.25px_0_#FFFFFF80,_0_-2px_24px_#BB9BFF33]"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400 text-sm">{service.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative inline-block rounded-2xl p-[2px]
    bg-gradient-to-br from-[#8103FF] to-[#E748D3]
    shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
        >
          <div className="bg-[#1E1E1E]/60 backdrop-blur-[40px] rounded-2xl px-6 py-8 text-center w-full sm:w-[500px]">
            <h3 className="text-xl font-semibold mb-2 text-white">
              ¿Trabajamos juntos?
            </h3>
            <p className="text-gray-300 mb-6 text-sm">
              Siempre abierta a proyectos visuales que impliquen creatividad y
              estrategia de diseño.
            </p>
            <a 
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white text-purple-600 px-6 py-2 rounded-full font-semibold hover:bg-purple-200 transition"
            >
              Comenzar proyecto
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;