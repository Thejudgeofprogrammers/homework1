FROM node:20.11

WORKDIR /app/container2

COPY ./package*.json ./
RUN npm install

COPY ./server.js ./

CMD ["node","server.js"]