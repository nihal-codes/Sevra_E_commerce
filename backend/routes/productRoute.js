const express = require("express");
const verifyToken = require("../middleware/VerifyToken")
const upload = require("../middleware/upload")

const router = express.Router();

const {
  getProducts, getProduct, postProducts, putProduct, deleteProduct
} = require("../controllers/productController")


router.use(verifyToken);

router.get("/", getProducts);
router.get("/:id", getProduct)
router.post("/", upload.single("image") ,postProducts);
router.put("/:id", putProduct);
router.delete("/:id", deleteProduct);

module.exports = router;