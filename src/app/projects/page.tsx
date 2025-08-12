"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Eye, ExternalLink, Filter } from "lucide-react";
import projectsData from "@/app/data/projects.json";
import { useRouter } from "next/navigation";
import { Navbar } from "../components/Navbar";

interface Project {
  id: string;
  name: string;
  category: string;
  description: string;
  slogan: string;
  images: string[];
}

interface ImageDimensions {
  width: number;
  height: number;
}

interface GridItem {
  project: Project;
  colSpan: number;
  rowSpan: number;
  aspectRatio: number;
  index: number;
}

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [imageDimensions, setImageDimensions] = useState<
    Record<string, ImageDimensions>
  >({});
  const [filteredProjects, setFilteredProjects] =
    useState<Project[]>(projectsData);
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [gridCols, setGridCols] = useState(4);
  const router = useRouter();

  // Obtener categorías únicas
  const categories = [
    "all",
    ...Array.from(new Set(projectsData.map((project) => project.category))),
  ];

  // Detectar tamaño de pantalla para columnas
  useEffect(() => {
    const updateGridCols = () => {
      const width = window.innerWidth;
      if (width < 640) setGridCols(2); // mobile
      else if (width < 768) setGridCols(3); // tablet
      else if (width < 1024) setGridCols(4); // desktop
      else if (width < 1280) setGridCols(5); // large
      else setGridCols(6); // xl
    };

    updateGridCols();
    window.addEventListener("resize", updateGridCols);
    return () => window.removeEventListener("resize", updateGridCols);
  }, []);

  // Función para obtener las dimensiones de una imagen
  const getImageDimensions = (src: string): Promise<ImageDimensions> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
      };
      img.onerror = () => {
        resolve({ width: 400, height: 300 });
      };
      img.src = src;
    });
  };

  // Cargar dimensiones de imágenes
  useEffect(() => {
    const loadDimensions = async () => {
      const dimensions: Record<string, ImageDimensions> = {};

      for (const project of projectsData) {
        if (project.images && project.images.length > 0) {
          const firstImage = project.images[0];
          dimensions[project.id] = await getImageDimensions(firstImage);
        }
      }

      setImageDimensions(dimensions);
    };

    loadDimensions();
  }, []);

  // Algoritmo inteligente de posicionamiento Bento
  const calculateBentoLayout = (
    projects: Project[],
    cols: number
  ): GridItem[] => {
    if (Object.keys(imageDimensions).length === 0) return [];

    const gridMatrix: boolean[][] = [];
    const items: GridItem[] = [];

    // Inicializar matriz de grid
    const initMatrix = (rows: number) => {
      for (let i = gridMatrix.length; i < rows; i++) {
        gridMatrix[i] = new Array(cols).fill(false);
      }
    };

    // Verificar si un área está disponible
    const isAreaFree = (
      row: number,
      col: number,
      rowSpan: number,
      colSpan: number
    ): boolean => {
      if (col + colSpan > cols) return false;

      initMatrix(row + rowSpan);

      for (let r = row; r < row + rowSpan; r++) {
        for (let c = col; c < col + colSpan; c++) {
          if (gridMatrix[r][c]) return false;
        }
      }
      return true;
    };

    // Marcar área como ocupada
    const markArea = (
      row: number,
      col: number,
      rowSpan: number,
      colSpan: number
    ) => {
      for (let r = row; r < row + rowSpan; r++) {
        for (let c = col; c < col + colSpan; c++) {
          gridMatrix[r][c] = true;
        }
      }
    };

    // Encontrar próxima posición libre
    const findNextFreePosition = (): [number, number] => {
      for (let row = 0; row < gridMatrix.length + 10; row++) {
        initMatrix(row + 1);
        for (let col = 0; col < cols; col++) {
          if (!gridMatrix[row][col]) {
            return [row, col];
          }
        }
      }
      return [gridMatrix.length, 0];
    };

    // Calcular dimensiones óptimas para cada proyecto
    projects.forEach((project, index) => {
      const dimensions = imageDimensions[project.id];
      if (!dimensions) return;

      const aspectRatio = dimensions.width / dimensions.height;
      let colSpan = 1;
      let rowSpan = 1;

      // Algoritmo más inteligente basado en aspect ratio
      if (cols >= 4) {
        if (aspectRatio > 2.5) {
          // Panorámicas ultra anchas
          colSpan = Math.min(3, cols);
          rowSpan = 1;
        } else if (aspectRatio > 1.8) {
          // Panorámicas anchas
          colSpan = Math.min(2, cols);
          rowSpan = 1;
        } else if (aspectRatio > 1.3) {
          // Horizontales
          colSpan = Math.min(2, cols);
          rowSpan = 1;
        } else if (aspectRatio < 0.4) {
          // Ultra verticales
          colSpan = 1;
          rowSpan = 3;
        } else if (aspectRatio < 0.7) {
          // Verticales
          colSpan = 1;
          rowSpan = 2;
        } else {
          // Cuadradas - distribuir algunos como destacados
          if (index % 7 === 0 && cols >= 4) {
            // Cada 7mo proyecto es destacado
            colSpan = 2;
            rowSpan = 2;
          } else if (index % 5 === 0) {
            // Cada 5to es horizontal
            colSpan = Math.min(2, cols);
            rowSpan = 1;
          } else {
            colSpan = 1;
            rowSpan = 1;
          }
        }
      } else {
        // Para pantallas pequeñas, mantener simple
        if (aspectRatio > 1.5) {
          colSpan = Math.min(2, cols);
          rowSpan = 1;
        } else if (aspectRatio < 0.7) {
          colSpan = 1;
          rowSpan = 2;
        } else {
          colSpan = 1;
          rowSpan = 1;
        }
      }

      // Encontrar posición y ajustar si es necesario
      const [startRow, startCol] = findNextFreePosition();

      // Intentar colocar con el tamaño deseado
      if (isAreaFree(startRow, startCol, rowSpan, colSpan)) {
        markArea(startRow, startCol, rowSpan, colSpan);
      } else {
        // Si no cabe, reducir tamaño y intentar de nuevo
        let placed = false;

        // Intentar reducir colSpan
        for (
          let newColSpan = colSpan - 1;
          newColSpan >= 1 && !placed;
          newColSpan--
        ) {
          if (isAreaFree(startRow, startCol, rowSpan, newColSpan)) {
            colSpan = newColSpan;
            markArea(startRow, startCol, rowSpan, colSpan);
            placed = true;
          }
        }

        // Si aún no cabe, reducir rowSpan también
        if (!placed) {
          for (
            let newRowSpan = rowSpan - 1;
            newRowSpan >= 1 && !placed;
            newRowSpan--
          ) {
            if (isAreaFree(startRow, startCol, newRowSpan, 1)) {
              colSpan = 1;
              rowSpan = newRowSpan;
              markArea(startRow, startCol, rowSpan, colSpan);
              placed = true;
            }
          }
        }

        // Como último recurso, usar 1x1
        if (!placed) {
          colSpan = 1;
          rowSpan = 1;
          markArea(startRow, startCol, rowSpan, colSpan);
        }
      }

      items.push({
        project,
        colSpan,
        rowSpan,
        aspectRatio,
        index,
      });
    });

    return items;
  };

  // FUNCIÓN CLAVE: Navegar al detalle del proyecto
  const handleProjectClick = (projectId: string) => {
    router.push(`/projects/${projectId}`);
  };

  // Filtrar proyectos por categoría y recalcular layout
  useEffect(() => {
    const filtered =
      selectedCategory === "all"
        ? projectsData
        : projectsData.filter(
            (project) => project.category === selectedCategory
          );

    setFilteredProjects(filtered);

    // Recalcular layout cuando cambian los proyectos o dimensiones del grid
    if (Object.keys(imageDimensions).length > 0) {
      const items = calculateBentoLayout(filtered, gridCols);
      setGridItems(items);
    }
  }, [selectedCategory, imageDimensions, gridCols]);

  // Generar clases CSS dinámicamente
  const getGridItemClasses = (item: GridItem) => {
    return `col-span-${item.colSpan} row-span-${item.rowSpan}`;
  };

  return (
    <section className="relative bg-[#1E1E1E] text-white overflow-hidden px-2 sm:px-4 py-8 min-h-screen">
      <Navbar variant="glass" top={0}/>
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

      <div className="relative z-10 max-w-[98vw] mx-auto">
        {/* Header compacto */}
        <div className="text-center mb-6 sm:mb-8">
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Mis{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 bg-clip-text text-transparent">
              Proyectos
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Galería visual de diseño y creatividad
          </motion.p>

          {/* Category Filter compacto */}
          <motion.div
            className="flex flex-wrap justify-center gap-1.5 sm:gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border transition-all duration-300 flex items-center gap-1.5 text-xs sm:text-sm ${
                  selectedCategory === category
                    ? "bg-purple-500 border-purple-400 text-white"
                    : "border-gray-600 text-gray-300 hover:border-purple-400 hover:text-purple-400"
                }`}
              >
                {category === "all" && <Filter size={12} />}
                <span className="capitalize">
                  {category === "all"
                    ? "Todos"
                    : category.replace(" design", "")}
                </span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Projects Grid con algoritmo Bento mejorado */}
        <motion.div
          className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-1.5 sm:gap-2 md:gap-3 auto-rows-[160px] sm:auto-rows-[200px] md:auto-rows-[240px] lg:auto-rows-[280px]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {gridItems.map((item, index) => (
            <motion.div
              key={item.project.id}
              className={`group relative overflow-hidden rounded-xl sm:rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-400/50 transition-all duration-500 cursor-pointer ${getGridItemClasses(
                item
              )}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.03 * index }}
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => handleProjectClick(item.project.id)}
            >
              {/* Project Image */}
              {item.project.images && item.project.images.length > 0 && (
                <div className="absolute inset-0">
                  <img
                    src={item.project.images[0]}
                    alt={item.project.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
                </div>
              )}

              {/* Project Info */}
              <div className="absolute inset-0 p-2 sm:p-3 md:p-4 flex flex-col justify-end">
                <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  {/* Category Badge */}
                  <div className="mb-1.5">
                    <span className="inline-block px-1.5 py-0.5 bg-purple-500/40 border border-purple-400/50 rounded-md text-purple-300 text-xs font-medium backdrop-blur-sm">
                      {item.project.category.charAt(0).toUpperCase() +
                        item.project.category.slice(1)}
                    </span>
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white mb-1 line-clamp-2">
                    {item.project.name}
                  </h3>

                  {/* Project Slogan - Solo en elementos grandes */}
                  {(item.colSpan > 1 || item.rowSpan > 1) && (
                    <p className="text-gray-300 text-xs mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 line-clamp-2 hidden sm:block">
                      {item.project.slogan}
                    </p>
                  )}

                  {/* View Project Button */}
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                    <button className="flex items-center gap-1 px-2 py-1 bg-purple-500 hover:bg-purple-600 rounded-lg text-white text-xs font-medium transition-colors duration-300 backdrop-blur-sm">
                      <Eye size={10} className="sm:w-3 sm:h-3" />
                      <span>Ver</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-gray-400 text-lg">
              No hay proyectos en esta categoría
            </p>
          </motion.div>
        )}
      </div>

      {/* Estilos CSS para las clases dinámicas de grid */}
      <style jsx>{`
        .col-span-1 {
          grid-column: span 1 / span 1;
        }
        .col-span-2 {
          grid-column: span 2 / span 2;
        }
        .col-span-3 {
          grid-column: span 3 / span 3;
        }
        .row-span-1 {
          grid-row: span 1 / span 1;
        }
        .row-span-2 {
          grid-row: span 2 / span 2;
        }
        .row-span-3 {
          grid-row: span 3 / span 3;
        }
      `}</style>
    </section>
  );
};

export default ProjectsPage;