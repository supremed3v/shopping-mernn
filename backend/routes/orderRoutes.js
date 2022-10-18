const express = require("express");
const router = express.Router();

const { isAuthenticated, authorizedRoles } = require("../middlewares/auth");

const {
  newOrder,
  getSingleOrder,
  myOrders,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticated, newOrder);
router
  .route("/order/:id")
  .get(isAuthenticated, authorizedRoles("admin"), getSingleOrder);
router.route("/order/me").get(isAuthenticated, myOrders);

module.exports = router;
