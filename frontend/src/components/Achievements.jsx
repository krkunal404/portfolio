import { motion } from 'framer-motion';
import { HiTrophy } from 'react-icons/hi2';
import { HiAcademicCap, HiUserGroup } from 'react-icons/hi';

const award = {
  title: '1st Prize — Coding & Debugging Competition',
  org: 'Revelations, CHRIST (Deemed to be University)',
};

const leadership = {
  title: 'Event Head — Bid Wars',
  org: 'CHRIST (Deemed to be University), Bengaluru',
  description:
    'Led planning and on-ground execution, and coordinated participant teams and logistics.',
};

const certifications = [
  { id: 'cert-mysql', name: 'Mastering MySQL', issuer: 'Udemy (Uday Academy)' },
  { id: 'cert-mongodb', name: 'Introduction to MongoDB', issuer: 'MongoDB University' },
  { id: 'cert-python-intermediate', name: 'Intermediate Python', issuer: 'DataCamp' },
  { id: 'cert-python-datascience', name: 'Python for Data Science', issuer: 'Infosys Springboard' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Achievements() {
  return (
    <section id="achievements" aria-label="Achievements section" className="relative">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="section-eyebrow"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-light-text dark:bg-dark-text" />
          Recognition
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="section-title"
        >
          Achievements
        </motion.h2>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          transition={{ staggerChildren: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10"
        >
          {/* Featured award */}
          <motion.div
            variants={fadeUp}
            id="achievement-award"
            className="sm:col-span-2 glass-panel p-7 flex items-center gap-5 relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-brand-gradient opacity-10 blur-3xl" />
            <div className="relative w-14 h-14 shrink-0 rounded-2xl bg-light-text dark:bg-dark-text flex items-center justify-center text-light-bg dark:text-dark-bg shadow-xs">
              <HiTrophy size={26} />
            </div>
            <div className="relative">
              <p className="text-[10px] uppercase tracking-[0.25em] text-brand-purple dark:text-brand-cyan font-semibold mb-1">
                Award
              </p>
              <h3 className="font-display text-lg font-bold text-light-text dark:text-dark-text mb-0.5">
                {award.title}
              </h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">{award.org}</p>
            </div>
          </motion.div>

          {/* Leadership */}
          <motion.div
            variants={fadeUp}
            id="achievement-leadership"
            className="sm:col-span-2 glass-panel p-7 flex items-center gap-5 relative overflow-hidden"
          >
            <div className="relative w-14 h-14 shrink-0 rounded-2xl glass flex items-center justify-center text-brand-purple dark:text-brand-cyan">
              <HiUserGroup size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-brand-purple dark:text-brand-cyan font-semibold mb-1">
                Leadership
              </p>
              <h3 className="font-display text-lg font-bold text-light-text dark:text-dark-text mb-0.5">
                {leadership.title}
              </h3>
              <p className="text-sm text-light-muted dark:text-dark-muted">{leadership.org}</p>
            </div>
          </motion.div>

          {/* Certifications */}
          {certifications.map((cert) => (
            <motion.div key={cert.id} id={cert.id} variants={fadeUp} className="glass-card p-6 flex flex-col gap-3">
              <span className="w-10 h-10 rounded-xl glass flex items-center justify-center text-brand-purple dark:text-brand-cyan">
                <HiAcademicCap size={18} />
              </span>
              <div>
                <p className="text-sm font-semibold text-light-text dark:text-dark-text mb-0.5">
                  {cert.name}
                </p>
                <p className="text-xs text-light-muted dark:text-dark-muted">{cert.issuer}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
