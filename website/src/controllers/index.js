const mainRouter = require('./main_page');
const bookRouter = require('./book_route');
const usersRouter = require('./users_route');
const bookService = require('./axios_data');

module.exports = {
  mainRouter,
  bookRouter,
  usersRouter,
  bookService
};