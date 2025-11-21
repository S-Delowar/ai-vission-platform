# ---------------------------
# Next.js Frontend Dockerfile
# ---------------------------
FROM node:20-slim

# Set working directory
WORKDIR /app

# Install dependencies first (cache optimization)
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose Next.js port
EXPOSE 3000

# Start Next.js production server
CMD ["npm", "start"]
