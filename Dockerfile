FROM node:24.0.0-alpine

# Install SQLite with proper configuration
RUN apk add --no-cache \
    sqlite \
    sqlite-dev \
    && mkdir -p /var/tmp

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (don't use --only=production to include dev deps for debugging)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Create data directory with proper permissions
RUN mkdir -p /app/data && \
    chmod 755 /app/data && \
    chown -R node:node /app

# Switch to non-root user
USER node

EXPOSE 3000

CMD ["node", "--max-old-space-size=256", "dist/server.js"]