const express = require('express');
const passport = require('passport');
const route = express.Router();

const db = require('../database/users');

route.get('/', (req, res) => {
    res.render('users_ejs/home', {
        title: "home",
    });
});

route.get('/login', (req, res) => {
    res.render('users_ejs/login', { title: "login" });
});

route.get('/registry', (req, res) => {
     res.render('users_ejs/registry', { title: "Registry" });
});

route.post('/registry', (req, res) => { // пофиксить
    const {username, password, email, displayName} = req.body;
    if (!username || !password || !email || !displayName) {
        return res.redirect('/api/users/registry');
    };
    db.findByUsername(username, (err, existingUser) => {
        if (existingUser) {
            return res.json({ userExists: true });
    };
    const newId = db.records.length > 0 ? db.records[db.records.length - 1].id + 1 : 1;
    const newUser = {
        id: newId,
        username,
        password,
        displayName,
        emails: [ {value: email} ]
    };
    db.records.push(newUser);
    res.json({ userExists: false });
  })
});

route.post('/login',
  passport.authenticate('local', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/api/users')
});

route.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    };
    res.redirect('/api/users');
  });
});

route.get('/profile',
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect('/api/users/login');
    };
    next();
  },
  (req, res) => {
    res.render('users_ejs/profile', {
      title: "Профиль",
    })
  }
);

module.exports = route;