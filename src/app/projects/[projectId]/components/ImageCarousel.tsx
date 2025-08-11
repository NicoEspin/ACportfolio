// components/ImageCarousel.tsx
"use client";

import { motion, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onImageClick: () => void;
  projectName: string;
}

export default function ImageCarousel({
  images,
  currentIndex,
  onIndexChange,
  onImageClick,
  projectName,
}: ImageCarouselProps) {
  const nextImage = () => {
    onIndexChange(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  const prevImage = () => {
    onIndexChange(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const threshold = 50;
    
    if (Math.abs(info.velocity.x) > 300 || Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }
  };

  return (
    <div className="relative w-full h-[400px] md:h-[600px] lg:h-[700px] rounded-2xl overflow-hidden bg-gray-800/50 border border-gray-700/50 group">
      {/* Contenedor del slider */}
      <div className="relative w-full h-full overflow-hidden">
        {/* Track del slider con todas las imágenes */}
        <motion.div
          className="flex h-full"
          style={{ width: `${images.length * 100}%` }}
          animate={{ x: `-${currentIndex * (100 / images.length)}%` }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            mass: 0.8
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
          onDragEnd={handleDragEnd}
          whileDrag={{ cursor: 'grabbing' }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className="w-full h-full flex items-center justify-center p-4 cursor-pointer"
              style={{ width: `${100 / images.length}%` }}
              onClick={onImageClick}
            >
              <img
                src={image}
                alt={`${projectName} - Imagen ${index + 1}`}
                className="max-w-full max-h-full object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.02] select-none"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>

        {/* Overlay de zoom */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center pointer-events-none">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 bg-purple-500/80 rounded-full flex items-center justify-center backdrop-blur-sm">
              <ZoomIn size={24} />
            </div>
          </div>
        </div>

        {/* Botones de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm z-10 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}

        {/* Indicadores de puntos */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  onIndexChange(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "bg-purple-500 scale-125"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        )}

        {/* Indicador de drag para mobile */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 md:hidden">
          <div className="bg-black/50 rounded-lg px-3 py-1 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <p className="text-white text-xs">Desliza para cambiar</p>
          </div>
        </div>
      </div>
    </div>
  );
}