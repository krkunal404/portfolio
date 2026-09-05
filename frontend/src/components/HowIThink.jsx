import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const STEPS = [
  {
    id: "discover",
    n: "01",
    title: "Discover",
    body: "Sit with the problem before touching the keyboard — who hits it, how often, and what they do today instead.",
  },
  {
    id: "think",
    n: "02",
    title: "Think",
    body: "Sketch two or three shapes the solution could take, and pick the one that fails safely, not just the one that works first.",
  },
  {
    id: "build",
    n: "03",
    title: "Build",
    body: "Design the data model and API contract first. The UI is the easy part once the system underneath is honest.",
  },
  {
    id: "test",
    n: "04",
    title: "Test",
    body: "Break it on purpose — bad input, slow networks, concurrent writes — before a user finds the crack for me.",
  },
  {
    id: "improve",
    n: "05",
    title: "Improve",
    body: "Ship, then read the seams: what took longest to build is usually what needs simplifying next.",
  },
];

export default function HowIThink() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 70%", "end 50%"],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 110, damping: 28 });

  return (
    <section
      id="thinking"
      aria-label="How I turn ideas into products"
      className="relative"
    >
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="section-eyebrow"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-light-text dark:bg-dark-text" />
          Process
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="section-title max-w-2xl"
        >
          How I Turn Ideas Into Products
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="type-body-muted max-w-xl"
        >
          I reduce uncertainty before I write code, then build systems that stay
          honest under pressure.
        </motion.p>

        <div
          ref={containerRef}
          className="relative mx-auto mt-12 w-full max-w-6xl px-2 sm:mt-16 sm:px-6 lg:px-10"
        >
          <div className="absolute left-[15px] sm:left-1/2 top-2 bottom-2 w-px bg-light-border/80 dark:bg-dark-border/80 sm:-translate-x-1/2" />
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: "top" }}
            className="absolute left-[15px] sm:left-1/2 top-2 bottom-2 w-0.5 bg-brand-gradient sm:-translate-x-1/2"
          />

          <div className="flex flex-col gap-10 sm:gap-0">
            {STEPS.map((step, i) => {
              const alignRight = i % 2 === 1;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className={`relative flex sm:items-center gap-6 sm:gap-0 sm:py-7 lg:py-9 ${
                    alignRight ? "sm:flex-row-reverse" : "sm:flex-row"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-0 sm:left-1/2 top-0 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-10">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, amount: 0.8 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className="w-9 h-9 rounded-full bg-light-bg dark:bg-dark-bg flex items-center justify-center border border-brand-purple/50 dark:border-brand-cyan/50 shadow-xs"
                    >
                      <span className="numeral text-micro font-semibold text-brand-purple dark:text-brand-cyan">
                        {step.n}
                      </span>
                    </motion.div>
                  </div>

                  <div className="flex-1 pl-12 sm:pl-0" />
                  <div
                    className={`flex-1 pl-12 sm:pl-0 ${alignRight ? "sm:pr-14 sm:text-right" : "sm:pl-14"}`}
                  >
                    <div
                      className={`group relative inline-block w-full sm:max-w-md border-b border-light-border dark:border-dark-border py-5 transition-transform duration-300 hover:-translate-y-1 ${
                        alignRight ? "sm:ml-auto" : ""
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`absolute top-1/2 hidden h-px w-10 bg-light-border dark:bg-dark-border sm:block ${
                          alignRight ? "-right-10" : "-left-10"
                        }`}
                      />
                      <p className="type-meta mb-2">{step.id}</p>
                      <h3 className="type-display text-2xl mb-2">
                        {step.title}
                      </h3>
                      <p className="type-body-muted max-w-md">{step.body}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
