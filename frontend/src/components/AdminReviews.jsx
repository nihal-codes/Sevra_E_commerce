import api from "../api/api"
import { useState, useEffect, useCallback } from "react"
import toast from "react-hot-toast"
import { getErrorMessage } from "../utils/errorMessage"
import StarRating from "./StarRating"
import useProductCatalog from "../hooks/useProductCatalog"

const AdminReviews = () => {
  const { products } = useProductCatalog();
  const [reviews, setReviews] = useState([])

  const getReviews = useCallback(async () => {
    try {
      const response = await api.get("/reviews")
      setReviews(response.data.reviews)
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to load reviews"))
    }
  }, [])

  useEffect(() => {
    getReviews();
  }, [getReviews])

  const handleDeleteReview = async (id) => {
    try {
      await api.delete(`/reviews/${id}`)
      toast.success("Review deleted")
      getReviews();
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to delete review"))
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-(--ablue)">Reviews</h1>
            <h4 className="text-xs font-light ">Manage all reviews from your store</h4>
          </div>
        </div>

        <div>
          <div className="grid grid-cols-[1fr_3fr_3fr_2fr_5fr_1fr] gap-2 px-3 py-4 rounded-t-lg text-sm font-semibold bg-(--oatmeal) text-(--ablue) ">
            <div>#</div>
            <div>Product</div>
            <div>Reviewer</div>
            <div>Rating</div>
            <div>Review</div>
            <div>Actions</div>
          </div>

          <div className="">
            {reviews.map((review, index) => {
              const product = products.find((product) => product._id === review.productId)
              return (
                <div key={review._id} className="grid grid-cols-[1fr_3fr_3fr_2fr_5fr_1fr] gap-2 items-center px-3 py-3 border-b border-x border-(--oatmeal) hover:bg-(--oatmeal)/20 transition-colors duration-300 ease-in-out text-sm">

                  <div><h2>{index + 1}</h2></div>

                  <div className="flex items-center gap-2">
                    {product?.image && <img src={product.image} alt="" className="h-9 w-9 rounded-lg object-cover" />}
                    <h2 className="font-semibold">{product?.name ?? "Unknown product"}</h2>
                  </div>

                  <div><h2>{review.userName}</h2></div>

                  <div><StarRating rating={review.rating} /></div>

                  <div><h2 className="text-xs opacity-80 line-clamp-2">{review.reviewDesc}</h2></div>

                  <div className="flex gap-1">
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="rounded-lg h-fit w-10 py-2 px-2 text-red-700 transition-all duration-150 hover:bg-(--oatmeal) border border-(--oatmeal)"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  </div>

                </div>
              )
            })}

            {reviews.length === 0 && (
              <div className="px-3 py-6 text-center text-sm opacity-60 border-b border-x border-(--oatmeal) rounded-b-lg">
                No reviews yet
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminReviews;