import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight, HiDownload, HiChevronDown } from "react-icons/hi";
import gsap from "gsap";
import { scrollToSection } from "../lib/lenis";
import { playSuccessSound } from "../lib/sound";
import MagneticButton from "./MagneticButton";
import Logo from "./Logo";

const ROLES = [
  "Full Stack Developer",
  "MCA Student",
  "Problem Solver",
  "API Craftsman",
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Hero({ revealed = false }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isNameHovered, setIsNameHovered] = useState(false);

  const heroSectionRef = useRef(null);
  const wordmarkRef = useRef(null);
  const auraRef = useRef(null);

  useEffect(() => {
    const t = setInterval(
      () => setRoleIndex((i) => (i + 1) % ROLES.length),
      2600,
    );
    return () => clearInterval(t);
  }, []);

  // GSAP 3D Parallax Mouse Movement effect
  useEffect(() => {
    const heroEl = heroSectionRef.current;
    if (!heroEl) return;

    const handleMouseMove = (e) => {
      const rect = heroEl.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5;
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      if (wordmarkRef.current) {
        gsap.to(wordmarkRef.current, {
          x: relX * 36,
          y: relY * 20,
          rotate: relX * 2,
          duration: 0.9,
          ease: "power2.out",
        });
      }

      if (auraRef.current) {
        gsap.to(auraRef.current, {
          x: relX * 50,
          y: relY * 30,
          duration: 1.1,
          ease: "power2.out",
        });
      }
    };

    const handleMouseLeave = () => {
      if (wordmarkRef.current) {
        gsap.to(wordmarkRef.current, {
          x: 0,
          y: 0,
          rotate: 0,
          duration: 1.2,
          ease: "power3.out",
        });
      }
      if (auraRef.current) {
        gsap.to(auraRef.current, {
          x: 0,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
        });
      }
    };

    heroEl.addEventListener("mousemove", handleMouseMove);
    heroEl.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      heroEl.removeEventListener("mousemove", handleMouseMove);
      heroEl.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const goToProjects = (e) => {
    e.preventDefault();
    scrollToSection("#projects");
  };

  const handleDownloadResume = () => {
    playSuccessSound();
  };

  return (
    <section
      ref={heroSectionRef}
      id="hero"
      className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden"
      aria-label="Hero section"
    >
      {/* Decorative glow field */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(50% 45% at 80% 8%, rgba(120,120,120,0.14), transparent 70%)",
        }}
      />

      <div className="px-6 sm:px-10 md:px-14 lg:px-24 xl:px-32 w-full relative">
        <div className="flex flex-col">
          {/* Layered typography */}
          <motion.div
            variants={container}
            initial="hidden"
            animate={revealed ? "show" : "hidden"}
            className="relative max-w-3xl"
          >
            {/* Fading radial red background aura on name hover with GSAP parallax */}
            <div
              ref={auraRef}
              className="pointer-events-none absolute -top-24 -left-16 w-[150%] h-[200%] rounded-full -z-10"
              aria-hidden="true"
            >
              <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_50%,rgba(239,68,68,0.2)_0%,rgba(220,38,38,0.1)_45%,transparent_75%)] blur-3xl transition-opacity duration-700 ease-out" />
              <div
                className={`absolute inset-0 rounded-full bg-[radial-gradient(circle_at_40%_50%,rgba(239,68,68,0.5)_0%,rgba(220,38,38,0.3)_45%,rgba(185,28,28,0.08)_70%,transparent_85%)] blur-3xl transition-opacity duration-700 ease-out ${
                  isNameHovered ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>

            {/* Giant ghost background wordmark — subtle red tone by default, dark glowing red on hover */}
            <span
              ref={wordmarkRef}
              aria-hidden="true"
              className="select-none absolute -top-16 -left-2 sm:-top-20 leading-none whitespace-nowrap cursor-pointer"
              onMouseEnter={() => setIsNameHovered(true)}
              onMouseLeave={() => setIsNameHovered(false)}
            >
              <motion.span
                animate={{
                  opacity: isNameHovered ? 0.95 : 0,
                  scale: isNameHovered ? 1.02 : 1,
                  filter: isNameHovered
                    ? "drop-shadow(0 0 55px rgba(239,68,68,0.85))"
                    : "drop-shadow(0 0 20px rgba(239,68,68,0))",
                }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 block font-display font-black text-[5.5rem] sm:text-[8rem] lg:text-[9.5rem] bg-linear-to-r from-red-600 via-rose-500 to-red-600 bg-clip-text text-transparent origin-center"
              >
                KUNNAL
              </motion.span>
              <span className="block font-display font-black text-[5.5rem] sm:text-[8rem] lg:text-[9.5rem] text-red-900/20 dark:text-red-500/25 drop-shadow-[0_0_20px_rgba(239,68,68,0.25)]">
                KUNNAL
              </span>
            </span>

            {/* Avatar badge + name */}
            <div
              className="relative flex items-center gap-5 sm:gap-7 mb-6 cursor-pointer group"
              onMouseEnter={() => setIsNameHovered(true)}
              onMouseLeave={() => setIsNameHovered(false)}
            >
              <motion.span
                variants={item}
                className="shrink-0 inline-flex transition-all duration-300 hover:drop-shadow-[0_0_26px_rgba(255,255,255,0.5)] dark:hover:drop-shadow-[0_0_26px_rgba(255,255,255,0.35)]"
              >
                <Logo className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20" />
              </motion.span>

              <div>
                <motion.p
                  variants={item}
                  className="section-eyebrow relative mb-1"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-light-text dark:bg-dark-text animate-pulse" />
                  Hi, I&rsquo;m
                </motion.p>
                <motion.h1
                  variants={item}
                  className="relative type-display text-display-lg"
                >
                  Kunnal
                </motion.h1>
              </div>
            </div>

            <motion.p
              variants={item}
              className="type-display text-display-md gradient-text mb-5 max-w-2xl"
            >
              I build solutions, not just code.
            </motion.p>

            <motion.div variants={item} className="h-6 mb-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={ROLES[roleIndex]}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="label-technical"
                >
                  {ROLES[roleIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-4 mt-10">
              <MagneticButton
                as="a"
                href="#projects"
                onClick={goToProjects}
                className="btn-primary"
                id="hero-view-projects"
              >
                Explore My Work <HiArrowRight size={16} />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/resume.pdf"
                download
                onClick={handleDownloadResume}
                className="btn-secondary"
                id="hero-download-resume"
              >
                Download Resume <HiDownload size={16} />
              </MagneticButton>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll cue */}
      <motion.button
        onClick={() => scrollToSection("#about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : 8 }}
        transition={{ delay: revealed ? 1.1 : 0, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="group absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-light-muted dark:text-dark-muted transition-colors hover:text-light-text dark:hover:text-dark-text focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-light-muted dark:focus-visible:ring-dark-muted focus-visible:ring-offset-4 focus-visible:ring-offset-light-bg dark:focus-visible:ring-offset-dark-bg"
        aria-label="Scroll to About section"
        id="hero-scroll-cue"
      >
        <span className="font-mono text-[9px] font-medium uppercase tracking-[0.24em]">
          Scroll to explore
        </span>
        <span className="relative flex h-10 w-5 justify-center overflow-hidden">
          <span className="absolute top-0 h-full w-px bg-light-border dark:bg-dark-border transition-colors group-hover:bg-light-muted dark:group-hover:bg-dark-muted" />
          <motion.span
            animate={{ y: [0, 22, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border border-light-muted bg-light-bg text-light-text dark:border-dark-muted dark:bg-dark-bg dark:text-dark-text"
          >
            <HiChevronDown size={11} />
          </motion.span>
        </span>
      </motion.button>
    </section>
  );
}
