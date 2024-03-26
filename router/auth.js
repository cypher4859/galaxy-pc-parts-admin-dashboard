// Importing necessary modules
const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route for initiating Google OAuth authentication
// Redirects users to Google's authentication page with profile scope
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Callback route for Google OAuth authentication
// Redirects to dashboard upon successful authentication, otherwise redirects to home page
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  // Successful authentication, redirect to dashboard
  res.redirect('/dashboard');
});

// Route for logging out user
router.get('/logout', (req, res) => {
  // Logging out the user
  req.logout((err) => {
    // Handling errors during logout
    if (err) {
      return res.status(500).send('Error during logout');
    }
    // Redirecting to home page after successful logout
    res.redirect('/');
  });
});

// Exporting the router for use in other parts of the application
module.exports = router;
