const express = require('express');
require('dotenv').config();
const logger = require('./middleware/logger');
const error404 = require('./middleware/error-404');
const indexrouter = require('./routes/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use('/', indexrouter);
app.use('/public', express.static(__dirname + '/public'));
app.use(error404);

const PORT = process.env.PORT ?? 3030;

app.listen(PORT, () => {
  console.log(`Server is located in http://localhost:${PORT}`);
});