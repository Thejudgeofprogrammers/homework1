const express = require('express');
const route = express.Router();

// Главная страница
route.get('/', (req, res) => {
  res.render('index', {
    title: 'Главная',
    currentPage: '/'
  });
});

module.exports = route;