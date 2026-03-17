import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/sections/Hero/Hero";
import Footer from "./components/layout/Footer/Footer";
import CookieConsent from "./components/ui/CookieConsent/CookieConsent";
import "./App.css";

// Lazy Loaded Sections
const Performance = lazy(() => import("./components/sections/Performance/Performance"));
const Audit = lazy(() => import("./components/sections/Audit/Audit"));
const AboutMe = lazy(() => import("./components/sections/AboutMe/AboutMe"));
const Services = lazy(() => import("./components/sections/Services/Services"));
const Sponsors = lazy(() => import("./components/sections/Sponsors/Sponsors"));
const Packs = lazy(() => import("./components/sections/Packs/Packs"));
const Process = lazy(() => import("./components/sections/Process/Process"));
const Testimonials = lazy(() => import("./components/sections/Testimonials/Testimonials"));
const FAQ = lazy(() => import("./components/sections/FAQ/FAQ"));
const Contact = lazy(() => import("./components/sections/Contact/Contact"));
const NotFound = lazy(() => import("./components/sections/NotFound/NotFound"));

// Fallback for Suspense
const SectionLoader = () => (
  <div className="section-loader" style={{ height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div className="loader-dots">
      <span>.</span><span>.</span><span>.</span>
    </div>
  </div>
);

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

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      
      // Intentar scroll inmediato con un pequeño margen para el renderizado inicial
      const scrollToElement = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return true;
        }
        return false;
      };

      if (!scrollToElement()) {
        // Si no existe (debido al lazy loading), observamos el DOM hasta que aparezca
        const observer = new MutationObserver(() => {
          if (scrollToElement()) {
            observer.disconnect();
          }
        });

        observer.observe(document.body, {
          childList: true,
          subtree: true
        });

        // Limpieza por si acaso el elemento nunca aparece
        setTimeout(() => observer.disconnect(), 5000);
        return () => observer.disconnect();
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <Performance />
        <Audit />
        <AboutMe />
        <Services />
        <Sponsors />
        <Packs />
        <Process />
        <Testimonials />
        <FAQ />
        <Contact />
      </Suspense>
    </motion.div>
  );
}

function AppContent() {
  const location = useLocation();
  
  return (
    <>
      <ScrollManager />
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route 
            path="*" 
            element={
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                <Suspense fallback={<SectionLoader />}>
                  <NotFound />
                </Suspense>
              </motion.div>
            } 
          />
        </Routes>
      </AnimatePresence>
      <Footer />
      <CookieConsent />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
