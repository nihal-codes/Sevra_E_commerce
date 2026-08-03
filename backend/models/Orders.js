const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  quantity: {
    type: Number
  },
  deliveredStatus: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: String
  },
  productId:{
    type: String
  },
  orderedStatus:{
    type: Boolean
  },
  location: {
    type: String
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;