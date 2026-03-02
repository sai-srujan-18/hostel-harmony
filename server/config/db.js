// config/db.js
// Connect to MongoDB Atlas
// FRONTEND LINK: This is called in server.js before starting Express

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
   const connectionInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Atlas connected successfully : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error(`MongoDB connection error:`, error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
