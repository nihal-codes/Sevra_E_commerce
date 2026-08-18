const express = require("express")

const router = express.Router();

const {
  getCategories, postCategories, putCategory, deleteCategory
} = require("../controllers/categoryController")
const verifyToken = require("../middleware/VerifyToken")

router.get("/", getCategories)

router.post("/",verifyToken, postCategories)

router.put("/:id",verifyToken, putCategory)

router.delete("/:id",verifyToken, deleteCategory)

module.exports = router