"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Instagram, MapPin, MessageCircle, Send } from "lucide-react";
import React from "react";

// Componentes simplificados y funcionales
const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-purple-500/60 to-transparent opacity-0 transition-opacity duration-300 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-pink-500/40 to-transparent opacity-0 blur-sm transition-opacity duration-300 group-hover/btn:opacity-100" />
    </>
  );
};

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-sm font-medium text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
Label.displayName = "Label";

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        `flex h-10 w-full border-none bg-gray-900/60 backdrop-blur-sm text-white rounded-lg px-3 py-2 text-sm 
         placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 
         disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300
         shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]
         focus:shadow-[inset_0_0_0_1px_rgba(168,85,247,0.5),0_0_0_3px_rgba(168,85,247,0.1)]
         hover:shadow-[inset_0_0_0_1px_rgba(168,85,247,0.3)]`,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        `flex min-h-[120px] w-full border-none bg-gray-900/60 backdrop-blur-sm text-white rounded-lg px-3 py-2 text-sm 
         placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 
         disabled:cursor-not-allowed disabled:opacity-50 resize-none transition-all duration-300
         shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]
         focus:shadow-[inset_0_0_0_1px_rgba(168,85,247,0.5),0_0_0_3px_rgba(168,85,247,0.1)]
         hover:shadow-[inset_0_0_0_1px_rgba(168,85,247,0.3)]`,
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => {
  return (
    <select
      className={cn(
        `flex h-10 w-full border-none bg-gray-900/60 backdrop-blur-sm text-white rounded-lg px-3 py-2 text-sm 
         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/50 
         disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300
         shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)]
         focus:shadow-[inset_0_0_0_1px_rgba(168,85,247,0.5),0_0_0_3px_rgba(168,85,247,0.1)]
         hover:shadow-[inset_0_0_0_1px_rgba(168,85,247,0.3)]`,
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </select>
  );
});
Select.displayName = "Select";

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};

export default function ContactSection() {
  const whatsappMessage = encodeURIComponent(
    "Hola Antto, te contacto porque me gustaron tus trabajos y me gustaría que creemos un proyecto juntos"
  );
  const whatsappNumber = "5493541217439"; // Formato internacional para Argentina

  return (
    <section className="relative bg-gradient-to-b from-[#16213e] via-[#1E1E1E] to-[#16213e] text-white overflow-hidden px-4 py-20 min-h-screen">
      {/* Gradient overlays suaves */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-[#1E1E1E] to-transparent pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#1E1E1E] to-transparent pointer-events-none z-0" />

      {/* Efectos de fondo minimalistas */}
      <div className="absolute w-96 h-96 bg-purple-500/10 rounded-full blur-3xl top-1/4 left-1/4 animate-pulse" />
      <div
        className="absolute w-72 h-72 bg-pink-500/10 rounded-full blur-3xl bottom-1/4 right-1/4 animate-pulse"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header Section - Animación suave y única */}
        <motion.div
          className="text-center space-y-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-400/30 rounded-full px-4 py-2">
            <span className="text-purple-400 text-sm font-medium">
              ¿Tienes una idea?
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Hablemos de tu{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Proyecto
            </span>
          </h2>

          <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            ¿Tienes una idea increíble? Me encantaría escucharla y ayudarte a
            hacerla realidad
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Side - Contact Information */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">
                Información de contacto
              </h3>

              {/* Contact Cards */}
              <div className="space-y-4">
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/ac.graficos/?igsh=bTN4MXdnZDlsYzR6#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-gray-900/40 backdrop-blur-sm border border-white/10 
                            hover:border-purple-400/30 transition-all duration-300 px-5 py-4 rounded-xl
                            hover:bg-gray-900/60 cursor-pointer group"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl group-hover:scale-105 transition-transform">
                    <Instagram className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">
                      Instagram
                    </p>
                    <p className="font-semibold text-white text-sm">
                      @ac.graficos
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 bg-gray-900/40 backdrop-blur-sm border border-white/10 
                            hover:border-purple-400/30 transition-all duration-300 px-5 py-4 rounded-xl
                            hover:bg-gray-900/60 cursor-pointer group"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl group-hover:scale-105 transition-transform">
                    <MessageCircle className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">
                      WhatsApp
                    </p>
                    <p className="font-semibold text-white text-sm">
                      +54 3541 217439
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div
                  className="flex items-center gap-4 bg-gray-900/40 backdrop-blur-sm border border-white/10 
                              hover:border-purple-400/30 transition-all duration-300 px-5 py-4 rounded-xl
                              hover:bg-gray-900/60"
                >
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                    <MapPin className="text-white w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">
                      Ubicación
                    </p>
                    <p className="font-semibold text-white text-sm">
                      Córdoba, Argentina
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Why Work With Me Section */}
            <div className="bg-gray-900/40 backdrop-blur-sm border border-white/10 rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-6">
                ¿Por qué trabajar conmigo?
              </h3>
              <ul className="space-y-4">
                {[
                  "Enfoque personalizado para cada proyecto",
                  "Comunicación clara y constante",
                  "Entrega en tiempo y forma",
                  "Revisiones incluidas hasta que ames el resultado",
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full" />
                    <span className="text-gray-400 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right Side - Contact Form */}
          <motion.div
            className="bg-gray-900/40 backdrop-blur-sm border border-white/10 rounded-xl p-8"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-white mb-8">
              Envíame un mensaje
            </h3>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <LabelInputContainer>
                  <Label htmlFor="nombre">Nombre</Label>
                  <Input id="nombre" placeholder="Tu nombre" type="text" />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="tu@email.com" type="email" />
                </LabelInputContainer>
              </div>

              <LabelInputContainer>
                <Label htmlFor="proyecto">Tipo de proyecto</Label>
                <Select id="proyecto">
                  <option value="">Selecciona el tipo de proyecto</option>
                  <option value="web">Sitio Web</option>
                  <option value="app">Aplicación</option>
                  <option value="branding">Branding</option>
                  <option value="otro">Otro</option>
                </Select>
              </LabelInputContainer>

              <LabelInputContainer>
                <Label htmlFor="descripcion">Cuéntame sobre tu proyecto</Label>
                <Textarea
                  id="descripcion"
                  placeholder="Describe tu proyecto, objetivos, y cualquier detalle que consideres importante..."
                  rows={5}
                />
              </LabelInputContainer>

              <button
                type="submit"
                className="group/btn relative  h-12 w-full rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 
                         hover:from-purple-600 hover:to-pink-600 transition-all duration-300 
                         text-white font-semibold shadow-lg hover:shadow-purple-500/25 
                         flex items-center justify-center gap-2 hover:-translate-y-0.5"
              >
                <Send className="w-5 h-5" />
                Enviar mensaje
                <BottomGradient />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
