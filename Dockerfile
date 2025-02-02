# Use Node.js image
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./

RUN npm install -g typescript

RUN npm install

# Copy application code
COPY . .

# Generate Prisma client (if using Prisma)
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "dev"]
