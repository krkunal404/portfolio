import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiSun, HiMoon, HiMenu, HiX } from 'react-icons/hi';
import { useTheme } from '../hooks/useTheme';
import { scrollToSection } from '../lib/lenis';
import Logo from './Logo';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Thinking', href: '#thinking' },
  { label: 'Work', href: '#projects' },
  { label: 'Toolbox', href: '#toolbox' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#about');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    scrollToSection(href);
  };

  const openCommandPalette = () => {
    window.dispatchEvent(new CustomEvent('command-palette:open'));
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="sticky top-0 z-50 border-b border-light-border dark:border-dark-border backdrop-blur-md bg-light-card/90 dark:bg-dark-card/90 rounded-t-3xl"
      >
        <motion.nav
          animate={{
            paddingTop: scrolled ? 12 : 18,
            paddingBottom: scrolled ? 12 : 18,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between gap-4 px-6 sm:px-10 md:px-14 lg:px-24 xl:px-32"
        >
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2 font-display font-semibold text-light-text dark:text-dark-text hover:opacity-80 transition-opacity shrink-0"
            id="nav-logo"
          >
            <span
              id="nav-logo-mark"
              className="inline-flex w-7 h-7 text-light-border dark:text-dark-border transition-all duration-300 hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.55)]"
            >
              <Logo className="w-7 h-7" />
            </span>
            <span id="nav-name-mark" className="hidden sm:inline">
              Kunnal
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-3.5 py-1.5 text-sm font-medium rounded-full transition-colors duration-200 ${
                  activeHref === link.href
                    ? 'text-white'
                    : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
                }`}
                id={`nav-${link.label.toLowerCase()}`}
              >
                {activeHref === link.href && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-full bg-brand-gradient-solid -z-10"
                  />
                )}
                {link.label}
              </a>
            ))}
          </div>

          {/* Right controls */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={openCommandPalette}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium text-light-muted dark:text-dark-muted border border-light-border dark:border-dark-border hover:text-light-text dark:hover:text-dark-text hover:border-brand-purple/40 dark:hover:border-brand-cyan/40 transition-all"
              aria-label="Open command palette"
              id="nav-command-palette"
            >
              <kbd className="font-sans">Ctrl</kbd>
              <kbd className="font-sans">K</kbd>
            </button>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:bg-black/5 dark:hover:bg-white/10 transition-all duration-200"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              id="theme-toggle"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isDark ? 'sun' : 'moon'}
                  className="block"
                  initial={{ rotate: -90, scale: 0.4, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.4, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.65, 0, 0.35, 1] }}
                >
                  {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="md:hidden p-2 rounded-full text-light-muted dark:text-dark-muted hover:bg-black/5 dark:hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
              id="mobile-menu-toggle"
            >
              {mobileOpen ? <HiX size={20} /> : <HiMenu size={20} />}
            </button>
          </div>
        </motion.nav>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden glass bg-light-bg/95! dark:bg-dark-bg/95! flex flex-col items-center justify-center gap-2"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`font-display text-3xl font-semibold py-3 transition-colors ${
                  activeHref === link.href
                    ? 'gradient-text'
                    : 'text-light-text dark:text-dark-text hover:opacity-70'
                }`}
                id={`mobile-nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
