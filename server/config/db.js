const mongoose = require('mongoose');

const connectDB = async () => {
  try {
     mongoose.connect("mongodb://127.0.0.1:27017/contact_mern", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Connection to MongoDB failed:", error);
  }
};

module.exports = connectDB;
