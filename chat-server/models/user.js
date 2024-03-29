const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First Name is Required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is Required"],
  },
  avatar: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Email is Required"],
    validate: {
      validator: function (email) {
        return String(email)
          .toLocaleLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      },
      message: (props) => `Email (${props}) is invalid`,
    },
  },
  password: {
    type: String,
  },
  passwordConfirm: {
    type: String,
  },
  passwordChangedAt: {
    type: Date,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
  createdAt: {
    type: Date,
  },
  updatedAt: {
    type: Date,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: Number,
  },
  otp_expiry_time: {
    type: Date,
  },
});

userSchema.pre("save", async function (next) {
  //  only run when otp is updated
  if (!this.isModified("otp")) return next();

  // hash the otp with the cost 12
  this.otp = await bcryptjs.hash(this.otp, 12);

  next();
});

userSchema.pre("save", async function (next) {
  //  only run when otp is updated
  if (!this.isModified("password")) return next();

  // hash the otp with the cost 12
  this.password = await bcryptjs.hash(this.otp, 12);

  next();
});

userSchema.methods.correctOTP = async function (candiateOtp, userOtp) {
  return await bcryptjs.compare(candiateOtp, userOtp);
};

userSchema.methods.correctPassword = async function (
  candiatePassword,
  userPassword
) {
  return await bcryptjs.compare(candiatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.chnagedPasswordAfter = function (timestamp) {
  return timestamp > this.passwordChangedAt;
};

const User = new mongoose.model("User", userSchema);
module.exports = User;
