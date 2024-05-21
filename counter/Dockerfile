FROM node:20.11-alpine

WORKDIR /app/container2

COPY ./package*.json ./
RUN npm install

COPY ./logs ./logs
COPY ./middleware ./middleware
COPY ./route ./route
COPY ./server.js ./

CMD ["node","server.js"]