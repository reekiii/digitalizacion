import { useEffect } from "react";
import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/sections/Hero/Hero";
import Performance from "./components/sections/Performance/Performance";
import Audit from "./components/sections/Audit/Audit";
import AboutMe from "./components/sections/AboutMe/AboutMe";
import Sponsors from "./components/sections/Sponsors/Sponsors";
import Services from "./components/sections/Services/Services";
import Packs from "./components/sections/Packs/Packs";
import Process from "./components/sections/Process/Process";
import Testimonials from "./components/sections/Testimonials/Testimonials";
import FAQ from "./components/sections/FAQ/FAQ";
import Contact from "./components/sections/Contact/Contact";
import Footer from "./components/layout/Footer/Footer";
import CookieConsent from "./components/ui/CookieConsent/CookieConsent";
import "./App.css";

function App() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (
        anchor &&
        anchor.hash &&
        anchor.hash.startsWith("#") &&
        anchor.pathname === window.location.pathname
      ) {
        e.preventDefault();
        const targetElement = document.getElementById(anchor.hash.slice(1));
        if (!targetElement) return;

        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1200; // 1.2s for slow luxury pan
        let start: number | null = null;

        const easeInOutCubic = (t: number) => {
          return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        };

        const animation = (currentTime: number) => {
          if (start === null) start = currentTime;
          const timeElapsed = currentTime - start;
          const progress = Math.min(timeElapsed / duration, 1);

          window.scrollTo(
            0,
            startPosition + distance * easeInOutCubic(progress),
          );

          if (timeElapsed < duration) {
            requestAnimationFrame(animation);
          }
        };

        requestAnimationFrame(animation);
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Performance />
        <Audit />
        <AboutMe />
        <Sponsors />
        <Services />
        <Packs />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

export default App;
