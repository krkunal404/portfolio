import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis;

export function getLenis() {
  if (lenis) return lenis;

  lenis = new Lenis({
    duration: 0.85,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export function destroyLenis() {
  if (!lenis) return;
  lenis.destroy();
  lenis = null;
}

function getHeaderOffset() {
  const header = document.querySelector('header');
  return header ? header.getBoundingClientRect().height + 28 : 28;
}

export function scrollToSection(target) {
  const element = typeof target === 'string' ? document.querySelector(target) : target;
  if (!element) return;

  const top = Math.max(
    0,
    element.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
  );
  const activeLenis = getLenis();
  activeLenis.stop();
  window.scrollTo({ top, behavior: 'smooth' });
  window.setTimeout(() => activeLenis.start(), 700);
}

export function scrollToTop() {
  const activeLenis = getLenis();
  activeLenis.stop();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  window.setTimeout(() => activeLenis.start(), 700);
}
