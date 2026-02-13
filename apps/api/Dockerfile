# syntax=docker/dockerfile:1

FROM node:20-alpine AS deps
WORKDIR /app

# Copy only package metadata needed for npm ci
COPY package*.json ./
COPY apps/api/package*.json apps/api/

# Install production deps (supports local file dependency ../../)
RUN cd apps/api && npm ci --omit=dev

FROM node:20-alpine AS runner
WORKDIR /app/apps/api
ENV NODE_ENV=production
ENV PORT=5000

# Bring in installed node_modules and source code
COPY --from=deps /app/apps/api/node_modules ./node_modules
COPY apps/api .

EXPOSE 5000
HEALTHCHECK --interval=30s --timeout=5s --retries=3 CMD wget -qO- http://localhost:5000/health || exit 1

CMD ["node", "server.js"]
