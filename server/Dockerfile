FROM node:22.18.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY server/package*.json ./server/

# Install all workspace dependencies
RUN npm ci

COPY server/ ./server/

WORKDIR /app/server
RUN npm run build

FROM node:22.18.0-alpine AS production

WORKDIR /app

COPY package*.json ./
COPY server/package*.json ./server/

# Install production dependencies and drizzle to perform database migration on startup
RUN npm ci --omit=dev --workspace=server && npm install drizzle-kit && npm cache clean --force

COPY --from=builder /app/server/dist ./server/dist

# Copy drizzle config for migrations
COPY server/drizzle.config.ts ./server/
COPY server/src/db/schema.ts ./server/src/db/schema.ts
COPY server/.env.production ./server/.env

WORKDIR /app/server

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

RUN chown -R nodejs:nodejs /app
USER nodejs

EXPOSE 3000

CMD ["npm", "run", "serve"]