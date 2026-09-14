import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TechIcon from './TechIcon';

const NODES = [
  { id: 'react', name: 'React', category: 'Frontend', how: 'Primary frontend framework across every project — hooks, context, composition over inheritance.', projects: ['SkillSphere', 'Civitas', 'ProdTrack'] },
  { id: 'nextjs', name: 'Next.js', category: 'Frontend', how: 'Used for structuring larger frontend projects beyond a single-page app.', projects: [] },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', how: 'Design system and responsive layout for this site and others.', projects: [] },
  { id: 'node', name: 'Node.js', category: 'Backend', how: 'REST APIs and JWT-secured auth layers.', projects: ['SkillSphere', 'Civitas'] },
  { id: 'express', name: 'Express.js', category: 'Backend', how: 'Routing, middleware, and API structure for Node backends.', projects: ['SkillSphere', 'Civitas'] },
  { id: 'go', name: 'Go', category: 'Backend', how: 'Built the ProdTrack inventory API for speed and strict typing.', projects: ['ProdTrack'] },
  { id: 'jwt', name: 'JWT', category: 'Backend', how: 'Stateless auth across full-stack projects, paired with bcrypt hashing.', projects: ['SkillSphere', 'Civitas', 'ProdTrack'] },
  { id: 'bcrypt', name: 'bcrypt', category: 'Backend', how: 'Password hashing for credential storage in Go and Node backends.', projects: ['ProdTrack'] },
  { id: 'java', name: 'Java', category: 'Language', how: 'JDBC-backed applications and coursework.', projects: [] },
  { id: 'python', name: 'Python', category: 'Language', how: 'Data analysis coursework with Pandas, NumPy and Matplotlib.', projects: [] },
  { id: 'javascript', name: 'JavaScript', category: 'Language', how: 'The language under every React and Node project I ship.', projects: ['SkillSphere', 'Civitas', 'ProdTrack'] },
  { id: 'c', name: 'C', category: 'Language', how: 'Where I learned memory and pointers — coursework fundamentals.', projects: [] },
  { id: 'cplusplus', name: 'C++', category: 'Language', how: 'Data structures and algorithms practice.', projects: [] },
  { id: 'sql', name: 'SQL', category: 'Language', how: 'The query language behind every relational schema I design.', projects: [] },
  { id: 'mongodb', name: 'MongoDB', category: 'Database', how: 'Schema for civic issue reports, analytics dashboards, and SkillSphere’s user and roadmap data.', projects: ['SkillSphere', 'Civitas'] },
  { id: 'mysql', name: 'MySQL', category: 'Database', how: 'Structured schemas for relational records.', projects: [] },
  { id: 'sqlite', name: 'SQLite', category: 'Database', how: 'Lightweight local storage for smaller tools and prototypes.', projects: [] },
  { id: 'pandas', name: 'Pandas', category: 'Data & Analytics', how: 'Data wrangling and cleaning for coursework and analysis projects.', projects: [] },
  { id: 'numpy', name: 'NumPy', category: 'Data & Analytics', how: 'Numerical computing alongside Pandas.', projects: [] },
  { id: 'matplotlib', name: 'Matplotlib', category: 'Data & Analytics', how: 'Visualizing datasets and analysis results.', projects: [] },
  { id: 'git', name: 'Git', category: 'Tooling', how: 'Branching, history and collaboration on every project.', projects: [] },
  { id: 'github', name: 'GitHub', category: 'Tooling', how: 'Hosting and version control for every project’s source code.', projects: [] },
  { id: 'vscode', name: 'VS Code', category: 'Tooling', how: 'Daily editor — configured with linting, Tailwind IntelliSense, and Go tooling.', projects: [] },
  { id: 'powerbi', name: 'Power BI', category: 'Tooling', how: 'Turning coursework datasets into interactive dashboards.', projects: [] },
  { id: 'excel', name: 'MS Excel', category: 'Tooling', how: 'Fast pivot-table analysis for smaller datasets.', projects: [] },
];

const CATEGORIES = ['Language', 'Frontend', 'Backend', 'Database', 'Data & Analytics', 'Tooling'];

export default function Toolbox() {
  const [activeId, setActiveId] = useState(null);
  const active = useMemo(() => NODES.find((n) => n.id === activeId) ?? null, [activeId]);

  const grouped = useMemo(
    () => CATEGORIES.map((category) => ({ category, tools: NODES.filter((n) => n.category === category) })),
    []
  );

  const toggle = (id) => setActiveId((cur) => (cur === id ? null : id));

  return (
    <section id="toolbox" aria-label="Toolbox section" className="relative">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="section-eyebrow"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-light-text dark:bg-dark-text" />
          What I Reach For
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="section-title"
        >
          Toolbox
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-light-muted dark:text-dark-muted text-sm sm:text-base max-w-xl mb-10"
        >
          Tap a tool to see how I actually use it.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {grouped.map(({ category, tools }, i) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-panel p-5"
            >
              <p className="label-technical text-brand-purple dark:text-brand-cyan mb-3">{category}</p>
              <div className="flex flex-wrap gap-2">
                {tools.map((node) => {
                  const isActive = node.id === activeId;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      onClick={() => toggle(node.id)}
                      className={`flex items-center gap-2 pl-2.5 pr-3 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'border-brand-cyan bg-brand-cyan/10 text-light-text dark:text-dark-text'
                          : 'border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted hover:border-brand-purple/40 hover:text-light-text dark:hover:text-dark-text'
                      }`}
                      aria-pressed={isActive}
                      data-cursor-hover
                    >
                      <TechIcon name={node.name} size={16} className="shrink-0" />
                      {node.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 min-h-[92px]">
          <AnimatePresence mode="wait">
            {active ? (
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="glass-panel p-5"
              >
                <h3 className="font-display text-lg font-bold text-light-text dark:text-dark-text mb-1.5">
                  {active.name}
                </h3>
                <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed">{active.how}</p>
                {active.projects.length > 0 && (
                  <p className="text-xs text-light-muted dark:text-dark-muted mt-2">
                    Used in <span className="text-brand-purple dark:text-brand-cyan font-medium">{active.projects.join(', ')}</span>
                  </p>
                )}
              </motion.div>
            ) : (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-sm text-light-muted dark:text-dark-muted"
              >
                Twenty-five tools, one habit — pick the simplest one that solves the real problem.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
