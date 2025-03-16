# Step 1: Use the official Node.js image as the base image
FROM node:18

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Step 4: Install dependencies (including production dependencies)
RUN npm install --production

# Step 5: Copy the rest of the application code to the container
COPY . .

# Step 6: Build the Next.js app
RUN npm run build

# Step 7: Expose the port (default Next.js port is 3000)
EXPOSE 3000

# Step 8: Start the Next.js app in production mode
CMD ["npm", "run", "start"]