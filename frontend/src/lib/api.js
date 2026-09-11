// Single source of truth for the backend URL.
// Dev falls back to the local Express server; a production build with no
// VITE_API_URL assumes the API is served from the same origin (/api/...).
export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:5000' : '')
).replace(/\/+$/, '');
