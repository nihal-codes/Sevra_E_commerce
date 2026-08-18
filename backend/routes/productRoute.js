const express = require("express");
const verifyToken = require("../middleware/VerifyToken")
const upload = require("../middleware/upload")

const router = express.Router();

const {
  getProducts, getProduct, postProducts, putProduct, deleteProduct
} = require("../controllers/productController")

router.get("/", getProducts);

router.get("/:id",verifyToken, getProduct)

router.post("/",verifyToken, upload.single("image") ,postProducts);

router.put("/:id",verifyToken, putProduct);

router.delete("/:id",verifyToken, deleteProduct);

module.exports = router;