const Product = require("../models/Product");
const Order = require("../models/Orders");
const User = require("../models/Users")

const getOrders = async (req, res) => {
  const { id, role } = req.user;
  
  try {
    if(!id) {
      return res.status(401).json({
        message: "Unauthorized"
      })
    }


    let orders;

    if (role === "admin") {
      orders = await Order.find();
    }
    else if (role === "user"){
      orders = await Order.find({userId: id});
    } 
    
    res.status(200).json({
      message: orders.length ? "Orders fetched" : "Not found",
      orders: orders,
    })

  } catch (err) {
    res.status(500).json({
      message: err.message,
      err: err
    })
  }
}

const postOrder = async(req, res) => {
  const { id } = req.user;
  const { productId, quantity, location } = req.body;

  try {
    if (!id) {return res.status(401).json({message: "Unauthorized"})  
    }
    if (!productId) {return res.status(404).json({message: "Product not found"})
    }
    if (!quantity || quantity < 1) { return res.status(400).json({message: "Invalid Quantity"})}

    const updatedProduct = await Product.findOneAndUpdate(
      {_id: productId, stock: {$gte: quantity}},
      {$inc: {stock: -quantity}},
      {after: true}
    )
    if (!updatedProduct) { return res.status(400).json({message: "Not enough stock available"})}


    const existingUser = await User.findById(id);
    let locationExists = false
    const locations = existingUser.location;
    for (let i = 0 ; i < locations.length; i++){
      if (location === locations[i]){
        locationExists = true
      }
    }
    if (!locationExists){
      const updatedUser = await User.findByIdAndUpdate(id,
        {
          location: [...existingUser.location, location]
        }
      );
    }

    const newOrder = new Order({
      userId: id,
      productId: productId,
      quantity: quantity,
      location: location,
      deliveredStatus: false,
      orderedStatus: true
    })
    const savedOrder = await newOrder.save();
    res.status(201).json({message: "Order placed"})
    
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}

const putOrder = async(req, res) => {

}

const deleteOrder = async(req, res) => {
  const { id } = req.params;
  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if(!deletedOrder) {
      return res.status(404).json({
        message: "Order not found"
      })
    }
    res.status(200).json({
      message: "Order Cancelled successfully"
    })
  } catch(err) {
    res.status(500).json({
      message: err.message
    })
  }
}

module.exports = {
  getOrders, postOrder, putOrder, deleteOrder
};