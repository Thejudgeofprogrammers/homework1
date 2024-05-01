const express = require('express');
const logger = require('./middleware/logger');
const error404 = require('./middleware/error-404');
const bookroute = require('./routes/book');
const indexrouter = require('./routes/router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(logger);

app.use((req, res, next) => {
  res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});

app.use('/', bookroute);
app.use('/api/books', indexrouter);

app.use('/public', express.static(__dirname + '/public'));
app.use(error404);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is located in http://localhost:${PORT}`);
});