import React from 'react';
import { Instagram, Mail, MessageCircle } from 'lucide-react'; // Reemplazar Phone con MessageCircle

const Footer = () => {
  // Agregar estas constantes al inicio del componente
  const whatsappMessage = encodeURIComponent(
    "Hola Antto, te contacto porque me gustaron tus trabajos y me gustaría que creemos un proyecto juntos"
  );
  const whatsappNumber = "5493541217439";

  return (
    <footer className="bg-[#0C082480] text-white px-4 py-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16">
          {/* Logo y descripción */}
          <div className="space-y-6 md:max-w-xs">
            <div className="flex items-center space-x-3">
              <img 
                src="./logo.webp" 
                alt="Antonella Catalano Logo" 
                className="w-8 h-8"
              />
              <h3 className="text-xl font-semibold text-white">Antonella Catalano</h3>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              Creando identidades visuales que conectan marcas con personas a través del poder del diseño estratégico.
            </p>
            <div className="flex space-x-3">
              <a 
                href="https://www.instagram.com/ac.graficos/?igsh=bTN4MXdnZDlsYzR6#" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-300 group"
              >
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a 
                href="mailto:antocatalanocp@gmail.com" 
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-300 group"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
              {/* Reemplazar el enlace de teléfono con WhatsApp */}
              <a 
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center hover:scale-105 transition-transform duration-300 group"
              >
                <MessageCircle className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Servicios - Sin cambios */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Servicios</h3>
            <ul className="space-y-4">
              <li>
                <a href="#identidad-visual" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                  Identidad Visual
                </a>
              </li>
              <li>
                <a href="#editorial" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                  Editorial
                </a>
              </li>
              <li>
                <a href="#publicidad" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                  Publicidad
                </a>
              </li>
              <li>
                <a href="#social-media" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                  Social Media
                </a>
              </li>
              <li>
                <a href="#estrategia-creativa" className="text-gray-300 hover:text-white transition-colors duration-300 text-sm">
                  Estrategia Creativa
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white">Contacto</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-2">
                <span className="text-gray-300 text-sm">Córdoba, Argentina</span>
              </div>
              <div className="flex items-start space-x-2">
                <a 
                  href="mailto:antocatalanocp@gmail.com" 
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  antocatalanocp@gmail.com
                </a>
              </div>
              {/* Reemplazar el enlace de teléfono con WhatsApp */}
              <div className="flex items-start space-x-2">
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                >
                  +54 3541-217439
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-12 mb-8" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Antonella Catalano. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;