import api from "../api/api"
import { useState, useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import Buy from "./Buy"
import UserHeader from "./UserHeader"
import StarRating from "../components/StarRating"
import ProductTag from "../components/ProductTag"
import DialogBox from "../components/DialogBox"
import useAuthStore from "../store/AuthStore"
import { getErrorMessage } from "../utils/errorMessage"

const ProductDescription = () => {
  const [product, setProduct   ] = useState([])
  const [quantity, setQuantity ] = useState(0)
  const [userId, setUserId     ] = useState("")
  const [buyWindow, setBuyWindow ] = useState(false)
  const [reviews, setReviews   ] = useState([])
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const { id } = useParams();

  const getProduct = async() => {
    try {
      const response = await api.get(`/products/${id}`)
      setUserId(response.data._id)
      setProduct(response.data.product)
    }
    catch (err) {
      toast.error(getErrorMessage(err, "Unable to load product"))
    }
  }

  const getReviews = useCallback(async () => {
    try {
      const response = await api.get("/reviews", { params: { productId: id } })
      setReviews(response.data.reviews)
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to load reviews"))
    }
  }, [id])

  useEffect(() => {
    getProduct();
    getReviews();
  }, [id])

  useEffect(() => {
    setQuantity(product.minOrderQuantity)
  }, [product])


  const incrementQuantity = () => {
    if (quantity >= product.stock){
      toast.error("Minimum Quantity Reached")
      return  
    } 
    setQuantity(quantity => quantity+1)
  }

  const decrementQuantity = () => { 
    if (quantity <= product.minOrderQuantity){
      toast.error("Maximum Quantity Reached")
      return  
    } 
    setQuantity(prev => prev-1)
  }

  const handleAddToCart = async () => {
    try {
      const response = await api.post("/cart", {
        productId: id,
        orderStatus: false,
        quantity: quantity
      })
      console.log(response.data)
      if (response.status === 200) {
        toast.error("Already added in cart")        
      }
      if (response.status === 201) {
        toast.success("Added to cart successfully")
      }
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to update cart"))
    }
  }

  const handleAddReview = async (data) => {
    try {
      await api.post("/reviews", {
        productId: id,
        rating: selectedRating,
        reviewDesc: data.reviewDesc
      })
      toast.success("Review added")
      reset();
      setSelectedRating(0);
      getReviews();
      getProduct();
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to add review"))
    }
  }

  return (
    <>  
      <div className="bg-(--bg) gap-8 flex flex-col min-h-screen">
      <UserHeader />
      <div className="relative bg-(--bg) min-h flex flex-col justify-center gap-12 items-center" >
        {buyWindow &&   
        <div className="absolute h-screen -top-32.5 inset-0 bg-black/50" 
        onClick={() => {
          setBuyWindow(false);
          }}>
        </div>
      }
        <div className="flex flex-col lg:flex-row px-6 lg:px-0 gap-6 lg:gap-12">
          <div className="flex flex-col lg:flex-row gap-6 border border-(--truffle) p-2 lg:p-6 rounded-lg ">
            <div className="hidden lg:block">
              <img src={product.image} alt="" className="h-20 w-18 rounded-lg border border-(--truffle)"/>
            </div>
            <div className="relative self-center">
              <img src={product.image} alt={product.name} className="h-100 w-90 rounded-lg border border-(--truffle)"/>
              <div className="absolute hidden lg:flex items-center justify-center h-8 w-8 bg-(--bg) border border-(--truffle) rounded-full bottom-3 right-3">
                <i className="ri-expand-diagonal-line"></i>
              </div>
            
          </div>  
            </div>

          <div className="flex flex-col px-6 lg:px-0 gap-2">
            <h3 className="bg-(--oatmeal) flex items-center text-sm w-fit p-1 rounded-lg px-2 text-(--fblue)"><span className="text-[10px] align-middle mr-2"><i className="ri-checkbox-blank-circle-fill"></i></span> {product.stock ? "In Stock" : "Out of Stock"}</h3>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <h3 className="text-(--truffle) font-semibold"><span className="text-(--fblue) font-medium">by </span>{product.brand}</h3>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl font-semibold">₹{product.price}</h1>
              <h2 className="line-through text-(--fblue) opacity-70">₹{product.price+product.discount}</h2>
              <h2 className="rounded-full bg-(--truffle) text-white px-2 py-1 text-xs">{Math.round((product.discount/(product.price+product.discount))*100)}% OFF</h2>
            </div>
            <hr className="opacity-70 text-(--fblue) mb-2"/>
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={product.rating} />
              <h3 className="text-sm text-(--fblue)">{product.rating}</h3>
            </div>
            <h3 className="text-sm text-(--ablue)">{product.description}</h3>

            <div className="flex gap-16 mt-3">
              <div className="flex flex-col gap-4">
                <ProductTag 
                  icon={"ri-money-rupee-circle-line"}
                  name={"Price"}
                  value={`₹${product.price}`}
                />

                <ProductTag 
                  icon={"ri-price-tag-3-line"} 
                  name={"Discount"} 
                  value={`₹${product.discount}`}
                />

                <ProductTag 
                  icon={"ri-box-1-line"} 
                  name={"Stock"} 
                  value={`${product.stock} units available`}
                  />
                
                <ProductTag 
                  icon={"ri-shopping-cart-2-line"} 
                  name={"Minimum Order Quantity"} 
                  value={product.minOrderQuantity}
                />
                
              </div>

              <div className="flex flex-col gap-4">
                <ProductTag 
                  icon={"ri-award-line"} 
                  name={"Brand"} 
                  value={product.brand}
                />

                <ProductTag 
                  icon={"ri-star-line"} 
                  name={"Rating"} 
                  value={product.rating}
                />

                <ProductTag 
                  icon={"ri-shield-check-line"} 
                  name={"Return Policy"} 
                  value={product.returnPolicy}
                  />
              </div>
            </div>

          </div>
        </div>

        <div className="flex rounded-xl border-2 border-(--truffle)  ">
          <div className="hidden lg:flex gap-4 m-6 ">
            <div className="w-fit lg:w-45 border-r border-(--truffle) flex items-center lg:items-start gap-3">
              <i className={`ri-truck-line font-thin text-2xl text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
              <h2 className="text-xs font shrink-">
                <span className="font-semibold">Fast Delivery</span>
                <br />
                <span className="hidden lg:block">Get your order in 3-5 business days</span>
              </h2>
            </div>
            <div className="w-fit lg:w-45 border-r border-(--truffle) flex items-center lg:items-start gap-3">
              <i className={`ri-shield-check-line font-thin text-2xl text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
              <h2 className="text-xs font shrink-">
                <span className="font-semibold">Secure Payment</span>
                <br />
                <span className="hidden lg:block">100% secure payments with trusted partners</span>
              </h2>
            </div>
            
            <div className="w-fit lg:w-45 flex items-center lg:items-start gap-3">
              <i className={`ri-customer-service-line font-thin text-2xl text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
              <h2 className="text-xs font shrink-">
                <span className="font-semibold">24/7 Support</span>
                <br />
                <span className="hidden lg:block">We''re here to help you anytime</span>
              </h2>
            </div>
          </div>

          <div className="hidden lg:block w-px bg-(--truffle)"></div>

          <div className="flex gap-4 m-3 lg:m-6" >
            <div className="flex items-center gap-5 bg-(--light) border border-(--truffle) rounded-lg p-1 w-30 justify-center px-3">
              <button onClick={() => decrementQuantity()}><i className="ri-subtract-line text-lg"></i></button>
              <h2 className="text-(--ablue) text-lg">{quantity}</h2>
              <button onClick={() => incrementQuantity()}><i className="ri-add-line text-lg"></i></button>
            </div>
            <div className="flex gap-4 ">
              <button onClick={() => handleAddToCart()}
              className="border w-30 rounded-lg border-(--truffle) text-sm">
                <i className="ri-shopping-cart-line mr-2"></i>Add to Cart 
              </button>
              <button onClick={() => setBuyWindow(true)}
                className="border w-30 rounded-lg bg-(--truffle) text-white text-sm">
                <i className="ri-flashlight-fill mr-1"></i>Buy Now
              </button>
            </div>
          </div>
        </div>
        {buyWindow === true && 
          <DialogBox>
            <Buy 
            productId={id}
            userId={userId}
            quantity={quantity}  
            oldStock={product.stock}
            setBuyWindow={setBuyWindow}
            />
          </DialogBox>
        }

        <div className="flex flex-col gap-6 w-full max-w-4xl px-4 lg:px-0">
          <h2 className="text-xl font-bold text-(--ablue)">Customer Reviews</h2>

          {isAuthenticated ? (
            <form
              onSubmit={handleSubmit(handleAddReview)}
              className="flex flex-col gap-3 border border-(--oatmeal) rounded-lg p-4 bg-(--bg)"
            >
              <h3 className="text-sm font-semibold text-(--ablue)">Write a review</h3>
              <div className="flex gap-1 text-2xl">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    onClick={() => setSelectedRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className={`ri-star-fill cursor-pointer ${
                      star <= (hoverRating || selectedRating) ? "text-(--truffle)" : "text-gray-300"
                    }`}
                  ></i>
                ))}
              </div>
              <textarea
                {...register("reviewDesc")}
                required
                placeholder="Share your thoughts about this product..."
                rows={3}
                className="border border-(--oatmeal) rounded-lg p-2 outline-none bg-(--bg) text-sm"
              />
              <button
                type="submit"
                disabled={isSubmitting || selectedRating === 0}
                className="border border-(--oatmeal) w-fit rounded-full shadow px-4 py-1.5 text-sm transition-all duration-150 hover:bg-(--oatmeal) disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          ) : (
            <p className="text-sm text-(--fblue) opacity-70">Log in to write a review.</p>
          )}

          <div className="flex flex-col gap-4">
            {reviews.map((review) => (
              <div key={review._id} className="flex flex-col gap-1 border-b border-(--oatmeal) pb-4">
                <div className="flex items-center gap-3">
                  <h3 className="text-sm font-semibold text-(--ablue)">{review.userName}</h3>
                  <StarRating rating={review.rating} />
                </div>
                <p className="text-sm text-(--fblue)">{review.reviewDesc}</p>
              </div>
            ))}

            {reviews.length === 0 && (
              <p className="text-sm opacity-60">No reviews yet. Be the first to review this product.</p>
            )}
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default ProductDescription;