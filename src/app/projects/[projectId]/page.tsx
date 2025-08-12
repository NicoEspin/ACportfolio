"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, use } from "react";
import { ArrowLeft, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import projectsData from "@/app/data/projects.json";
import ImageModal from "./components/ImageModal";
import ImageCarousel from "./components/ImageCarousel";
import ThumbnailGallery from "./components/ThumbnailGallery";
import { Navbar } from "@/app/components/Navbar";

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  slogan: string;
  images: string[];
}

export default function Page({ params }: { params: Promise<{ projectId: string }> }) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [project, setProject] = useState<Project | null>(null);
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const resolvedParams = use(params);

  // Funciones del modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Función para cambiar imagen (usada tanto por carousel como thumbnails)
  const handleImageIndexChange = (newIndex: number) => {
    setCurrentImageIndex(newIndex);
  };

  // Navegación de proyectos
  const goToProject = (newProjectId: string) => {
    router.push(`/projects/${newProjectId}`);
  };

  // Effect para cargar proyecto
  useEffect(() => {
    const currentProject = projectsData.find((p) => p.id === resolvedParams.projectId);
    if (currentProject) {
      setProject(currentProject);
      setCurrentImageIndex(0); // Reset index cuando cambia el proyecto

      // Encontrar proyectos relacionados
      const related = projectsData.filter(
        (p) => p.category === currentProject.category && p.id !== resolvedParams.projectId
      );
      setRelatedProjects(related);
    }
  }, [resolvedParams.projectId]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#1E1E1E] flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-lg mb-4">Proyecto no encontrado</p>
          <button
            onClick={() => router.push('/projects')}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
          >
            Volver a Proyectos
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="relative bg-[#1E1E1E] text-white overflow-hidden min-h-screen">
      <Navbar variant="solid" top={0} />
      {/* Animated Blobs */}
      <motion.div
        className="absolute w-60 h-60 bg-purple-500 rounded-full blur-3xl opacity-30"
        style={{ top: "5%", right: "3%" }}
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-20"
        style={{ bottom: "15%", left: "3%" }}
        animate={{ y: [0, 25, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => router.push('/projects')}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors duration-300 cursor-pointer"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ArrowLeft size={20} />
          <span>Volver</span>
        </motion.button>

        {/* Project Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-purple-500/40 border border-purple-400/50 rounded-full text-purple-300 text-sm font-medium backdrop-blur-sm">
              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-4">
            {project.name}
          </h1>

          <p className="text-xl md:text-2xl text-purple-300 font-medium mb-6">
            {project.slogan}
          </p>

          <p className="text-gray-300 text-lg max-w-4xl mx-auto leading-relaxed">
            {project.description}
          </p>
        </motion.div>

        {/* Main Image Carousel */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <ImageCarousel
            images={project.images}
            currentIndex={currentImageIndex}
            onIndexChange={handleImageIndexChange}
            onImageClick={openModal}
            projectName={project.name}
          />
        </motion.div>

        {/* Thumbnail Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <ThumbnailGallery
            images={project.images}
            currentIndex={currentImageIndex}
            onIndexChange={handleImageIndexChange}
            projectName={project.name}
          />
        </motion.div>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-2 bg-purple-500/20 border border-purple-400/30 rounded-full text-purple-300 text-sm font-medium backdrop-blur-sm mb-4">
                Ver Más
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Más proyectos de{" "}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {project.category}
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.slice(0, 6).map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  className="group relative overflow-hidden rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-400/50 transition-all duration-500 cursor-pointer aspect-video"
                  onClick={() => goToProject(relatedProject.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ scale: 1.02, y: -4 }}
                >
                  {/* Project Image */}
                  <div className="absolute inset-0">
                    <img
                      src={relatedProject.images[0]}
                      alt={relatedProject.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                  </div>

                  {/* Project Info */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      {/* Category Badge */}
                      <div className="mb-3">
                        <span className="inline-block px-3 py-1 bg-purple-500/40 border border-purple-400/50 rounded-lg text-purple-300 text-xs font-medium backdrop-blur-sm">
                          {relatedProject.category.charAt(0).toUpperCase() +
                            relatedProject.category.slice(1)}
                        </span>
                      </div>

                      {/* Project Title */}
                      <h3 className="text-xl font-bold text-white mb-2">
                        {relatedProject.name}
                      </h3>

                      {/* Project Slogan */}
                      <p className="text-gray-300 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {relatedProject.slogan}
                      </p>

                      {/* View Project Button */}
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                        <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-sm font-medium transition-colors duration-300 backdrop-blur-sm">
                          <Eye size={16} />
                          <span>Ver Proyecto</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Modal de Imagen */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={project.images}
        currentIndex={currentImageIndex}
        onIndexChange={handleImageIndexChange}
        projectName={project.name}
      />
    </section>
  );
}