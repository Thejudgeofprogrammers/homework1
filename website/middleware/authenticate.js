const authenticate = (req, res, next) => {
  res.locals.user = req.user;
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/api/users/login');
  }
};

module.exports = authenticate;