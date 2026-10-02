import { lazy, Suspense, useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { destroyLenis, getLenis } from './lib/lenis';
import ErrorBoundary from './components/ErrorBoundary';

// Three.js is the heaviest dependency in the bundle and is purely
// decorative — split it into its own chunk so it never blocks first paint.
const ThreeBackground = lazy(() => import('./components/background/ThreeBackground'));
import CustomCursor from './components/CustomCursor';
import ScrollProgressBar from './components/ScrollProgressBar';
import Loader from './components/Loader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import HowIThink from './components/HowIThink';
import Projects from './components/Projects';
import Toolbox from './components/Toolbox';
import Experience from './components/Experience';
import Achievements from './components/Achievements';
import BeyondCode from './components/BeyondCode';
import CurrentlyExploring from './components/CurrentlyExploring';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CommandPalette from './components/CommandPalette';
import BackToTop from './components/BackToTop';

import SideGutterDecorations from './components/SideGutterDecorations';

export default function App() {
  const [showLoader, setShowLoader] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    return () => {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'auto';
      }
    };
  }, []);

  const handleLoaderFinished = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    setShowLoader(false);
  };

  useEffect(() => {
    const lenis = getLenis();
    lenis.stop();
    return destroyLenis;
  }, []);

  useEffect(() => {
    document.body.style.overflow = showLoader ? 'hidden' : '';
    if (!showLoader) getLenis().start();
    return () => {
      document.body.style.overflow = '';
    };
  }, [showLoader]);

  return (
    <ThemeProvider>
      {showLoader && (
        <Loader onRevealStart={() => setRevealed(true)} onFinished={handleLoaderFinished} />
      )}
      <ErrorBoundary>
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>
      </ErrorBoundary>
      <CustomCursor />
      <ScrollProgressBar />
      <SideGutterDecorations />
      <div
        className={`min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-opacity duration-700 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 ${
          revealed ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="relative min-h-screen bg-light-card dark:bg-dark-card">
          <Navbar />
          <main>
            <Hero revealed={revealed} />
            <About />
            <HowIThink />
            <Projects />
            <Toolbox />
            <Experience />
            <Achievements />
            <BeyondCode />
            <CurrentlyExploring />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
      <CommandPalette />
      <BackToTop />
    </ThemeProvider>
  );
}
