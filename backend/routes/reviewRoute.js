const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/VerifyToken")
const authorizeRole = require("../middleware/authorizeRole")

const {
  getReviews, postReviews, putReview, deleteReview
} = require("../controllers/reviewController")

router.get("/", getReviews);
router.post("/", verifyToken, postReviews);
router.put("/:id", verifyToken, authorizeRole("admin"), putReview);
router.delete("/:id", verifyToken, authorizeRole("admin"), deleteReview);

module.exports = router;