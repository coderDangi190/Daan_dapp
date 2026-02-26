# --- deps ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- build ---
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# --- runner (small + production) ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# If your app uses server features, keep Next standalone output:
# We'll support both cases, but best is standalone.

# Copy needed files
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# If you have next.config enabling standalone output, this will exist:
# (recommended) see step below
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]