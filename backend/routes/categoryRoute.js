const express = require("express");
const {
  getAllCategories,
  getCategoryDetails,
} = require("../controllers/categoryController");

const router = express.Router();

router.route("/categories").get(getAllCategories);

router.route("/category/:id").get(getCategoryDetails);

module.exports = router;
