const express = require("express")

const router = express.Router();

const {
  register, login, verifyEmail, getCurrentUser
} = require("../controllers/authController");
const verifyToken = require("../middleware/VerifyToken");

router.post("/register", register);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", login)
router.get("/me", verifyToken, getCurrentUser);

module.exports = router