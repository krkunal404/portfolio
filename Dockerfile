# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
ARG VITE_API_URL=""
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build

# Stage 2: Install Backend Dependencies
FROM node:20-alpine AS backend-deps
WORKDIR /app/backend

COPY backend/package*.json ./
RUN npm ci --omit=dev

# Stage 3: Production Runtime
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Copy backend dependencies and backend source code
COPY --from=backend-deps /app/backend/node_modules ./backend/node_modules
COPY backend ./backend

# Copy built frontend assets to where backend/server.js expects them
COPY --from=frontend-builder /app/frontend/dist ./frontend/dist

# Ensure views data directory exists with write permissions
RUN mkdir -p /app/backend/data && chown -R node:node /app

USER node
WORKDIR /app/backend

EXPOSE 5000

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:5000/api/health || exit 1

CMD ["node", "server.js"]
