const Category = require("../models/Category")

const getCategories = async(req, res) => {
  const { role } = req.user;
  try {
    const categories = await Category.find()
    if (categories.length === 0) {
      return res.status(404).json({
        message: "No categories found"
      })
    }
    res.status(200).json({
      categories: categories,
      role: role
    })
  } catch(err) {
    return res.status(500).json({
      message: err.message, 
      errors: err
    })
  }
}

const postCategories = async(req, res) => {
  const { name } = req.body;
  try {
    const existingCategory = await Category.findOne({
      name: name
    })
    if (existingCategory) {
      return res.status(409).json( {message: "Category already exists" })
    }
    const newCategory = await Category.create({
      name: name
    })
    res.status(201).json({
      message: "Category created"
    })
  }
  catch (err) {
    return res.status(500).json({
      message: err.message,
      errors: err
    })
  }
}

const putCategory = async(req, res) => {
  const { id } = req.params
  const { name } = req.body
  try {
    const existingCategory = await Category.findById(id)
    if (!existingCategory) {
      return res.status(404).json({
        message: `Can't Update! No category named ${name} found`
      })
    }
    const updatedCategory = await Category.findByIdAndUpdate(
      id, 
      {
        name: name
      }, 
      { 
        new: true
      }
    )
    res.status(200).json({
      message: "Updated Successfully"
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message,
      errors: err
    })
  }
}

const deleteCategory = async (req, res) => {
  const { id } = req.params
  try {
    const deleted = await Category.findByIdAndDelete(id)
    if (!deleted) {
      return res.status(404).json({
        message: `Can't delete! No Category found`
      })
    }
    res.status(200).json({
      message: "Deleted Successfully"
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message,
      errors: err
    })
  }
}

module.exports = {
  getCategories, postCategories, putCategory, deleteCategory
}