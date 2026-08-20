const express = require("express")
const router = express.Router()

const verifyToken = require("../middleware/VerifyToken")

router.use(verifyToken)

const {
  getCart, postToCart, deleteFromCart, emptyCart, patchCart
} = require("../controllers/cartController")

router.use(verifyToken)

router.get("/", getCart);
router.post("/", postToCart);
router.delete("/", emptyCart)
router.patch("/:id", patchCart);
router.delete("/:id", deleteFromCart)

module.exports = router