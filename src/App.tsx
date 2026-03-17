import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/sections/Hero/Hero";
import Performance from "./components/sections/Performance/Performance";
import Audit from "./components/sections/Audit/Audit";
import AboutMe from "./components/sections/AboutMe/AboutMe";
import Services from "./components/sections/Services/Services";
import Packs from "./components/sections/Packs/Packs";
import Process from "./components/sections/Process/Process";
import Testimonials from "./components/sections/Testimonials/Testimonials";
import FAQ from "./components/sections/FAQ/FAQ";
import Contact from "./components/sections/Contact/Contact";
import Footer from "./components/layout/Footer/Footer";
import CookieConsent from "./components/ui/CookieConsent/CookieConsent";
import NotFound from "./components/sections/NotFound/NotFound";
import "./App.css";

// Smooth Scroll Logic Wrapper
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (
        anchor &&
        anchor.hash &&
        anchor.hash.startsWith("#") &&
        (anchor.pathname === window.location.pathname || anchor.pathname === "/")
      ) {
        // If we're not on home and click an anchor, let default link behavior happen (navigation)
        if (window.location.pathname !== "/") return;

        e.preventDefault();
        const targetElement = document.getElementById(anchor.hash.slice(1));
        if (!targetElement) return;

        const targetPosition =
          targetElement.getBoundingClientRect().top + window.scrollY;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 1200;
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
  }, [pathname]);

  // Handle hash scroll on direct entry or navigation from other pages
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <main>
      <Hero />
      <Performance />
      <Audit />
      <AboutMe />
      <Services />
      <Packs />
      <Process />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}

function App() {
  return (
    <Router>
      <ScrollManager />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <CookieConsent />
    </Router>
  );
}

export default App;
