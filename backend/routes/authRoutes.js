const express = require("express")

const router = express.Router();

const {
  register, login, verifyEmail
} = require("../controllers/authController")

// router.get("/emailcheck", emailCheck)


router.post("/register", register);
router.get("/verify-email/:token", verifyEmail);
router.post("/login", login)

module.exports = router