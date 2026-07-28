const Product = require("../models/Product")
const Review = require("../models/Reviews")

const getReviews = async(req, res) => {
  try {
    const products = await Product.find()
    if (products.length === 0){ 
      return res.status(404).json({ 
        message: "Products not found"
      })
    }
    const reviews = await Review.find();
    if (reviews.length === 0){
      return res.status(404).json({
        message: "Reviews not found"
      })
    }
    res.status(200).json({
      products: products,
      reviews: reviews,
      message: "Data found"
    })
  } catch (err) {
    return res.status(500).json({
      message : err.message
    })
  }
}

const postReviews = async(req, res) => {
  const { rating, reviewDesc, productId } = req.body;
    try {
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({
          message: "Product not found! Cant insert"
        })
      }
      const newReview = new Review({
        rating: rating, 
        reviewDesc: reviewDesc,
        productId: productId
      })
  
      const savedReview = await newReview.save();
  
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

    const updateReview = await Review.findByIdAndUpdate(id,
      {
        rating: rating,
      }, {
        after: true
      }
    )
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
