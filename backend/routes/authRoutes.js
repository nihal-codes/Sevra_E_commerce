const express = require("express")

const router = express.Router();

const {
  register, login, verifyEmail, getCurrentUser, refreshToken, logout
} = require("../controllers/authController");
const verifyToken = require("../middleware/VerifyToken");

router.post("/login", login);
router.post("/logout", logout);
router.post("/register", register);
router.post("/refresh", refreshToken);
router.get("/me", verifyToken, getCurrentUser);
router.get("/verify-email/:token", verifyEmail);

module.exports = router