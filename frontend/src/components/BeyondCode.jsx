import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

const NOTES = [
  {
    id: 'note-failure',
    label: 'What a failure taught me',
    body: 'I shipped an early auth flow having only tested the happy path — a stale JWT failed silently and looked like a network bug, not an auth one. Now I test token expiry and invalid-input paths before I test the feature working at all.',
  },
  {
    id: 'note-decision',
    label: 'A decision I’d defend',
    body: 'I built ProdTrack’s API in Go instead of reaching for Node again, even mid-project. Relearning idioms cost time upfront, but static typing and simpler concurrency caught bugs at compile time that would’ve been runtime surprises otherwise.',
  },
  {
    id: 'note-learning',
    label: 'What I’m still figuring out',
    body: 'Where to draw the line between calling an LLM for every step versus a cached, rules-based shortcut. Gemini AI makes SkillSphere’s roadmaps feel genuinely personalized — I’m still learning when that’s worth the added latency and cost.',
  },
];

export default function BeyondCode() {
  return (
    <section id="beyond-code" aria-label="Beyond code section" className="relative">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="section-eyebrow"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-light-text dark:bg-dark-text" />
          The Person Behind It
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="section-title max-w-2xl"
        >
          Beyond Code
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid md:grid-cols-3 gap-6 mt-10"
        >
          {NOTES.map((note) => (
            <motion.div key={note.id} id={note.id} variants={fadeUp} className="glass-panel p-7 flex flex-col gap-3">
              <p className="label-technical text-brand-purple dark:text-brand-cyan">{note.label}</p>
              <p className="text-sm text-light-muted dark:text-dark-muted leading-relaxed italic">{note.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
