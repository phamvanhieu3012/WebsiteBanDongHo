const app = require("./app");
const connectDatabase = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Tắt máy chủ vì Uncaught Exception`);
  process.exit(1);
});

require("dotenv").config({ path: "./config/config.env" });

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(
    `Máy chủ đang chạy trên cổng http://localhost:${process.env.PORT}`
  );
});

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Tắt máy chủ vì Unhandled Promise Rejection`);

  server.close(() => {
    process.exit(1);
  });
});
