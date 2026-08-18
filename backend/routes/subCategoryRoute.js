const express = require("express");

const router = express.Router();

const {
  getSubCategories,
  postSubCategories,
  putSubCategories,
  deleteSubCategories
} = require("../controllers/subCategoryController")

const verifyToken = require("../middleware/VerifyToken")

router.get("/", getSubCategories);

router.post("/",verifyToken, postSubCategories);

router.put("/:id",verifyToken, putSubCategories);

router.delete("/:id",verifyToken, deleteSubCategories);

module.exports = router