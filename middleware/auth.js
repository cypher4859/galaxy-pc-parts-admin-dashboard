module.exports = {
  // Redirects users who are logged in to the dashboard
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  },
  // Redirects users who are not logged in to the sign-in page
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.redirect('/dashboard');
    } else {
      return next();
    }
  },
};
