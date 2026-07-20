FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

USER root

EXPOSE 3000

CMD ["node","src/server.js"]