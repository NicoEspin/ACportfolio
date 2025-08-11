import Image from "next/image";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="w-full px-8 py-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-gray-800/90 to-blue-900/90 backdrop-blur-sm rounded-full px-8 py-4 flex items-center justify-between border border-gray-700/50">
          {/* Logo */}
          <div className="flex items-center">
            <div className="">
              <Image
                src="/logo.webp"
                alt="Logo"
                width={40}
                height={40}
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <a
              href="#inicio"
              className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Inicio
            </a>
            <a
              href="#proyectos"
              className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Proyectos
            </a>
            <a
              href="#habilidades"
              className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Habilidades
            </a>
            <a
              href="#contacto"
              className="text-white/90 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              Contacto
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
