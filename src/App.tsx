import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Portfolio from '../pages/Portfolio';
import Contact from '../pages/Contact';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen selection:bg-primary selection:text-white text-foreground font-sans relative">
        {/* Global Video Background */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
            {/* Fallback placeholder video */}
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-particles-moving-slowly-in-the-air-34487-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-background/70" />
          <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
        </div>

        <Navbar />
        <main className="relative z-10 backdrop-blur-[2px]">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}
