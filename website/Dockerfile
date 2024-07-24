FROM node:20.11-alpine

WORKDIR /app/container1

COPY ./ ./

ENV URI=${URI}
ENV PORT=${PORT}
ENV SESSION_SECRET=${SESSION_SECRET}

RUN npm install && mkdir -p public/uploads

CMD ["node","run","start"]