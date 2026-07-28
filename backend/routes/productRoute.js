const express = require("express");

const router = express.Router();

const {
  getProducts, postProducts, putProduct, deleteProduct
} = require("../controllers/productController")

const verifyToken = require("../middleware/VerifyToken")

router.use(verifyToken);

router.get("/", getProducts);
router.post("/", postProducts);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

module.exports = router;