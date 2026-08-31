import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion, useCoarsePointer } from '../hooks/useReducedMotion';

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, [role="button"], [data-cursor-hover]';

export default function CustomCursor() {
  const reducedMotion = useReducedMotion();
  const coarse = useCoarsePointer();
  const enabled = !reducedMotion && !coarse;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // Dot directly follows mouse coordinates with 0 lag (true 1:1 mouse speed)
  const dotX = x;
  const dotY = y;
  // Snappy responsive outer ring with light trailing momentum
  const ringX = useSpring(x, { stiffness: 800, damping: 45, mass: 0.1 });
  const ringY = useSpring(y, { stiffness: 800, damping: 45, mass: 0.1 });

  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      document.body.classList.remove('cursor-active');
      return;
    }
    document.body.classList.add('cursor-active');

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const onOver = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(true);
      const labelTarget = e.target.closest?.('[data-cursor-text]');
      if (labelTarget) setLabel(labelTarget.dataset.cursorText);
    };
    const onOut = (e) => {
      if (e.target.closest?.(INTERACTIVE_SELECTOR)) setHovering(false);
      if (e.target.closest?.('[data-cursor-text]')) setLabel('');
    };
    const onLeaveWindow = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver);
    document.addEventListener('pointerout', onOut);
    document.addEventListener('mouseleave', onLeaveWindow);

    return () => {
      document.body.classList.remove('cursor-active');
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.removeEventListener('mouseleave', onLeaveWindow);
    };
  }, [enabled, x, y, visible]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 z-90 pointer-events-none" aria-hidden="true">
      <motion.div
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0 : 1 }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brand-purple dark:bg-brand-cyan"
      />
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: label ? 1 : hovering ? 2.2 : 1,
          backgroundColor: hovering && !label ? 'rgba(120,120,120,0.14)' : 'rgba(120,120,120,0)',
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-brand-purple/60 dark:border-brand-cyan/60"
      />
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && label ? 1 : 0, scale: label ? 1 : 0.85 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 whitespace-nowrap px-3.5 py-2 rounded-full bg-brand-gradient text-white text-xs font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
      >
        {label}
      </motion.div>
    </div>
  );
}
