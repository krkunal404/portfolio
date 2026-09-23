import { motion } from 'framer-motion';
import { FiCpu, FiCompass, FiLayers, FiZap, FiBookOpen } from 'react-icons/fi';

const TOPICS = [
  {
    title: 'LLM-Powered Applications',
    category: 'Applied AI & Agents',
    status: 'In Progress',
    description: 'Experimenting with multi-agent orchestration, structured JSON outputs, function calling, and latency-optimized RAG pipelines.',
    technologies: ['Gemini API', 'LangChain', 'Vector DBs', 'Prompt Engineering'],
    icon: <FiCpu className="text-xl text-brand-purple dark:text-brand-cyan" />,
  },
  {
    title: 'Go & High Concurrency',
    category: 'Systems & Backend',
    status: 'Deep Dive',
    description: 'Exploring goroutines, worker pools, mutex synchronization, and high-throughput microservices beyond standard Node runtimes.',
    technologies: ['Golang', 'Goroutines', 'Channels', 'REST APIs'],
    icon: <FiZap className="text-xl text-amber-500 dark:text-amber-400" />,
  },
  {
    title: 'Scalable System Design',
    category: 'Architecture',
    status: 'Reading & Designing',
    description: 'Deep diving into distributed caching strategies, database sharding, idempotent event systems, and rate-limiting patterns.',
    technologies: ['Redis', 'Event-Driven', 'CAP Theorem', 'Load Balancing'],
    icon: <FiLayers className="text-xl text-indigo-500 dark:text-indigo-400" />,
  },
  {
    title: 'Next.js 15 & Server Components',
    category: 'Modern Web Stack',
    status: 'Building Prototypes',
    description: 'Leveraging streaming SSR, Partial Prerendering (PPR), Server Actions, and fine-grained React 19 concurrent features.',
    technologies: ['Next.js 15', 'React Server Components', 'Turbopack', 'Vercel AI SDK'],
    icon: <FiCompass className="text-xl text-emerald-500 dark:text-emerald-400" />,
  },
];

const READING_LIST = [
  'Designing Data-Intensive Applications (Martin Kleppmann)',
  'System Design Interview (Alex Xu)',
  'Concurrency in Go (Katherine Cox-Buday)',
];

export default function CurrentlyExploring() {
  return (
    <section id="exploring" aria-label="Currently exploring section" className="relative border-t border-light-border dark:border-dark-border">
      <div className="section-container !min-h-0 py-20 sm:py-28 !border-t-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="section-eyebrow"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-purple dark:bg-brand-cyan opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-purple dark:bg-brand-cyan" />
              </span>
              Continuous Growth
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="section-title mb-3"
            >
              What I&rsquo;m Exploring Now
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base text-light-muted dark:text-dark-muted max-w-xl leading-relaxed"
            >
              Technologies and engineering concepts I am actively experimenting with, reading up on, and incorporating into personal lab projects.
            </motion.p>
          </div>
        </div>

        {/* 4 Cards Grid - Balanced and informative */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {TOPICS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="glass-card p-6 sm:p-7 flex flex-col justify-between group/card hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border group-hover/card:scale-105 transition-transform">
                      {item.icon}
                    </div>
                    <div>
                      <span className="font-mono text-xs uppercase tracking-wider text-light-muted dark:text-dark-muted font-medium block">
                        {item.category}
                      </span>
                      <h3 className="font-display text-lg sm:text-xl font-semibold text-light-text dark:text-dark-text">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-mono bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-brand-purple dark:text-brand-cyan font-medium whitespace-nowrap">
                    {item.status}
                  </span>
                </div>
                <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed mb-5">
                  {item.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-3 border-t border-light-border/60 dark:border-dark-border/60">
                {item.technologies.map((tech) => (
                  <span key={tech} className="skill-tag text-xs px-2.5 py-0.5">
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Reading List Banner */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="glass-card p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border text-light-text dark:text-dark-text">
              <FiBookOpen className="text-lg" />
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-wider text-light-muted dark:text-dark-muted font-medium">Current Reading Stack</p>
              <p className="text-sm font-semibold text-light-text dark:text-dark-text">Engineering literature on the desk</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-light-muted dark:text-dark-muted">
            {READING_LIST.map((book, idx) => (
              <span key={book} className="inline-flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border font-medium">
                  {book}
                </span>
                {idx < READING_LIST.length - 1 && <span className="opacity-40">•</span>}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
