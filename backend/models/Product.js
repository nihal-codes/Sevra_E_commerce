const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  brand: {
    type: String
  },
  price: {
    type: Number
  },
  discount: {
    type: Number
  },
  stock: {
    type: Number
  },
  minOrderQuantity: {
    type: Number
  },
  returnPolicy: {
    type: String,
    default: "No return policy"
  },
  subCategoryId: {
    type: String
  },
  categoryId: {
    type: String
  },
  image: {
    type: String
  },
  imagePublicId: String,
  rating: Number
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;