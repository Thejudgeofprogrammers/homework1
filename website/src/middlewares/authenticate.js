const authenticate = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    return next();
  } else {
    console.log('User not authenticated');
    res.redirect('/api/users/login');
  }
};

module.exports = authenticate;