const Category = require("../models/Category");
const SubCategory = require("../models/Sub_category");
const Product = require("../models/Product");
const uploadImage = require("../utils/UploadImage")

const getProducts = async(req, res) => {
  const { role } = req.user;
  try {
    const categories = await Category.find();
    if (categories.length === 0) {
      return res.status(404).json({
        message: "Categories not found"
      })
    }

    const subcategories = await SubCategory.find();
    if (subcategories.length === 0) {
      return res.status(404).json({
        message: "Sub Categories not found"
      })
    }
    const products = await Product.find();
    
    res.status(200).json({
      message: products.length ? "Products fetched successfully" : "No products found",
      subcategories,
      products,
      role,
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const getProduct = async(req, res) => {
  const { id } = req.params
  const { _id } = req.user

  try {
    const product = await Product.findById(id)
    res.status(200).json({
      product: product,
      _id
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const postProducts = async(req, res) => {
  const { name, brand, description, price, discount, stock, minOrderQuantity, returnPolicy,  subCategoryId, categoryId} = req.body;
  try {
    const existingSubCategory = await SubCategory.findById(subCategoryId);
    if (!existingSubCategory) {
      return res.status(404).json({
        message: "No sub category found"
      })
    }
    let imageUrl = "";
    let publicId = "";

    if (req.file){
      const uploaded = await uploadImage(req.file.buffer)
      imageUrl = uploaded.secure_url;
      publicId =  uploaded.public_id;
    }

    const newProduct = new Product({
      ...req.body,
      image: imageUrl,
      imagePublicId: publicId
    })
    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product created"
    })

  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const putProduct = async(req, res) => {
  const { id } = req.params;
  let { name, price, stock } = req.body;
  try {
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return res.status(404).json({
        message: "No product found"
      })
    }
    if (name === undefined) {name = existingProduct.name}
    if (price === undefined) {price = existingProduct.price}
    if (stock === undefined) {stock = existingProduct.stock}

    const newProduct = await Product.findByIdAndUpdate(id,
      {
        name: name,
        price: price,
        stock: stock,
      },
      {
        after: true
      }
    )
    res.status(200).json({
      message: "Product updated"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const deleteProduct = async(req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        message: "No product found"
      })
    }
    res.status(200).json({
      message: "Deleted successfully"
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

module.exports = {
  getProducts, getProduct, postProducts, putProduct, deleteProduct
}