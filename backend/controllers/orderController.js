const Cart = require("../models/Cart");
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

const postAllCartOrders = async (req, res) => {
  const { id } = req.user;
  const { location } = req.body;
  try {
    if (!id) {
      return res.status(401).json({message: "Unauthorized"});
    }

    if (!location || !location.trim()) {
      return res.status(400).json({message: "Location is required"});
    }

    const cartOrders = await Cart.find({userId: id});

    if (!cartOrders.length) {
      return res.status(404).json({message: "Cart is empty"});
    }

    const products = [];

    for (const cartItem of cartOrders) {
      const product = await Product.findById(cartItem.productId);

      if (!product) {
        return res.status(404).json({
          message: `Product ${cartItem.productId} not found`
        });
      }

      if (product.stock < cartItem.quantity) {
        return res.status(400).json({
          message: `${product.name} does not have enough stock. Available: ${product.stock}`
        });
      }

      products.push({
        product,
        quantity: cartItem.quantity
      });
    }

    for (const item of products) {
      await Product.findByIdAndUpdate(item.product._id,
        {$inc: {stock: -item.quantity}}
      );
    }

    const existingUser = await User.findById(id);

    if (!existingUser) {
      return res.status(404).json({message: "User not found"});
    }

    if (!existingUser.location.includes(location)) {
      await User.findByIdAndUpdate(id,
        {$push: {location: location}}
      );
    }

    const orders = products.map(item => ({
      userId: id,
      productId: item.product._id,
      quantity: item.quantity,
      location: location,
      deliveredStatus: false,
      orderedStatus: true
    }));

    await Order.insertMany(orders);

    await Cart.deleteMany({userId: id});

    return res.status(201).json({message: "All cart items ordered successfully"});

  } catch (err) {
    return res.status(500).json({
      message: err.message
    });
  }
};

const putOrder = async(req, res) => {

}

const deleteOrder = async(req, res) => {
  const { id } = req.params;
  const { id: userId, role } = req.user;
  try {
    const filter = role === "admin" ? { _id: id } : { _id: id, userId };
    const deletedOrder = await Order.findOneAndDelete(filter);
    if(!deletedOrder) {
      return res.status(404).json({ message: "Order not found" })
    }
    res.status(200).json({ message: "Order Cancelled successfully" })
  } catch(err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getOrders, postOrder, putOrder, deleteOrder, postAllCartOrders
};