// Importing the mongoose library for MongoDB interaction
const mongoose = require('mongoose');

// Defining an asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempting to establish a connection to the MongoDB database using the provided URI
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // Logging a success message if the connection is established, including the host information
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    // Handling errors that occur during the connection attempt
    console.error(err);
    // Exiting the script with an exit code of 1 if an error occurs
    process.exit(1);
  }
};

// Exporting the connectDB function to make it accessible from other parts of the application
module.exports = connectDB;
