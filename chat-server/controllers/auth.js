const jwt = require("jsonwebtoken");

const User = require("../models/user");
const filterObj = require("../utilis/filterObj");
const OTPgenerator = require("otp-generator");
const crypto = require("crypto");
const { promisify } = require("util");

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET);

// singUp => Register - SendOtp - VerifyOTP

// https://api.tawk.com/auth/register

// Register function
exports.Register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  const filterBody = filterObj(
    req.body,
    "firstName",
    "lastName",
    "password",
    "email"
  );
  const existing_user = await User.findOne({ email: email });

  if (existing_user && existing_user.verified) {
    res.status(400).json({
      status: "error",
      message: "Email is Already exisit! please Login",
    });
  } else if (existing_user) {
    await User.findOneAndUpdate({ email: email }, filterBody, {
      new: true,
      validateModifiedOnly: true,
    });
    //  generate OTP and send to use email
    req.userId = existing_user._id;
    next();
  } else {
    const new_user = await User.create(filterBody);
    //  generate OTP and send to use email
    req.userId = existing_user._id;
    next();
  }
};

exports.sendOTP = async (req, res, next) => {
  const { userId } = req;
  const new_otp = OTPgenerator.generate(6, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
  });

  const otp_expiry_time = Date.new() + 10 * 60 * 1000; //10 mins after send otp will be expired

  await User.findByIdAndUpdate(userId, { otp: new_otp, otp_expiry_time });
  // send email

  res.status(200).json({
    status: "success",
    message: "OTP sent Successfully",
  });
};

// verify OTP
exports.verifyOTP = async (req, res, next) => {
  // verify otp and update user record accordingly

  const { email, otp } = req.body;

  const user = await User.findOne({
    email,
    otp_expiry_time: { $gt: Date.now() },
  });
  if (!user) {
    res.status(400).json({
      status: "error",
      message: "Email is invalid or OTP expired!",
    });
  }
  if (!(await user.correctOTP(otp, user.otp))) {
    res.status(400).json({
      status: "error",
      message: "OTP is incorrect",
    });
  }

  user.verified = true;
  user.otp = undefined;

  await user.save({ new: true, validateModifiedOnly: true });

  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    message: "OTP verified successfully",
    token,
  });
};

// login function
exports.Login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      status: "error",
      message: "Both email and Password are required",
    });
  }

  const user = await User.findOne({ email: email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    res.status(400).json({
      status: "error",
      message: "Email and Password is incorrect",
    });
  }
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    message: "Logged in Successfully",
    token,
  });
};

exports.protect = async (req, res, next) => {
  //1 Getting token (JWT) and ckech if it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split("")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    req.status(400).json({
      status: "error",
      message: "You are not logged In! Please login to get access",
    });
    return;
  }
  // 2 verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3 check if user still exist
  const this_user = await User.findById(decoded.userId);
  if (!this.user) {
    res.status(400).json({
      status: "error",
      message: "The user dose not exist",
    });
  }

  // check if user changed their password after token is issued
  if (this_user.chnagedPasswordAfter(decoded.iat)) {
    res.status(400).json({
      status: "error",
      message: "User recently updated password! please log in again",
    });
  }

  //
  req.user = this_user;
  next();
};

// Types of routes =>Protected(Only logged in users can access thse) & Unprotected

// forget password
exports.forgetPassword = async (req, res, next) => {
  const user = User.findOne({ email: req.body.email });
  if (!user) {
    res.status(400).json({
      status: "error",
      message: "There is no user with given email",
    });
    return;
  }
  // create random reset token
  const resetToken = user.createPasswordResetToken();

  const resetURL = `https://tawk.com/auth/reset-password/?code=${resetToken}`;
  try {
    //  TODO =>send email with url reset URL
    res.status(200).json({
      status: "success",
      message: "Reset password link sent to Email",
    });
  } catch (error) {
    user.asswordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({ validateBeforeSave: false });

    res.status(500).json({
      status: "error",
      message: "There was an error sending the email, please try again later",
    });
  }
};

// reset password
exports.resetPassword = async (req, res, next) => {
  // 1 get use base token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2 get user has expired or submission is out of time window
  if (!user) {
    res.status(400).json({
      status: "error",
      message: "Token is invalid or Expired",
    });
    return;
  }

  // 3 update user password and set resetToken & expiry to undefined

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 4 login the user and send new JWT token
  //  TODO => send an email to user informing about password reset
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    message: "Password Reset Successfully",
    token,
  });
};
