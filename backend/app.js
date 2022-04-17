const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Config
require("dotenv").config({ path: "./config/config.env" });

app.use(express.json());
app.use(cookieParser());

// Route Imports
const product = require("./routes/productRoute");

app.use("/api/v1", product);

module.exports = app;
