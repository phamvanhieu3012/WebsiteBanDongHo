const express = require("express");

const {
  getAllProducts,
  createProduct,
  getAdminProducts,
  getProductDetails,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/products").get(isAuthenticatedUser, getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticatedUser, authorizeRoles("staff"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticatedUser, authorizeRoles("staff"), updateProduct)
  .delete(isAuthenticatedUser, authorizeRoles("staff"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

module.exports = router;
