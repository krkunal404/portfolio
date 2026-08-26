import { useState, useLayoutEffect, useCallback, useMemo } from 'react';
import { flushSync } from 'react-dom';
import { ThemeContext } from './themeContextObject';

const STORAGE_KEY = 'theme';
const THEME_COLORS = { dark: '#1d1d22', light: '#fbfbfb' };
const REVEAL_DURATION = 750;

function readStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // storage blocked (private mode, disabled cookies)
  }
}

function applyTheme(isDark) {
  const root = document.documentElement;
  root.classList.toggle('dark', isDark);
  root.style.colorScheme = isDark ? 'dark' : 'light';
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', isDark ? THEME_COLORS.dark : THEME_COLORS.light);
  try {
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
  } catch {
    // Non-critical: the choice just won't persist across visits.
  }
}

// Centre of the element that triggered the toggle (falls back to the navbar
// toggle, then the top-right corner) — the reveal circle grows from here.
function getRevealOrigin(event) {
  const candidates = [event?.currentTarget, document.getElementById('theme-toggle')];
  for (const el of candidates) {
    if (el instanceof Element) {
      const rect = el.getBoundingClientRect();
      if (rect.width && rect.height) {
        return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      }
    }
  }
  return { x: window.innerWidth - 40, y: 40 };
}

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    // Dark is this site's primary brand identity, matching the static
    // `class="dark"` already on <html> in index.html (avoids a flash).
    // Only an explicit prior choice overrides it — system preference is
    // deliberately not consulted, since most environments report a
    // default "light" preference even when the user never chose one.
    const stored = readStoredTheme();
    return stored ? stored === 'dark' : true;
  });

  // Layout effect so the class is on <html> before the View Transition
  // captures its "new" snapshot (flushSync runs layout effects synchronously).
  useLayoutEffect(() => {
    applyTheme(isDark);
  }, [isDark]);

  const toggleTheme = useCallback((event) => {
    const flip = () => flushSync(() => setIsDark((prev) => !prev));
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!document.startViewTransition || reduceMotion) {
      flip();
      return;
    }

    const { x, y } = getRevealOrigin(event);
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const root = document.documentElement;
    // Freeze colour transitions so the new snapshot is the final palette,
    // not a half-faded one.
    root.classList.add('theme-switching');

    const transition = document.startViewTransition(flip);

    transition.ready
      .then(() => {
        root.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${radius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: REVEAL_DURATION,
            easing: 'cubic-bezier(0.65, 0, 0.35, 1)',
            pseudoElement: '::view-transition-new(root)',
          }
        );
      })
      .catch(() => {});

    transition.finished.finally(() => root.classList.remove('theme-switching'));
  }, []);

  const value = useMemo(() => ({ isDark, toggleTheme }), [isDark, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
