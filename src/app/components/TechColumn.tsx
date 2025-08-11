"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Fragment } from "react";

interface Technology {
  name: string;
  icon: string;
  description: string;
}

interface TechColumnProps {
  Technologies: Technology[];
  reverse?: boolean;
  className?: string;
}

const TechColumn = ({ Technologies, reverse = false, className = "" }: TechColumnProps) => {
  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      <motion.div
        className="flex flex-col gap-4"
        animate={{
          translateY: reverse ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {/* Duplicamos las tecnologías para crear el efecto infinito */}
        {[...Technologies, ...Technologies].map((tech, index) => (
          <Fragment key={index}>
            <TechCard tech={tech} />
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const TechCard = ({ tech }: { tech: Technology }) => {
  return (
    <div className="bg-[#2A2A2A]/80 backdrop-blur-sm border border-[#3a3a3a] rounded-2xl p-6 transition-all duration-300 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-500/10">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-xl bg-[#3A3A3A]/50 p-3 shadow-lg flex items-center justify-center border border-[#4A4A4A]/30">
          <Image
            src={tech.icon}
            alt={tech.name}
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
        </div>
        <div className="space-y-2">
          <h3 className="text-white font-semibold text-sm">{tech.name}</h3>
          <p className="text-gray-400 text-xs leading-relaxed">
            {tech.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechColumn;