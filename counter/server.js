const express = require('express');
const redis = require('redis');

const routes = require('./route/router');
const logger = require('./middleware/logger');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

const PORT = process.env.PORT || 4000;

const REDIS_URL = process.env.REDIS_URL || 'localhost';
const client = redis.createClient({ url: REDIS_URL });

(async () => {
  await client.connect();
})();

app.use('/', routes(client));

app.listen(PORT, () => {
  console.log(`Server http://localhost:${PORT}`);
});