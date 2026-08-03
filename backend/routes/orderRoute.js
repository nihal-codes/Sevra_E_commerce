const express = require("express");

const router = express.Router();

const {
  getOrders, postOrder , putOrder , deleteOrder
} = require("../controllers/orderController")

const verifyToken = require("../middleware/VerifyToken")

router.use(verifyToken);

router.get("/", getOrders);
router.post("/", postOrders);
router.put("/:id", putOrders);
router.delete("/:id", deleteOrders);

module.exports = router;