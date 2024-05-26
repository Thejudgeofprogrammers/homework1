const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const route = express.Router();

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

route.post('/registry', async (req, res) => {
    const {username, password, email, displayName} = req.body;
    if (!username || !password || !email || !displayName) {
        return res.redirect('/api/users/registry');
    };
    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.json({ userExists: true });
      };

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
        displayName,
        emails: [{ value: email }]
      });

      await newUser.save(); 
      res.json({ userExists: false });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Регистрация не удалась" });
    };
});

route.post('/login',
  passport.authenticate('local', { failureRedirect: '/api/users/login' }),
  (req, res) => {
    req.session.userId = req.user._id;
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