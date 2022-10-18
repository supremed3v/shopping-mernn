const express = require("express");
const router = express.Router();

const { isAuthenticated, authorizedRoles } = require("../middlewares/auth");

const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrders,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticated, newOrder);
router.route("/order/:id").get(isAuthenticated, getSingleOrder);
router.route("/order/me").get(isAuthenticated, myOrders);
router
  .route("/admin/order")
  .get(isAuthenticated, authorizedRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenticated, authorizedRoles("admin"), updateOrders)
  .delete(isAuthenticated, authorizedRoles("admin"), deleteOrder);

module.exports = router;
