FROM node:20.11-alpine

WORKDIR /app/container3

COPY ./package*.json ./
RUN npm install

COPY ./public ./public
COPY ./middleware ./middleware
COPY ./router ./router
COPY ./logs ./logs

COPY ./server.js ./

CMD ["node","server.js"]