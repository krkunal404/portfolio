import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

export default function SideGutterDecorations() {
  const { isDark } = useTheme();

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden select-none" aria-hidden="true">
      {/* Left Side Gutter Features */}
      <div className="hidden lg:flex flex-col items-center justify-between absolute left-3 xl:left-8 top-24 bottom-24 w-6">
        {/* Animated Laser Thread */}
        <div className="w-px h-full bg-linear-to-b from-transparent via-red-500/35 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'linear' }}
            className="w-full h-24 bg-linear-to-b from-transparent via-red-500 to-transparent shadow-[0_0_12px_rgba(239,68,68,0.8)]"
          />
        </div>

        {/* Vertical Rotated Text Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute top-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-light-muted/60 dark:text-dark-muted/60"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
          KUNNAL &bull; FULL STACK DEV
        </motion.div>
      </div>

      {/* Right Side Gutter Features */}
      <div className="hidden lg:flex flex-col items-center justify-between absolute right-3 xl:right-8 top-24 bottom-24 w-6">
        {/* Animated Laser Thread */}
        <div className="w-px h-full bg-linear-to-b from-transparent via-brand-cyan/35 to-transparent relative overflow-hidden">
          <motion.div
            animate={{ y: ['200%', '-100%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
            className="w-full h-24 bg-linear-to-b from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(56,189,248,0.8)]"
          />
        </div>

        {/* Vertical Rotated Text Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute top-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] uppercase text-light-muted/60 dark:text-dark-muted/60"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          SYS_STATUS &bull; ACTIVE
        </motion.div>
      </div>

      {/* Floating Accent Orbs in Outer Space */}
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          opacity: [0.2, 0.45, 0.2],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="hidden lg:block absolute -left-20 top-1/3 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, transparent 70%)',
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="hidden lg:block absolute -right-20 bottom-1/4 w-80 h-80 rounded-full blur-3xl"
        style={{
          background: isDark
            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
