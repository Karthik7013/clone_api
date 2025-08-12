# Stage 1: Build dependencies
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

COPY . .

# Stage 2: Runtime
FROM node:18-alpine

# Install Tor and bash (bash is optional but helps debugging)
RUN apk add --no-cache tor bash

WORKDIR /app

COPY --from=builder /app .

EXPOSE 3000

# Start Tor and the Node.js server
CMD tor & node src/api/server.js
