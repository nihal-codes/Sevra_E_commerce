const express = require("express");

const router = express.Router();

const {
  getOrders, postOrders , putOrders , deleteOrders
} = require("../controllers/productController")

router.get("/", getOrders);
router.post("/", postOrders);
router.put("/:id", putOrders);
router.delete("/:id", deleteOrders);

module.exports = router;