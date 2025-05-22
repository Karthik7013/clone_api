# Stage 1: Build dependencies
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package files to install deps first (cache efficiency)
COPY package*.json ./

# Install only production dependencies
RUN npm install --omit=dev

# Copy application source
COPY . .

# Stage 2: Runtime
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy only needed files from builder
COPY --from=builder /app .

# Expose application port
EXPOSE 3000

# Run the application
CMD ["node", "src/api/server.js"]