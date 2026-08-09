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
  const { productId } = req.body

  try {
    if (!id || !productId) {
      return res.status(404).json({
        message: "Either Product or user not found"
      })
    }

    const existingCartOrder = await Cart.find({
      productId: productId,
      userId: id,
    });
    if (existingCartOrder.length === 1) {
      return res.status(200).json({
        message: "Already added in cart"
      })
    }
    const cartOrder = new Cart({
      userId: id,
      productId: productId,
      orderStatus: false
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

const deleteFromCart = async(req, res) => {

}

module.exports = {
  getCart, postToCart, deleteFromCart
}
