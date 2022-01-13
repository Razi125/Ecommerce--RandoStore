const Errorhander = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../model/userModel");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");

// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
  });
  sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given email and password both
  if (!email || !password) {
    // Bad Req
    return next(new Errorhander("Please Enter Email & Password", 400));
  } // because in model we putt select false thats why we give that
  const user = await User.findOne({ email }).select("+password"); // in Condition when password and email both found so { user find }

  if (!user) {
    return next(new Errorhander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password); // Password Found
  // console.log("isPasswordMatched1", isPasswordMatched);
  if (!isPasswordMatched) {
    // If Password Not Found                                 // means unAuthorize
    return next(new Errorhander("Invalid email or password", 401));
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
    message: "Logged Out",
  });
});



