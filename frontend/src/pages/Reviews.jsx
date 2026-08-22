import api from "../api/api";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/errorMessage";

const UserReview = () => {
  const [products, setProducts    ] = useState([]);
  const [reviews, setReviews      ] = useState([]);
  const [productId, setProductId  ] = useState("")
  const [reviewId, setReviewId    ] = useState("")
  const [inputBox, showInputBox   ] = useState(false)
  const [updateBox, showUpdateBox ] = useState(false)
  const [newRating, setNewRating  ] = useState("")

  const { register, handleSubmit, formState: {isSubmitting}} = useForm();

  const getProducts = async() => {
    try {
      const response = await api.get("/products")
      setProducts(response.data.products)
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to load products"))
    }
  }

  const getReviews = async() => {
    try {
      const response = await api.get("/reviews")
      setReviews(response.data.reviews)
      console.log(response.data.reviews)
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to load reviews"))
    }
  }

  useEffect(() => {
    getProducts();
    getReviews();
  }, [])

  const handleAddReview = async (data) => {
    try {
      const response = await api.post("/reviews", {
        rating: data.rating,
        reviewDesc: data.reviewDesc,
        productId: productId
      })
      console.log(response.data)
      getProducts();
      getReviews();
      showInputBox(false)
    } 
    catch (err) {
      toast.error(getErrorMessage(err, "Unable to add review"))
    }
  }

  const handlePutReview = async (id, newRating) => {
    try {
      const response = await api.put(`/reviews/${id}`, {
        rating: newRating,
      })
      console.log(response.data)
      getProducts();
      getReviews();
      setNewRating("")  
      showUpdateBox(false)
    } 
    catch (err) {
      toast.error(getErrorMessage(err, "Unable to update review"))
    }
  }

  const handleDeleteSubCategory = async(id) => {
    try {
      const response = await api.delete(`/reviews/${id}`)
      console.log(response.data)
      getProducts();
      getReviews();    
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to delete review"))
    }
  }

  const handleInputBox = (id) => {
    setProductId(id)
    showInputBox(true)
  }

  const handleUpdateBox = (id) => {
    setReviewId(id);
    showUpdateBox(true);
  }

  return (
    <>
      <div className=" w-fit">
        {products.map((product) => (
          <div key={product._id} className="flex flex-row  gap-4 ">
            <button onClick={() => handleInputBox(product._id)} className="flex border p-1 rounded m-2">{product.name}</button>
          </div>
        ))}
      </div>

      <div>
        {reviews.map((review) => (
          <div key={review._id} className="flex w-80 m-2 rounded-lg p-2 border items-center justify-between">
            <p>{review.rating}</p>
            <p>{review.reviewDesc}</p>
            <div className="flex gap-4">
              <button className="border p-1 rounded" onClick={() => handleUpdateBox(review._id)}>Update</button>
              <button className="border p-1 rounded" onClick={() => handleDeleteSubCategory(review._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div>
        {updateBox === true && 
          <div className="flex flex-col border rounded-lg w-fit m-2 gap-4 p-4">
            <input type="text" value={newRating} onChange={(e) => setNewRating(e.target.value)} placeholder="Enter new rating" className="border w-fit p-1 rounded"/>
            <button onClick={() => handlePutReview(reviewId, newRating)}>Done</button>
          </div>}
      </div>


      {inputBox === true && 
      <form onSubmit={handleSubmit(handleAddReview)} className="border w-fit flex flex-col gap-4 p-4 rounded-lg">
        <input type="text" {...register("rating")} placeholder="Enter rating" className="border p-1 rounded"/>
        <input type="text" {...register("reviewDesc")} placeholder="Enter description" className="border p-1 rounded"/>

        <input type="submit" value={isSubmitting ? "Adding Review" : "Add Review"} disabled={isSubmitting} className="border w-fit p-1 rounded"/>
      </form>}
    </>
  )
}

export default UserReview;