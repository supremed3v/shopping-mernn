const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const asyncHandler = require("../middlewares/asyncError");
const ApiFeatures = require("../utils/apiFeatures");

// Create product -- Admin

exports.createProduct = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = asyncHandler(async (req, res) => {
  const resPerPage = 5;
  const productCount = await Product.countDocuments();
  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  // .pagination(resPerPage);
  const products = await apiFeature.query;
  res.status(200).json({
    success: true,
    message: "This route will show all products in database",
    products,
  });
});

exports.getInStockProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ stock: { $gt: 0 } });
  res.status(200).json({
    success: true,
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
  });
});

// Create new review -- /api/v1/review

exports.createProductReview = asyncHandler(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review.user.toString() === req.user._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }
  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

exports.getProductReviews = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

exports.deleteReview = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  const reviews = product.reviews.filter(
    (review) => review._id.toString() !== req.query.id.toString()
  );
  const numOfReviews = reviews.length;
  const ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    reviews.length;
  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({
    success: true,
  });
});
