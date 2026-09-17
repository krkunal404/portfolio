import { useRef } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useReducedMotion, useCoarsePointer } from './useReducedMotion';

export function useTilt({ max = 10 } = {}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const coarse = useCoarsePointer();
  const disabled = reducedMotion || coarse;

  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), { stiffness: 260, damping: 24 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), { stiffness: 260, damping: 24 });
  const glowX = useTransform(px, [0, 1], ['0%', '100%']);
  const glowY = useTransform(py, [0, 1], ['0%', '100%']);

  const onMouseMove = (e) => {
    if (disabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width);
    py.set((e.clientY - rect.top) / rect.height);
  };

  const onMouseLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return {
    ref,
    disabled,
    style: disabled ? undefined : { rotateX, rotateY, transformPerspective: 900 },
    glowX,
    glowY,
    onMouseMove,
    onMouseLeave,
  };
}
