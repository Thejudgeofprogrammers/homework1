const express = require('express');
const logger = require('./middleware/logger');
const error404 = require('./middleware/error-404');
const noCache = require('./middleware/no-cache-middleware');
const bookRouter = require('./routes/book');
const mainRouter = require('./routes/router');
const mongoose = require('mongoose')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

app.use(logger);
app.use(noCache);

app.use('/', bookRouter);
app.use('/api/books', mainRouter);

app.use('/public', express.static(__dirname + '/public'));
app.use(error404);

async function startServer(PORT, uri) {
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('подключено')
    app.listen(PORT, async () => {
      console.log(`Server is located in http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Ошибка при подключении к MongoDB:', err);
  };
};

const PORT = process.env.PORT || 3000;

const uri = 'mongodb://mongodb:27017/mybooks';

startServer(PORT, uri);
