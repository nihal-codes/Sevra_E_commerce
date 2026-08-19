const express = require("express");
const authorizeRole = require("../middleware/authorizeRole")
const verifyToken = require("../middleware/VerifyToken")

const router = express.Router();

const {
  getSubCategories,
  postSubCategories,
  putSubCategories,
  deleteSubCategories
} = require("../controllers/subCategoryController")


router.get("/", getSubCategories);

router.post("/",verifyToken,authorizeRole("admin"), postSubCategories);

router.put("/:id",verifyToken,authorizeRole("admin"), putSubCategories);

router.delete("/:id",verifyToken,authorizeRole("admin"), deleteSubCategories);

module.exports = router