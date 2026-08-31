import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useReducedMotion, useCoarsePointer } from '../hooks/useReducedMotion';

const MOTION_TAGS = { a: motion.a, button: motion.button };

export default function MagneticButton({ as = 'a', className = '', children, strength = 0.35, ...props }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const coarse = useCoarsePointer();
  const disabled = reducedMotion || coarse;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  const handleMouseMove = (e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Component = MOTION_TAGS[as] ?? motion.a;

  return (
    <Component
      ref={ref}
      style={disabled ? undefined : { x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileTap={{ scale: 0.94 }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}
