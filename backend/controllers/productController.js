const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncError");
const ApiFeatures = require("../utils/apiFeatures");

// Create product -- Admin

exports.createProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = asyncHandler(async (req, res) => {
  const resPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(req.query, Product.find())
    .search()
    .filter()
    .pagination(resPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    message: "This route will show all products in database",
    products,
  });
});

// Update product -- Admin

exports.updateProduct = asyncHandler(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

// Delete product -- Admin

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  await product.remove();
  res.status(200).json({
    success: true,
    message: "Product is deleted.",
  });
});

// Get Product Details

exports.getProductDetails = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
    productCount,
  });
});
