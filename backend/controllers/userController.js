const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
  //   folder: "avatars",
  //   width: 150,
  //   crop: "scale",
  // });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      // public_id: myCloud.public_id,
      // url: myCloud.secure_url,
      public_id: "this is a sample id",
      url: "https://res.cloudinary.com/phuockaito/image/upload/v1617902959/user/1_gxwhfk.jpg",
    },
  });

  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Kiểm tra xem user có nhập email và password không

  if (!email || !password) {
    return next(new ErrorHander("Hãy nhập email và mật khẩu", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Email hoặc mật khẩu sai", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Email hoặc mật khẩu sai", 401));
  }

  sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Bạn đã đăng xuất",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Reset token của bạn là :- \n\n ${resetPasswordUrl} \n\nNếu bạn không yêu cầu email này vui lòng bỏ qua nó.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Phục hồi mật khẩu web bán đồng hồ PVH`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email đã được gửi tới ${user.email} thành công`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  console.log("Hello world");
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander("Reset Password Token không đúng hoặc đã hết hạn", 400)
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Xác nhận mật khẩu chưa đúng ", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});
