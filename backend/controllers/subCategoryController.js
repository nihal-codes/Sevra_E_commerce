const Category = require("../models/Category")
const SubCategory = require("../models/Sub_category");

const getSubCategories = async(req, res) => {
  const { role } = req.user;
  try {
    const categories = await Category.find()
    if (categories.length === 0){ 
      return res.status(404).json({ 
        message: "Categories not found"
      })
    }
    const subCategories = await SubCategory.find();
    if (subCategories.length === 0){
      return res.status(404).json({
        message: "Sub Categories not found"
      })
    }
    res.status(200).json({
      categories: categories,
      subCategories: subCategories,
      role: role, 
      message: "Data found"
    })
  } catch (err) {
    return res.status(500).json({
      message : err.message
    })
  }
};

const postSubCategories = async(req, res) => {
  const { name, categoryId } = req.body;
  try {
    const existingCategory = await Category.findById(categoryId);
    if (!existingCategory) {
      return res.status(404).json({
        message: "Category not found! Cant insert"
      })
    }
    const newSubCategory = new SubCategory({
      name: name,
      categoryId: categoryId
    })

    const savedSubCategory = await newSubCategory.save();

    res.status(201).json({
      message: "Sub category created"
    })

  } catch (err) { 
    res.status(500).json({
      message: err.message
    })
  }
}


const putSubCategories = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body

  try {
    const existingSubCategory = await SubCategory.findById(id);
    if (!existingSubCategory) {
      return res.status(404).json({
        message: "No subcategory found"
      })
    }

    const updateSubCategory = await SubCategory.findByIdAndUpdate(id,
      {
        name: name
      }, {
        after: true
      }
    )
    res.status(200).json({
      message: "Sub Category updated"
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const deleteSubCategories = async(req, res) => {
  const { id } = req.params;
  try {
    const deleted = await SubCategory.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        message: "No subCategory found"
      })
    }
    res.status(200).json({
      message: "Sub category deleted"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}


module.exports = {
  getSubCategories, postSubCategories, putSubCategories, deleteSubCategories
}