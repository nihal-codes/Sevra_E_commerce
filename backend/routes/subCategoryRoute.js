const express = require("express");

const router = express.Router();

const {
  getSubCategories,
  postSubCategories,
  putSubCategories,
  deleteSubCategories
} = require("../controllers/subCategoryController")

const verifyToken = require("../middleware/VerifyToken")

router.use(verifyToken)

router.get("/", getSubCategories);

router.post("/", postSubCategories);

router.put("/:id", putSubCategories);

router.delete("/:id", deleteSubCategories);

module.exports = router