const express = require("express");
const verifyToken = require("../middleware/VerifyToken")
const authorizeRole = require("../middleware/authorizeRole")
const upload = require("../middleware/upload")

const router = express.Router();

const {
  getProducts, getProduct, postProducts, putProduct, deleteProduct
} = require("../controllers/productController")

router.get("/", getProducts);

router.get("/:id", getProduct)

router.post("/",verifyToken,authorizeRole("admin"), upload.single("image") ,postProducts);

router.put("/:id",verifyToken,authorizeRole("admin"), putProduct);

router.delete("/:id",verifyToken,authorizeRole("admin"), deleteProduct);

module.exports = router;