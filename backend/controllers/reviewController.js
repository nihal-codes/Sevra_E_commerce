const Product = require("../models/Product")
const Review = require("../models/Reviews")
const User = require("../models/Users")

const getReviews = async(req, res) => {
  const { productId } = req.query;

  try {
    const filter = productId ? { productId } : {};
    const reviews = await Review.find(filter).sort({ _id: -1 });

    const userIds = [...new Set(reviews.map((review) => review.userId).filter(Boolean))];
    const users = await User.find({ _id: { $in: userIds } }).select("fullName");
    const userMap = {};
    users.forEach((user) => {
      userMap[user._id.toString()] = user.fullName;
    });

    const reviewsWithNames = reviews.map((review) => ({
      ...review.toObject(),
      userName: userMap[review.userId] || "Anonymous"
    }));

    res.status(200).json({
      message: reviewsWithNames.length ? "Reviews fetched" : "No reviews found",
      reviews: reviewsWithNames
    })
  } catch (err) {
    return res.status(500).json({
      message : err.message
    })
  }
}

const postReviews = async(req, res) => {
  const { rating, reviewDesc, productId } = req.body;
  const { id: userId } = req.user;

  try {
    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }
    if (!reviewDesc || !reviewDesc.trim()) {
      return res.status(400).json({ message: "Review description is required" });
    }

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found! Cant insert"
      })
    }

    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res.status(409).json({
        message: "You have already reviewed this product"
      })
    }

    const newReview = new Review({
      rating: rating,
      reviewDesc: reviewDesc,
      productId: productId,
      userId: userId
    })

    await newReview.save();

    const allReviews = await Review.find({ productId });
    const avgRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(avgRating * 10) / 10
    });

    res.status(201).json({
      message: "Review added"
    })

  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const putReview = async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body

  try {
    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return res.status(404).json({
        message: "No review found"
      })
    }

    await Review.findByIdAndUpdate(id,
      {
        rating: rating,
      }, {
        new: true
      }
    )

    const allReviews = await Review.find({ productId: existingReview.productId });
    const avgRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
    await Product.findByIdAndUpdate(existingReview.productId, {
      rating: Math.round(avgRating * 10) / 10
    });

    res.status(200).json({
      message: "Review updated"
    })
  }
  catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Review.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({
        message: "No review found"
      })
    }

    const remainingReviews = await Review.find({ productId: deleted.productId });
    const avgRating = remainingReviews.length
      ? remainingReviews.reduce((sum, review) => sum + review.rating, 0) / remainingReviews.length
      : 0;
    await Product.findByIdAndUpdate(deleted.productId, {
      rating: Math.round(avgRating * 10) / 10
    });

    res.status(200).json({
      message: "Review deleted"
    })
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
}

module.exports = {
  getReviews, postReviews, putReview, deleteReview
}