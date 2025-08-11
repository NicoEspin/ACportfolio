// components/ThumbnailGallery.tsx
"use client";

import { motion } from "framer-motion";

interface ThumbnailGalleryProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  projectName: string;
}

export default function ThumbnailGallery({
  images,
  currentIndex,
  onIndexChange,
  projectName,
}: ThumbnailGalleryProps) {
  return (
    <div className="mb-16 overflow-hidden">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
        Galería del Proyecto
      </h2>

      {/* Grid de thumbnails */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`relative aspect-square rounded-xl overflow-hidden bg-gray-800/50 border transition-all duration-300 cursor-pointer group ${
              currentIndex === index
                ? "border-purple-500 ring-2 ring-purple-500/50 shadow-lg shadow-purple-500/25"
                : "border-gray-700/50 hover:border-purple-400/50"
            }`}
            onClick={() => onIndexChange(index)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 * index }}
          >
            {/* Imagen */}
            <img
              src={image}
              alt={`${projectName} - Imagen ${index + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Overlay de hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
            
            {/* Indicador de imagen activa */}
            {currentIndex === index && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-3 h-3 bg-white rounded-full" />
                </div>
              </div>
            )}

            {/* Overlay de selección */}
            <div className={`absolute inset-0 transition-all duration-300 ${
              currentIndex === index 
                ? "bg-purple-500/20" 
                : "bg-transparent group-hover:bg-purple-500/10"
            }`} />

            {/* Número de imagen */}
            <div className="absolute top-2 left-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                currentIndex === index
                  ? "bg-purple-500 text-white"
                  : "bg-black/50 text-gray-300 group-hover:bg-purple-500/50"
              }`}>
                {index + 1}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Controles adicionales en mobile */}
      <div className="mt-6 flex items-center justify-center md:hidden">
        <div className="bg-gray-800/50 rounded-full px-4 py-2 backdrop-blur-sm border border-gray-700/50">
          <p className="text-gray-300 text-sm">
            Imagen {currentIndex + 1} de {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}