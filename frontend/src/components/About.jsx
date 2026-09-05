import { motion } from 'framer-motion';

const education = [
  {
    degree: 'Master of Computer Applications',
    org: 'CHRIST (Deemed to be University), Bengaluru',
    meta: '2025 – Present',
  },
  {
    degree: 'Bachelor of Computer Applications',
    org: 'LN Mishra Institute, Patna',
    meta: '8.47/10 · 2021 – 2024',
  },
];

const highlights = [
  { title: '1st Prize — Coding & Debugging', org: 'Revelations, CHRIST University', meta: '' },
  { title: 'Frontend Intern', org: 'Rays Edutech · Remote', meta: 'Jan – Mar 2024' },
  { title: '3 Full-Stack Apps Shipped', org: 'React · Node · Go · MongoDB', meta: '' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

function DividerLabel({ children }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-light-muted dark:text-dark-muted">
        {children}
      </span>
      <div className="grow border-b border-dotted border-light-border dark:border-dark-border" />
    </div>
  );
}

function ListRow({ title, org, meta }) {
  return (
    <div className="group flex items-start justify-between gap-4 border-b border-light-border/60 dark:border-dark-border/60 py-3 transition-transform duration-300 ease-out hover:translate-x-1">
      <div className="min-w-0">
        <span className="text-light-text dark:text-dark-text font-semibold text-sm">{title}</span>
        {org && (
          <span className="text-light-muted dark:text-dark-muted text-sm transition-colors duration-300 group-hover:text-light-text dark:group-hover:text-dark-text">
            {' '}
            — {org}
          </span>
        )}
      </div>
      {meta && (
        <span className="font-mono text-light-muted dark:text-dark-muted text-xs shrink-0 whitespace-nowrap pt-0.5">
          {meta}
        </span>
      )}
    </div>
  );
}

export default function About() {
  return (
    <section id="about" aria-label="About section" className="relative">
      <div className="section-container">
        <motion.p
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="section-eyebrow"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-light-text dark:bg-dark-text" />
          Get to know me
        </motion.p>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          className="section-title max-w-2xl"
        >
          Curious by default. Obsessed with making things work.
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mt-12 w-full border-t border-light-border dark:border-dark-border pt-8 sm:pt-10"
        >
          <p className="max-w-4xl font-mono text-sm sm:text-[15px] leading-relaxed text-light-muted dark:text-dark-muted">
            I build full-stack products end to end — React and Next.js on the frontend, Node.js,
            Express and Go underneath. I care about systems that fail safely more than ones that
            just work on the first try, and I&rsquo;d rather ship something small and correct than
            something large and fragile.
          </p>

          <div className="grid sm:grid-cols-2 gap-x-10 gap-y-10 mt-10">
            <div>
              <DividerLabel>Education</DividerLabel>
              <div className="flex flex-col">
                {education.map((e) => (
                  <ListRow key={e.degree} title={e.degree} org={e.org} meta={e.meta} />
                ))}
              </div>
            </div>
            <div className="sm:border-l sm:border-light-border sm:dark:border-dark-border sm:pl-10">
              <DividerLabel>Highlights</DividerLabel>
              <div className="flex flex-col">
                {highlights.map((h) => (
                  <ListRow key={h.title} title={h.title} org={h.org} meta={h.meta} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
