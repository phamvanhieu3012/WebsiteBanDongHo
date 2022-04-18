const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");

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
