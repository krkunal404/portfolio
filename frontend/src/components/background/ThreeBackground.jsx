import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../hooks/useTheme';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const BRAND_COLORS = [
  new THREE.Color('#38BDF8'), // Vibrant Cyan
  new THREE.Color('#EF4444'), // Crimson Red
  new THREE.Color('#F4F4F5'), // Luminous White
  new THREE.Color('#A1A1AA'), // Silver Slate
  new THREE.Color('#34D399'), // Emerald Green
];

export default function ThreeBackground() {
  const canvasRef = useRef(null);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const testCtx = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!testCtx) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 1.1, 6.5);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Expand particle field bounds wide so particles flow across side margins
    const PARTICLE_COUNT = window.innerWidth < 768 ? 600 : 1200;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const scales = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Wide spread across X (-28 to +28) to fill left & right side gutters
      positions[i * 3] = (Math.random() - 0.5) * 52;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16 - 2;

      const c = BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)];
      colors[i * 3] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      scales[i] = Math.random() * 0.8 + 0.4;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Perspective floor grid
    const grid = new THREE.GridHelper(50, 50, 0x737373, 0x333333);
    grid.position.y = -3.4;
    grid.material.transparent = true;
    grid.material.opacity = 0.22;
    scene.add(grid);

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();
    window.addEventListener('resize', setSize);

    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      targetMouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    if (!reducedMotion) window.addEventListener('pointermove', onPointerMove, { passive: true });

    let active = document.visibilityState === 'visible';
    const onVisibility = () => {
      active = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);

    let animationFrameId;
    const animate = () => {
      if (active) {
        mouse.x += (targetMouse.x - mouse.x) * 0.04;
        mouse.y += (targetMouse.y - mouse.y) * 0.04;

        if (particles) {
          particles.rotation.y = mouse.x * 0.15 + Date.now() * 0.0001;
          particles.rotation.x = mouse.y * 0.1 + Date.now() * 0.00008;
        }

        if (grid) {
          grid.position.x = mouse.x * 0.4;
        }

        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('visibilitychange', onVisibility);
      particleGeometry.dispose();
      particleMaterial.dispose();
      grid.geometry.dispose();
      grid.material.dispose();
      scene.remove(particles);
      scene.remove(grid);
      renderer.dispose();
      renderer.forceContextLoss?.();
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
