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
  const [showContent, setShowContent] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setTimeout(() => {
      setShowContent(true);
    }, 200);
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

        {/* Contenido principal */}
        <div
          className={`min-h-screen transition-all duration-700 ease-out ${
            showContent
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          style={{
            display: showContent ? "block" : "none",
            width: "100vw",
            minHeight: "100vh",
          }}
        >
          {children}
        </div>
      </body>
    </html>
  );
}
