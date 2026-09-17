import { useState } from 'react';
import { AnimatePresence, motion, useMotionTemplate } from 'framer-motion';
import { FiGithub, FiArrowUpRight, FiChevronDown } from 'react-icons/fi';
import { useTilt } from '../hooks/useTilt';

export default function ProjectCase({ project }) {
  const [open, setOpen] = useState(false);
  const { ref, disabled, style, glowX, glowY, onMouseMove, onMouseLeave } = useTilt({ max: 6 });
  const glowBackground = useMotionTemplate`radial-gradient(360px circle at ${glowX} ${glowY}, rgba(120,120,120,0.2), transparent 70%)`;

  return (
    <article id={project.id} className="border-t border-light-border dark:border-dark-border py-14 sm:py-20 group/case">
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Number + meta */}
        <div className="lg:col-span-2 flex lg:flex-col items-baseline lg:items-start gap-3">
          <span className="numeral text-4xl sm:text-5xl font-bold text-light-border dark:text-dark-border transition-colors duration-500 group-hover/case:text-brand-purple/40 dark:group-hover/case:text-brand-cyan/40">
            {project.number}
          </span>
          <p className="label-technical">{project.category}</p>
        </div>

        {/* Content */}
        <div className="lg:col-span-6 flex flex-col gap-4">
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-light-text dark:text-dark-text">
            {project.title}
          </h3>
          <p className="text-light-muted dark:text-dark-muted text-base leading-relaxed max-w-lg">
            {project.summary}
          </p>

          <div className="flex flex-wrap gap-2 mt-1">
            {project.tags.map((tag) => (
              <span key={tag} className="skill-tag text-xs px-2.5 py-1">
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-5 mt-3">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor-hover
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-light-text dark:text-dark-text hover:text-brand-purple dark:hover:text-brand-cyan transition-colors"
            >
              <FiGithub size={14} /> Source Code
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-hover
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-light-text dark:text-dark-text hover:text-brand-purple dark:hover:text-brand-cyan transition-colors"
              >
                Live Demo <FiArrowUpRight size={14} />
              </a>
            )}
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              data-cursor-hover
              aria-expanded={open}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple dark:text-brand-cyan"
            >
              {open ? 'Hide case study' : 'View case study'}
              <FiChevronDown size={14} className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

        {/* Visual */}
        <motion.div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          onClick={() => setOpen((o) => !o)}
          style={style}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setOpen((o) => !o)}
          data-cursor-hover
          data-cursor-text={open ? 'Hide Case Study ←' : 'View Case Study →'}
          className="lg:col-span-4 relative aspect-4/3 rounded-2xl overflow-hidden glass-panel cursor-pointer transform-3d"
        >
          {!disabled && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10"
              style={{ background: glowBackground }}
            />
          )}
          <div className="absolute inset-0 bg-linear-to-br from-brand-purple/15 via-brand-blue/10 to-transparent" />
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_25%_20%,rgba(120,120,120,0.3),transparent_55%)]" />
          <div className="relative h-full flex items-center justify-center text-brand-purple dark:text-brand-cyan">
            <span className="transition-transform duration-500 ease-out group-hover/case:scale-110 group-hover/case:-rotate-3">
              {project.icon}
            </span>
          </div>
        </motion.div>
      </div>

      {/* Case study detail */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
              {[
                { label: 'The Problem', tag: 'CHALLENGE', text: project.problem, badge: 'text-rose-500 bg-rose-500/10 border-rose-500/20' },
                { label: 'The Idea', tag: 'CONCEPT', text: project.idea, badge: 'text-amber-500 bg-amber-500/10 border-amber-500/20' },
                { label: 'The Build', tag: 'TECH STACK', text: project.build, badge: 'text-indigo-500 bg-indigo-500/10 border-indigo-500/20' },
                { label: 'The Result', tag: 'OUTCOME', text: project.result, badge: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20' },
              ].map(({ label, tag, text, badge }) => (
                <div
                  key={label}
                  className="glass-card rounded-2xl p-5 sm:p-6 flex flex-col justify-between aspect-square min-h-[220px] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group/item"
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-mono tracking-wider font-semibold uppercase px-2.5 py-1 rounded-full border ${badge}`}>
                      {tag}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-light-muted dark:bg-dark-muted opacity-30 group-hover/item:opacity-80 transition-opacity" />
                  </div>

                  <div className="my-auto py-2">
                    <h4 className="font-display text-base font-semibold text-light-text dark:text-dark-text mb-2">
                      {label}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-light-muted dark:text-dark-muted leading-relaxed line-clamp-5">
                      {text}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-light-border/40 dark:border-dark-border/40 flex justify-end">
                    <span className="text-[11px] font-mono text-light-muted dark:text-dark-muted opacity-60">
                      Case Study
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
