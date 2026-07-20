# صورة قديمة وتعمل بـ root (تكتشفها Checkov & Trivy)
FROM node:14

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["node", "src/server.js"]