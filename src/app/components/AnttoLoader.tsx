"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface AnttoLoaderProps {
  onLoadingComplete?: () => void;
  duration?: number;
}

const AnttoLoader: React.FC<AnttoLoaderProps> = ({
  onLoadingComplete,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Reducimos el delay y llamamos onLoadingComplete inmediatamente cuando comienza la animación de salida
      setTimeout(() => {
        onLoadingComplete?.();
      }, 0); // Reducido de 800ms a 100ms
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onLoadingComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed top-0 left-0 w-full h-full z-[9999] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: "#0C0824" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ 
            opacity: 0, 
            scale: 0.95,
            transition: { duration: 0.4 } // Reducido de 0.6s a 0.4s
          }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Background Gradient */}
          <motion.div
            className="absolute inset-0 w-full h-full"
            animate={{
              background: [
                "radial-gradient(circle at 30% 30%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 70% 70%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 50% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)",
                "radial-gradient(circle at 30% 80%, rgba(236, 72, 153, 0.1) 0%, transparent 50%)",
              ],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Grid Background - Fixed */}
          <div 
            className="absolute inset-0 w-full h-full opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px"
            }}
          />

          {/* Main Content Container - Properly Centered */}
          <div className="relative flex flex-col items-center justify-center">
            
            {/* Rotating Outer Ring */}
            <motion.div
              className="absolute w-80 h-80 rounded-full border border-pink-500/20"
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="absolute inset-4 rounded-full border border-purple-500/15">
                <div className="absolute inset-4 rounded-full border border-blue-500/10"></div>
              </div>
            </motion.div>

            {/* Floating Particles */}
            {[...Array(8)].map((_, i) => {
              const angle = (i * Math.PI * 2) / 8;
              const radius = 120;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              
              return (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 rounded-full"
                  style={{
                    background: i % 3 === 0 ? "#EC4899" : i % 3 === 1 ? "#8B5CF6" : "#3B82F6",
                    left: "50%",
                    top: "50%",
                    transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.3, 1, 0.3],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 3 + i * 0.2,
                    repeat: Infinity,
                    delay: i * 0.3,
                    ease: "easeInOut",
                  }}
                />
              );
            })}

            {/* Image Container */}
            <motion.div
              className="relative z-10"
              initial={{ scale: 0.3, opacity: 0, y: 100 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.3,
              }}
            >
              {/* Pulsing Glow */}
              <motion.div
                className="absolute inset-0 rounded-full blur-xl"
                style={{
                  background: "radial-gradient(circle, rgba(236, 72, 153, 0.4) 0%, transparent 70%)",
                  width: "180px",
                  height: "180px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main Image */}
              <motion.div
                className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl"
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src="/Antto-Rosa.webp"
                  alt="Antto"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full"
                  priority
                />

                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>

            {/* Text and Loading Elements */}
            <motion.div
              className="relative z-10 mt-8 text-center flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
            >
              {/* Brand Name */}
              <motion.h1
                className="text-5xl font-bold mb-4"
                style={{
                  background: "linear-gradient(135deg, #EC4899, #8B5CF6, #3B82F6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  backgroundSize: "200% 200%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                Antto
              </motion.h1>

              {/* Loading Text */}
              <motion.p
                className="text-white/60 text-lg mb-6"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Cargando...
              </motion.p>

              {/* Progress Bar */}
              <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mb-6">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: "linear-gradient(90deg, #EC4899, #8B5CF6, #3B82F6)",
                  }}
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>

              {/* Loading Dots */}
              <div className="flex justify-center space-x-2">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-pink-400"
                    animate={{
                      scale: [0.5, 1.2, 0.5],
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: "easeInOut",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnttoLoader;