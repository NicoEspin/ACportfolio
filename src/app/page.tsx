import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import { Navbar } from "./components/Navbar";
import ProjectSection from "./components/ProjectSection";
import Services from "./components/Services";
import SkillsSection from "./components/SkillsSection";
import "./globals.css";

export default function Home() {
  return (
    <>
      <Navbar variant="glass" top={20} />
      <Hero />
      <SkillsSection />
      <ProjectSection />
      <Services />
      <ContactSection />
      <Footer />
    </>
  );
}