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
  try {
    const response = await Cart.deleteMany({})

    console.log(response)
    res.status(200).json({
      message: "Cart cleared"
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
  try {
    const existingCartOrder = await Cart.findById(id);
    if (!existingCartOrder) {
      return res.status(404).json({message: "No Cart order found"})
    }
    if (update === "increment") {
      await Cart.findByIdAndUpdate(id,
        {$inc: {quantity: 1}},
        {after: true}
      )
    } else if (update === "decrement") {
      await Cart.findByIdAndUpdate(id,
        {$inc: {quantity: -1}},
        {after: true}
      )
    }
    res.status(200).json({message: "Changes done"})

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const deleteFromCart = async(req, res) => {
  const { id } = req.params
  try {
    const response = await Cart.findByIdAndDelete(id)

    if (!response){
      return res.status(404).json({
        message: "No cart order found"
      })
    }

    res.status(200).json({
      message: "Saved Cart order deleted"
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
