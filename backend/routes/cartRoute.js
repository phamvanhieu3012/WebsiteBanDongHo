const express = require("express");
const {
  myCart,
  getCartDetails,
  createCart,
  updateCart,
  deleteCart,
} = require("../controllers/cartController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/cart").get(isAuthenticatedUser, myCart);

router.route("/cart/:id").get(isAuthenticatedUser, getCartDetails);

router.route("/cart/new").post(isAuthenticatedUser, createCart);

router
  .route("/cart/:id")
  .put(isAuthenticatedUser, updateCart)
  .delete(isAuthenticatedUser, deleteCart);

module.exports = router;
