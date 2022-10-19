const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getInStockProducts,
} = require("../controllers/productController");
const { isAuthenticated, authorizedRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/products/instock").get(getInStockProducts);
router
  .route("/products/new")
  .post(isAuthenticated, authorizedRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenticated, authorizedRoles("admin"), updateProduct)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);
router.route("/review").put(isAuthenticated, createProductReview);
router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteReview);

module.exports = router;
