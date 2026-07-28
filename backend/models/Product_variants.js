const mongoose = require("mongoose");

const productVariantsSchema = new mongoose.Schema({
  model: {
    type: String
  },
  colour: {
    type: Colour
  },
  productId: {
    type: String
  }
});

const ProductVariant = mongoose.model("ProductVariant", productVariantsSchema);

module.exports = ProductVariant;