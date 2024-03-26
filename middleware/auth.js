module.exports = {
  // Middleware to ensure that users who are logged in are redirected to the dashboard
  ensureAuth: function (req, res, next) {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      // If authenticated, proceed to the next middleware or route handler
      return next();
    } else {
      // If not authenticated, redirect the user to the home page
      res.redirect('/');
    }
  },
  // Middleware to ensure that guests (users who are not logged in) are redirected to the sign-in page
  ensureGuest: function (req, res, next) {
    // Check if the user is authenticated
    if (req.isAuthenticated()) {
      // If authenticated, redirect the user to the dashboard
      res.redirect('/dashboard');
    } else {
      // If not authenticated, proceed to the next middleware or route handler
      return next();
    }
  },
};
