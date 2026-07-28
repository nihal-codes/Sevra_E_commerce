const express = require("express")

const router = express.Router();

const {
  getCategories, postCategories, putCategory, deleteCategory
} = require("../controllers/categoryController")
const verifyToken = require("../middleware/VerifyToken")

router.use(verifyToken)

router.get("/", getCategories)

router.post("/", postCategories)

router.put("/:id", putCategory)

router.delete("/:id", deleteCategory)

module.exports = router