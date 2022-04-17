const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log("MongoDB connected");
};

module.exports = connectDatabase;
