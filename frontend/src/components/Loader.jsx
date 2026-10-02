import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Logo from './Logo';
import { useReducedMotion } from '../hooks/useReducedMotion';

const NAME = 'KUNNAL';

export default function Loader({ onRevealStart, onFinished }) {
  const reducedMotion = useReducedMotion();
  const onRevealStartRef = useRef(onRevealStart);
  const onFinishedRef = useRef(onFinished);
  const loaderRef = useRef(null);
  const nameOverlayRef = useRef(null);
  const markRef = useRef(null);
  const contentRef = useRef(null);
  const progressLineRef = useRef(null);
  const progressTextRef = useRef(null);
  const sweepBarRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    onRevealStartRef.current = onRevealStart;
    onFinishedRef.current = onFinished;
  }, [onRevealStart, onFinished]);

  useEffect(() => {
    if (reducedMotion) {
      onRevealStartRef.current?.();
      onFinishedRef.current?.();
      return;
    }

    const loaderEl = loaderRef.current;
    const nameOverlayEl = nameOverlayRef.current;
    const markEl = markRef.current;
    const contentEl = contentRef.current;
    const progressLineEl = progressLineRef.current;
    const progressTextEl = progressTextRef.current;
    const sweepBarEl = sweepBarRef.current;

    if (!loaderEl || !nameOverlayEl || !markEl) return;

    // Build GSAP Master Timeline for Buttery Smooth 60FPS Loading Sequence
    let fallbackTimer;
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        clearTimeout(fallbackTimer);
        onFinishedRef.current?.();
      },
    });

    // Fail-safe safety guard timer to guarantee loader finish after 2.5 seconds max
    fallbackTimer = setTimeout(() => {
      onRevealStartRef.current?.();
      onFinishedRef.current?.();
    }, 2500);

    const progressObj = { val: 0 };

    // 1. Initial State Setup
    gsap.set(markEl, { scale: 0.7, opacity: 0, y: -20 });
    gsap.set(nameOverlayEl, { clipPath: 'inset(0% 100% 0% 0%)' });
    gsap.set(sweepBarEl, { left: '0%', opacity: 1 });
    gsap.set(progressLineEl, { scaleX: 0, transformOrigin: 'left center' });
    if (progressTextEl) progressTextEl.textContent = '0%';

    // 2. Animate Logo Mark & Progress Line Entrance
    tl.to(markEl, { scale: 1, opacity: 1, y: 0, duration: 0.6 })
      .to(progressLineEl, { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, '-=0.4')
      .to(
        progressObj,
        {
          val: 100,
          duration: 1.2,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (progressTextEl) {
              progressTextEl.textContent = `${Math.round(progressObj.val)}%`;
            }
          },
        },
        '<-=0.1'
      );

    // 3. Sweep Name text from left to right smoothly with GSAP clipPath
    tl.to(
      nameOverlayEl,
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 0.9,
        ease: 'power3.inOut',
      },
      '-=1.0'
    ).to(
      sweepBarEl,
      {
        left: '100%',
        duration: 0.9,
        ease: 'power3.inOut',
      },
      '<'
    );

    // 4. Fade sweep indicator bar
    tl.to(sweepBarEl, { opacity: 0, duration: 0.2 }, '-=0.1');

    // 5. Trigger homepage reveal start
    tl.call(() => {
      onRevealStartRef.current?.();
    });

    // 6. Smooth GSAP Exit Transition
    tl.to(contentEl, { opacity: 0, y: -20, duration: 0.4, ease: 'power2.in' })
      .to(loaderEl, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.2');

    return () => {
      clearTimeout(fallbackTimer);
      tl.kill();
    };
  }, [reducedMotion]);

  // Ambient particle background
  useEffect(() => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width, height, particles, raf, frame = 0;

    const PARTICLE_COLORS = ['#FFFFFF', '#A1A1AA', '#71717A'];

    const makeParticle = (initial) => ({
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 10,
      size: 1 + Math.random() * 1.5,
      speed: 0.2 + Math.random() * 0.4,
      color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
      flickerPhase: Math.random() * Math.PI * 2,
    });

    const setup = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      const count = Math.min(40, Math.floor((width * height) / 30000));
      particles = Array.from({ length: count }, () => makeParticle(true));
    };
    setup();

    const draw = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.y -= p.speed;
        const fade = Math.max(0, Math.min(1, p.y / (height * 0.7)));
        const flicker = 0.4 + 0.4 * Math.sin(frame * 0.04 + p.flickerPhase);
        ctx.save();
        ctx.globalAlpha = fade * flicker * 0.5;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        if (p.y < -10) Object.assign(p, makeParticle(false));
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => setup();
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={loaderRef}
      id="app-loader"
      className="fixed inset-0 z-100 overflow-hidden text-slate-100 will-change-[opacity]"
      style={{
        background:
          'radial-gradient(ellipse 60% 50% at 50% 42%, rgba(255,255,255,0.08), transparent 65%), #0A0A0C',
      }}
    >
      {!reducedMotion && <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />}
      <div className="grid-texture absolute inset-0 opacity-[0.05] text-white" aria-hidden="true" />

      <div ref={contentRef} className="relative h-full flex flex-col items-center justify-center gap-5 px-6">
        {/* Logo Mark */}
        <div ref={markRef} className="w-10 h-10 flex items-center justify-center">
          <Logo className="w-10 h-10 text-white" />
        </div>

        {/* GSAP Smooth Name Reveal */}
        <div
          className="relative font-display font-bold leading-none tracking-tight text-center select-none"
          style={{ fontSize: 'clamp(3rem, 11vw, 7rem)', transformOrigin: 'center' }}
        >
          {/* Base Ghost Text */}
          <span className="text-white/6" aria-hidden="true">
            {NAME}
          </span>

          {/* GSAP Clip-Path Swept Text */}
          <span
            ref={nameOverlayRef}
            className="absolute inset-0 bg-linear-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent"
          >
            {NAME}
          </span>

          {/* Sweep Light Bar */}
          {!reducedMotion && (
            <span
              ref={sweepBarRef}
              className="absolute top-0 bottom-0 w-px -translate-x-1/2 bg-white shadow-[0_0_16px_2px_rgba(255,255,255,0.8)] pointer-events-none"
              aria-hidden="true"
            />
          )}
        </div>

        {/* Subtitle Details */}
        <div className="flex flex-col items-center gap-1.5 opacity-80">
          <p className="label-technical text-xs tracking-[0.25em] text-slate-300">Full-Stack Developer</p>
          <p className="text-[11px] tracking-[0.15em] text-slate-400">Bengaluru, India &bull; MCA &rsquo;25&ndash;27</p>
        </div>

        {/* GSAP Progress Line */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 w-48">
          <div className="w-full h-0.5 bg-slate-800 rounded-full overflow-hidden">
            <div ref={progressLineRef} className="h-full bg-white rounded-full" />
          </div>
          <p ref={progressTextRef} className="numeral text-[10px] text-slate-400 tracking-wider">
            0%
          </p>
        </div>
      </div>
    </div>
  );
}
