const mongoose = require("mongoose")

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String
  },
  categoryId: {
    type: String
  }
});

const SubCategory = mongoose.model("SubCategory", subCategorySchema);

module.exports = SubCategory;