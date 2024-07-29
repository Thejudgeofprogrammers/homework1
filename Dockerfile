FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV MONGO_CONNECTION=${MONGO_CONNECTION}
ENV PORT=${PORT}

CMD ["npm","run","start:dev"]