const express = require("express");

const router = express.Router();

const {
  getOrders, postOrder , putOrder , deleteOrder
} = require("../controllers/orderController")

const verifyToken = require("../middleware/VerifyToken")

router.use(verifyToken);

router.get("/", getOrders);
router.post("/", postOrder);
router.put("/:id", putOrder);
router.delete("/:id", deleteOrder);

module.exports = router;