// components/ImageModal.tsx
"use client";

import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Modal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from "@heroui/modal";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  projectName: string;
}

export default function ImageModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
  projectName,
}: ImageModalProps) {
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
    const threshold = 100;
    
    if (Math.abs(info.velocity.x) > 500 || Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }
  };

  // Manejar teclas
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        case 'ArrowRight':
          nextImage();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isOpen, currentIndex]);

  return (
    <Modal 
      isOpen={isOpen} 
      onOpenChange={onClose}
      size="full"
      classNames={{
        backdrop: "bg-black/95 backdrop-blur-sm",
        wrapper: "items-center justify-center",
        base: "bg-transparent shadow-none max-w-none max-h-none w-full h-full m-0",
        body: "p-0",
        header: "p-0",
        footer: "p-0",
        closeButton: "hidden"
      }}
      hideCloseButton
      backdrop="blur"
      scrollBehavior="inside"
      motionProps={{
        variants: {
          enter: {
            opacity: 1,
            scale: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut"
            }
          },
          exit: {
            opacity: 0,
            scale: 0.95,
            transition: {
              duration: 0.2,
              ease: "easeIn"
            }
          }
        }
      }}
    >
      <ModalContent className="bg-transparent shadow-none h-full flex flex-col">
        {/* Header personalizado */}
        <ModalHeader className="flex-shrink-0 flex items-center justify-between p-4 md:p-6 bg-transparent">
          <div className="text-white">
            <h3 className="text-lg md:text-xl font-semibold">{projectName}</h3>
            <p className="text-sm text-gray-300">
              {currentIndex + 1} de {images.length}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm z-50"
          >
            <X size={20} />
          </button>
        </ModalHeader>

        {/* Body con la imagen principal */}
        <ModalBody className="flex-1 flex items-center justify-center px-4 md:px-16 lg:px-20 relative overflow-hidden">
          {/* Navegación izquierda */}
          {images.length > 1 && (
            <motion.button
              onClick={prevImage}
              className="absolute left-2 md:left-6 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronLeft size={24} />
            </motion.button>
          )}

          {/* Contenedor de la imagen con drag */}
          <motion.div
            className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
            drag={images.length > 1 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            whileDrag={{ cursor: 'grabbing' }}
          >
            <div className="relative max-w-full max-h-full">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`${projectName} - Imagen ${currentIndex + 1}`}
                  className="max-w-full max-h-full w-auto h-auto object-contain block rounded-lg shadow-2xl"
                  style={{ 
                    maxHeight: 'calc(100vh - 200px)',
                    maxWidth: 'calc(100vw - 40px)'
                  }}
                  initial={{ opacity: 0, scale: 0.9, x: 50 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9, x: -50 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  draggable={false}
                />
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Navegación derecha */}
          {images.length > 1 && (
            <motion.button
              onClick={nextImage}
              className="absolute right-2 md:right-6 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all duration-300 backdrop-blur-sm z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ChevronRight size={24} />
            </motion.button>
          )}

          {/* Indicador de drag en mobile */}
          <motion.div 
            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 md:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="bg-black/50 rounded-full px-3 py-1 backdrop-blur-sm">
              <p className="text-white text-xs">Desliza para cambiar imagen</p>
            </div>
          </motion.div>
        </ModalBody>

        {/* Footer con thumbnails */}
        {images.length > 1 && (
          <ModalFooter className="flex-shrink-0 bg-black/30 backdrop-blur-sm border-t border-gray-700/50 ">
            <div className="w-full p-4 ">
              <motion.div 
                className="flex items-center justify-center gap-2 max-w-full overflow-x-auto scrollbar-hide overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex gap-2 px-4">
                  {images.map((image, index) => (
                    <motion.button
                      key={index}
                      onClick={() => onIndexChange(index)}
                      className={`flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        currentIndex === index
                          ? "border-purple-500 scale-110 shadow-lg shadow-purple-500/25"
                          : "border-gray-600 hover:border-purple-400 opacity-70 hover:opacity-100"
                      }`}
                      whileHover={{ scale: currentIndex === index ? 1.1 : 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </div>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}