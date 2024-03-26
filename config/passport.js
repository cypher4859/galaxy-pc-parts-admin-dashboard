// Importing the Google OAuth 2.0 authentication strategy from passport-google-oauth20 module
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// Importing mongoose for MongoDB interaction
const mongoose = require('mongoose');
// Importing the User model
const User = require('../models/User');

// Exporting a function that configures Passport.js to use Google OAuth 2.0 authentication
module.exports = function (passport) {
  // Configuring Passport to use Google OAuth 2.0 strategy
  passport.use(
    new GoogleStrategy(
      {
        // Providing Google OAuth 2.0 client ID
        clientID: process.env.GOOGLE_CLIENT_ID,
        // Providing Google OAuth 2.0 client secret
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // Specifying the callback URL for Google OAuth 2.0 authentication
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        // Creating a newUser object with details from Google profile
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        // Attempting to find an existing user or create a new user
        try {
          // Finding a user by their Google ID
          let user = await User.findOne({ googleID: profile.id });

          // Checking if the user exists
          if (user) {
            // If user exists, return the user
            done(null, user);
          } else {
            // If user doesn't exist, create a new user
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );

  // Serializing user to store in the session
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  // Deserializing user from the session
  passport.deserializeUser(async function (id, done) {
    try {
      // Finding user by ID
      const user = await User.findById(id).exec();
      // Returning user
      done(null, user);
    } catch (err) {
      console.error(err);
    }
  });
};
