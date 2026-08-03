const express = require("express")

const router = express.Router()

const verifyToken = require("../middleware/VerifyToken")

router.use(verifyToken)

const {
  getCart, postToCart, deleteFromCart
} = require("../controllers/cartController")

router.get("/", getCart);
router.post("/", postToCart);
router.delete("/:id", deleteFromCart)

module.exports = router