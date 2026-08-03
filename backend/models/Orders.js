const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  productId:{
    type: String
  },
  quantity: {
    type: Number
  },
  location: {
    type: String
  },
  deliveredStatus: {
    type: Boolean,
    default: false,
  },
  orderedStatus:{
    type: Boolean
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;