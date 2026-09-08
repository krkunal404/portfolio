const path = require('path');
// Load env explicitly from backend/.env so working directory differences never break it
require('dotenv').config({ path: path.join(__dirname, '.env'), quiet: true });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const contactRouter = require('./routes/contact');
const viewsRouter = require('./routes/views');

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

const hasEmailCredentials = Boolean(
  process.env.RESEND_API_KEY ||
  (process.env.SMTP_USER && process.env.SMTP_PASS) ||
  (process.env.EMAIL_USER && process.env.EMAIL_PASS)
);
if (!hasEmailCredentials) {
  console.warn('⚠️  Missing email credentials (RESEND_API_KEY or SMTP credentials) — contact form will be unavailable.');
}

// Behind a reverse proxy (Render, Railway, Nginx…) this makes req.ip the real
// client IP so rate limiting works per visitor. Set TRUST_PROXY=1 there.
if (process.env.TRUST_PROXY) {
  const hops = Number(process.env.TRUST_PROXY);
  app.set('trust proxy', Number.isNaN(hops) ? process.env.TRUST_PROXY : hops);
}

// Middleware
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
}));
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '20kb' }));

// Routes
app.use('/api/contact', contactRouter);
app.use('/api/views', viewsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve static frontend files if built
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDistPath));

// 404 handler for unmatched API routes
app.all('/api/{*splat}', (req, res) => {
  res.status(404).json({ message: 'API route not found' });
});

// SPA fallback for all non-API GET requests
app.get('{*splat}', (req, res, next) => {
  const indexPath = path.join(frontendDistPath, 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      next();
    }
  });
});

// Fallback 404 handler if frontend build is missing or for other HTTP methods
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);

  // Malformed JSON / oversized body from express.json()
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ message: 'Request body too large' });
  }

  console.error('[Error]', isProduction ? err.message : err);
  res.status(500).json({ message: 'Internal server error' });
});

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

// Finish in-flight requests before exiting when the host stops the process.
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    console.log(`${signal} received, shutting down…`);
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(1), 10_000).unref();
  });
}
