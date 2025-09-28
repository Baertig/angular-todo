FROM node:22.18.0-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY client/package*.json ./client/

RUN npm ci

COPY client/ ./client/

WORKDIR /app/client
RUN npm run build

FROM nginx:1.27.2-alpine AS production

COPY client/nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/client/dist/client/browser /usr/share/nginx/html

# Expose port
EXPOSE 8080