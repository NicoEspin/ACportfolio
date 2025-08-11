import ContactSection from "./components/ContactSection";
import Hero from "./components/Hero";
import Services from "./components/Services";
import SkillsSection from "./components/SkillsSection";
import "./globals.css";

export default function Home() {
  return (
    <>

      <Hero />
      <SkillsSection />
      <Services />
      <ContactSection />
    </>
  );
}