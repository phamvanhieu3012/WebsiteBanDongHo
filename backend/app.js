const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const errorMiddleware = require("./middleware/error");

// Config
require("dotenv").config({ path: "./config/config.env" });

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Route Imports
const product = require("./routes/productRoute");
const category = require("./routes/categoryRoute");
const user = require("./routes/userRoute");
const cart = require("./routes/cartRoute");
const order = require("./routes/orderRoute");

app.use("/api/v1", product);
app.use("/api/v1", category);
app.use("/api/v1", user);
app.use("/api/v1", cart);
app.use("/api/v1", order);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
