# Use Node.js official image
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire project
COPY . .

# Build the project
RUN npm run build

# Use a lightweight web server for static files
FROM node:18-alpine
WORKDIR /app

# Copy the built files from the builder stage
COPY --from=builder /app ./

# Install production dependencies
RUN npm install --production

# Expose port (Next.js default is 3000)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]