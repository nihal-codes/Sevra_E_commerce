const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  order_quantity: {
    type: Number
  },
  status: {
    type: Boolean
  },
  userId: {
    type: String
  },
  productId:{
    type: String
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;