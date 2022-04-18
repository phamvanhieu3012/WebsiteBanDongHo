const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose.connect(process.env.DB_URL);
  console.log("Đã kết nối đến MongoDB");
};

module.exports = connectDatabase;
