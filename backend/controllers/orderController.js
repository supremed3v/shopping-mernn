const Order = require("../models/orderModel");
const asyncHandler = require("../middlewares/asyncError");
const ErrorHandler = require("../utils/errorHandler");
const Product = require("../models/productModel");
const asyncError = require("../middlewares/asyncError");

// Create a new order => /api/v1/order/new

exports.newOrder = asyncHandler(async (req, res, next) => {
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// Get single order => /api/v1/order/:id

exports.getSingleOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name",
    "email"
  );

  if (!order) {
    return next(new ErrorHandler("No order found with this ID", 404));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get logged in user order => /api/v1/order/:id

exports.myOrders = asyncHandler(async (req, res, next) => {
  const order = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    order,
  });
});
