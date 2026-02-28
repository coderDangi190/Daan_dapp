# --- deps ---
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# --- build ---
FROM node:20-alpine AS builder
WORKDIR /app

# ✅ Accept build-time variables from GitHub Actions (docker build --build-arg ...)
ARG NEXT_PUBLIC_THIRDWEB_CLIENT_ID
ARG NEXT_PUBLIC_RPC_URL
ARG NEXT_PUBLIC_CONTRACT_ADDRESS

# ✅ Make them available during "npm run build"
ENV NEXT_PUBLIC_THIRDWEB_CLIENT_ID=$NEXT_PUBLIC_THIRDWEB_CLIENT_ID
ENV NEXT_PUBLIC_RPC_URL=$NEXT_PUBLIC_RPC_URL
ENV NEXT_PUBLIC_CONTRACT_ADDRESS=$NEXT_PUBLIC_CONTRACT_ADDRESS

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# --- runner (small + production) ---
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy needed files
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Standalone output (recommended)
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]