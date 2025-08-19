"use client";

import { useState } from "react";
import AnttoLoader from "./components/AnttoLoader";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    // Eliminamos el setState de isLoading con delay
    // Ahora se ejecuta inmediatamente cuando se llama
    setIsLoading(false);
  };

  const bodyClass = isLoading ? "overflow-hidden" : "overflow-auto";

  return (
    <html lang="es">
      <body className={`${bodyClass} m-0 p-0 overflow-x-hidden`}>
        {/* Loader */}
        {isLoading && (
          <AnttoLoader
            onLoadingComplete={handleLoadingComplete}
            duration={3000}
          />
        )}

        {/* Contenido principal - ahora aparece tan pronto como isLoading = false */}
        {!isLoading && (
          <div
            className="animate-fade-in"
            style={{
              animationDuration: '0.5s',
              animationFillMode: 'forwards',
              animationTimingFunction: 'ease-out'
            }}
          >
            {children}
          </div>
        )}

        <style jsx>{`
          @keyframes fade-in {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
          }
        `}</style>
      </body>
    </html>
  );
}