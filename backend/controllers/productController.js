const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");
const cloudinary = require("cloudinary");

// Get All Product with Pagination
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 6;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .sorting();

  const products2 = await apiFeature.query;

  let filteredProductsCount = await products2.length;

  const apiFeature2 = new ApiFeatures(
    Product.find().populate("category"),
    req.query
  )
    .search()
    .filter()
    .sorting()
    .pagination(resultPerPage);

  const products = await apiFeature2.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get Top Product (Admin)
exports.getTopProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find().sort({ sold: -1 }).limit(5);

  res.status(200).json({
    success: true,
    products,
  });
});

// Get All Product (Admin)
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find().populate("category");

  res.status(200).json({
    success: true,
    products,
  });
});

//Get number Product
exports.get8Products = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find().limit(8);

  res.status(200).json({
    success: true,
    products,
  });
});

//Get Men Product
exports.getMenProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 6;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find({ sex: "Nam" }), req.query)
    .search()
    .filter()
    .sorting();

  const products2 = await apiFeature.query;

  let filteredProductsCount = await products2.length;

  const apiFeature2 = new ApiFeatures(
    Product.find({ sex: "Nam" }).populate("category"),
    req.query
  )
    .search()
    .filter()
    .sorting()
    .pagination(resultPerPage);

  const products = await apiFeature2.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

//Get Women Product
exports.getWomenProducts = catchAsyncErrors(async (req, res, next) => {
  const resultPerPage = 6;
  const productsCount = await Product.countDocuments();

  const apiFeature = new ApiFeatures(Product.find({ sex: "N???" }), req.query)
    .search()
    .filter()
    .sorting();

  const products2 = await apiFeature.query;

  let filteredProductsCount = await products2.length;

  const apiFeature2 = new ApiFeatures(
    Product.find({ sex: "N???" }).populate("category"),
    req.query
  )
    .search()
    .filter()
    .sorting()
    .pagination(resultPerPage);

  const products = await apiFeature2.query;

  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  });
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    return next(new ErrorHander("Kh??ng t??m th???y s???n ph???m", 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// Create Product -- Staff
exports.createProduct = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "products",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.user = req.user.id;

  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

// Update Product -- Admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  let product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Kh??ng t??m th???y s???n ph???m", 404));
  }

  // X??? l?? Images
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  if (images !== undefined) {
    // X??a ???nh ??? Cloudinary
    for (let i = 0; i < product.images.length; i++) {
      await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    const imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "products",
      });

      imagesLinks.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesLinks;
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

// Delete Product
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHander("Kh??ng t??m th???y s???n ph???m", 404));
  }

  // X??a ???nh ??? Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.v2.uploader.destroy(product.images[i].public_id);
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "X??a s???n ph???m th??nh c??ng",
  });
});

// T???o m???i b??nh lu???n ho???c s???a b??nh lu???n
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// L???y t???t c??? reviews c???a s???n ph???m
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Kh??ng t??m th???y s???n ph???m", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// L???y t???t c??? reviews
exports.getAllReviews = catchAsyncErrors(async (req, res, next) => {
  const products = await Product.find({
    numOfReviews: {
      $gt: 0,
    },
  });

  res.status(200).json({
    success: true,
    products,
  });
});

// X??a b??nh lu???n
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Kh??ng t??m th???y s???n ph???m", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

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
