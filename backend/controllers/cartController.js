const Cart = require("../models/Cart");

const getCart = async(req, res) => {
  const { id } = req.user;
  try  {
    if (!id) {
      return res.status(401).json({message: "Unauthorized"})
    }
    const cartOrders = await Cart.find({userId: id});
    
    res.status(200).json({
      message: cartOrders.length ? "Found" : "Not found",
      cartOrders: cartOrders,

    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const postToCart = async(req, res) => {
  const { id } = req.user;
  const { productId, quantity } = req.body

  try {
    if (!id || !productId) {
      return res.status(404).json({
        message: "Invalid user or product! Can't add to cart."
      })
    }

    const existingCartOrder = await Cart.find({
      productId: productId,
      userId: id,
    });
    if (existingCartOrder.length === 1) {
      return res.status(200).json({
        message: "Already in cart"
      })
    }
    const cartOrder = new Cart({
      userId: id,
      productId: productId,
      orderStatus: false,
      quantity: quantity
    })
    const savedCardOrder = await cartOrder.save();
    res.status(201).json({
      message: "Saved to cart"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const emptyCart = async(req, res) => {
  const { id } = req.user;
  try {
    const response = await Cart.deleteMany({userId: id})

    res.status(200).json({
      message: "Cart cleared successfully"
    })
  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}

const patchCart = async(req, res) => {
  const { id } = req.params;
  const { update } = req.body;
  const userId = req.user.id;
  try {
    const existingCartOrder = await Cart.findOne({_id: id, userId});
    if (!existingCartOrder) {
      return res.status(404).json({message: "No Cart order found"})
    }
    if (update === "increment") {
      await Cart.findByIdAndUpdate(id,
        {$inc: {quantity: 1}},
        {new: true}
      )
    } else if (update === "decrement") {
      await Cart.findByIdAndUpdate(id,
        {$inc: {quantity: -1}},
        {new: true}
      )
    }
    res.status(200).json({message: "Updated"})

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const deleteFromCart = async(req, res) => {
  const { id } = req.params
  const userId = req.user.id;
  try {
    const response = await Cart.findOneAndDelete({ _id: id, userId })

    if (!response){
      return res.status(404).json({
        message: "No cart orders found"
      })
    }

    res.status(200).json({
      message: "Cart order deleted successfully"
    })

  } catch (err) {
    return res.status(500).json({
      message: err.message
    })
  }
}


module.exports = {
  getCart, postToCart, emptyCart,patchCart, deleteFromCart
}
