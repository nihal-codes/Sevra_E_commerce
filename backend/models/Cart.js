const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  productId: {
    type: String
  },
  orderStatus: {
    type: Boolean,
    default: false
  },
  quantity: {
    type: Number,
    default: 1
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart