const router = require("express").Router();

const authController = require("../controllers/auth");

router.post("/login", authController.Login);

router.post("/register", authController.Register);

router.post("/send-otp", authController.sendOTP);

router.post("/verify-otp", authController.verifyOTP);

router.post("/forgot-password", authController.forgetPassword);

router.post("/reset-password", authController.resetPassword);

module.exports = router;
