const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  reviewDesc: {
    type: String
  },
  productId: {
    type: String
  }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;