import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi';

const timeline = [
  {
    id: 'edu-christ',
    type: 'education',
    title: 'Master of Computer Applications',
    org: 'CHRIST (Deemed to be University), Bengaluru',
    period: 'Jul 2025 – Present',
    current: true,
    bullets: ['Batch 2025–27, building on a strong full-stack foundation.'],
  },
  {
    id: 'exp-rays-edutech',
    type: 'work',
    title: 'Frontend Intern',
    org: 'Rays Edutech · Remote',
    period: 'Jan 2024 – Mar 2024',
    current: false,
    bullets: [
      'Developed and maintained responsive web pages using HTML, CSS, and JavaScript.',
      'Assisted in developing and testing new web features alongside the engineering team.',
      'Collaborated with team members on debugging and improving overall code quality.',
    ],
  },
  {
    id: 'edu-lnmi',
    type: 'education',
    title: 'Bachelor of Computer Applications',
    org: 'LN Mishra Institute of Economic Development and Social Change, Patna',
    period: 'Jul 2021 – May 2024',
    current: false,
    bullets: ['Graduated with a CGPA of 8.47 / 10.0.'],
  },
];

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 55%'],
  });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" aria-label="Experience and education timeline" className="relative">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="section-eyebrow"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-light-text dark:bg-dark-text" />
          My Journey
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="section-title"
        >
          Experience &amp; Education
        </motion.h2>

        <div ref={containerRef} className="relative mt-10">
          {/* Track */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-light-border dark:bg-dark-border" />
          {/* Animated progress line */}
          <motion.div
            style={{ scaleY: lineScale, transformOrigin: 'top' }}
            className="absolute left-[19px] top-2 bottom-2 w-px bg-brand-gradient"
          />

          <div className="flex flex-col gap-12">
            {timeline.map((entry, i) => (
              <motion.div
                key={entry.id}
                id={entry.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="flex gap-6 relative"
              >
                {/* Node */}
                <div className="shrink-0 relative z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border ${
                      entry.current
                        ? 'bg-light-text dark:bg-dark-text border-transparent text-light-bg dark:text-dark-bg shadow-xs'
                        : 'glass border-light-border dark:border-dark-border text-brand-purple dark:text-brand-cyan'
                    }`}
                  >
                    {entry.type === 'work' ? <HiBriefcase size={16} /> : <HiAcademicCap size={16} />}
                  </div>
                </div>

                {/* Content */}
                <div className="glass-card p-5 sm:p-6 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="text-xs font-medium text-light-muted dark:text-dark-muted tracking-wide">
                      {entry.period}
                    </span>
                    {entry.current && (
                      <span className="skill-tag text-[10px] py-0.5">Current</span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-bold text-light-text dark:text-dark-text mb-0.5">
                    {entry.title}
                  </h3>
                  <p className="text-sm font-semibold text-brand-purple dark:text-brand-cyan mb-3">
                    {entry.org}
                  </p>
                  <ul className="flex flex-col gap-1.5">
                    {entry.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-sm text-light-muted dark:text-dark-muted leading-relaxed list-disc list-inside marker:text-brand-purple/60 dark:marker:text-brand-cyan/60"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
