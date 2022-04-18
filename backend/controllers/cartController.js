const Cart = require("../models/cartModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Get Cart Details
exports.getCartDetails = catchAsyncErrors(async (req, res, next) => {
  const cart = await Category.findById(req.params.id);

  if (!cart) {
    return next(new ErrorHander("Không tìm thấy giỏ hàng", 404));
  }

  res.status(200).json({
    success: true,
    cart,
  });
});

//Get my cart
exports.myCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    cart,
  });
});

// Create Cart --  User
exports.createCart = catchAsyncErrors(async (req, res, next) => {
  const { cartItems, totalPrice } = req.body;

  const cart = await Cart.create({
    cartItems,
    totalPrice,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    cart,
  });
});

// Update Cart -- User
exports.updateCart = catchAsyncErrors(async (req, res, next) => {
  let cart = await Cart.find({ user: req.user._id });

  if (!cart) {
    return next(new ErrorHander("Không tìm thấy cart", 404));
  }

  cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    cart,
  });
});

// Delete Cart
exports.deleteCart = catchAsyncErrors(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);

  if (!cart) {
    return next(new ErrorHander("Không tìm thấy giỏ hàng", 404));
  }

  await cart.remove();

  res.status(200).json({
    success: true,
    message: "Xóa thành công giỏ hàng",
  });
});
