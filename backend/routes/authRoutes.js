const express = require("express")

const router = express.Router();

const {
  register, login, getCurrentUser, refreshToken, logout,
  resetPassword, changePassword
} = require("../controllers/authController");
const verifyToken = require("../middleware/VerifyToken");

router.post("/login", login);
router.post("/logout", logout);
router.get("/me", getCurrentUser);
router.post("/register", register);
router.post("/refresh", refreshToken);
// router.get("/verify-email/:token", verifyEmail);
// router.post("/resend-verification", resendVerification);
// router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/change-password", verifyToken, changePassword);

module.exports = router
