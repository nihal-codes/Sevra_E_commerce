const Product = require("../models/Product");
const Order = require("../models/Orders");

const getOrders = async (req, res) => {
  const { id } = req.user;

  try {
    if(!id) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }
    const orders = await Order.find();
    
    res.status(200).json({
      message: orders.length ? "Orders fetched" : "Not found",
      orders: orders,
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const postOrder = async(req, res) => {
   
}

const putOrder = async(req, res) => {

}

const deleteOrder = async(req, res) => {

}

module.exports = {
  getOrders, postOrder, putOrder, deleteOrder
};