const mongoose = require("mongoose");

const productVariantsSchema = new mongoose.Schema({
  size: {
    type: String
  },
  colour: {
    type: String
  },
  productId: {
    type: String
  }
});

const ProductVariant = mongoose.model("ProductVariant", productVariantsSchema);

module.exports = ProductVariant;