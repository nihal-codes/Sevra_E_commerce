const express = require("express")
const authorizeRole = require("../middleware/authorizeRole")
const router = express.Router();

const {
  getCategories, postCategories, putCategory, deleteCategory
} = require("../controllers/categoryController")
const verifyToken = require("../middleware/VerifyToken")

// All users new, logged in and admins, all of them can view the products
router.get("/", getCategories)

router.post("/",verifyToken,authorizeRole("admin"),  postCategories)

router.put("/:id",verifyToken, authorizeRole("admin"),putCategory)

router.delete("/:id",verifyToken,authorizeRole("admin"), deleteCategory)

module.exports = router