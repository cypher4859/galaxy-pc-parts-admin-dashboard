// Importing mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Defining the schema for the User collection
const UserSchema = new mongoose.Schema({
  // Defining the 'googleId' field with type String, which is required
  googleId: {
    type: String,
    required: true,
  },
  // Defining the 'displayName' field with type String, which is required
  displayName: {
    type: String,
    required: true,
  },
  // Defining the 'firstName' field with type String, which is required
  firstName: {
    type: String,
    required: true,
  },
  // Defining the 'lastName' field with type String, which is required
  lastName: {
    type: String,
    required: true,
  },
  // Defining the 'image' field with type String, which is required
  image: {
    type: String,
    required: true,
  },
  // Defining the 'createdAt' field with type Date, with a default value of the current date and time
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Exporting the mongoose model for the 'User' collection,
// using the UserSchema defined above
module.exports = mongoose.model('User', UserSchema);
