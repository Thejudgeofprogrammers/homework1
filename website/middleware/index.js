const logger = require('./logger');
const noCache = require('./no-cache-middleware');
const get_user = require('./get_user');
const authenticate = require('./authenticate');
const fileMulter = require('./multer');

module.exports = {
  logger,
  noCache,
  get_user,
  authenticate,
  fileMulter
};