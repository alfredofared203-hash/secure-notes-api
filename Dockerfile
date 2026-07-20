# ==========================
# Base Image
# ==========================
FROM node:18

# ==========================
# Working Directory
# ==========================
WORKDIR /app

# ==========================
# Copy package files
# ==========================
COPY package*.json ./

# ==========================
# Install dependencies
# ==========================
RUN npm install

# ==========================
# Copy project files
# ==========================
COPY . .

# ==========================
# Expose application port
# ==========================
EXPOSE 3000

# ==========================
# Start application
# ==========================
CMD ["node", "src/server.js"]