const express = require("express");
const verifyToken = require("../middleware/VerifyToken")
const router = express.Router();

const {
  getOrders, postOrder , putOrder , deleteOrder, postAllCartOrders
} = require("../controllers/orderController")


router.use(verifyToken);

router.get("/", getOrders);
router.post("/", postOrder);
router.post("/all", postAllCartOrders)
router.put("/:id", putOrder);
router.delete("/:id", deleteOrder);

module.exports = router;