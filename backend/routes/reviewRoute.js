const express = require("express");

const router = express.Router();

const {
  getReviews, postReviews, putReview, deleteReview
} = require("../controllers/reviewController")

router.get("/", getReviews);
router.post("/", postReviews);
router.put("/:id", putReview);
router.delete("/:id", deleteReview);

module.exports = router;