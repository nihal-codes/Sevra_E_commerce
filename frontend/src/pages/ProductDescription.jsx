import api from "../api/api"
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Button from "../components/button"
import toast from "react-hot-toast"
import Buy from "./Buy"
import UserHeader from "./UserHeader"
import ProductCard from "../components/ProductCard"
import StarRating from "../components/StarRating"
import ProductTag from "../components/ProductTag"
import DialogBox from "../components/DialogBox"

const ProductDescription = () => {
  const [product, setProduct   ] = useState([])
  const [quantity, setQuantity ] = useState(0)
  const [userId, setUserId     ] = useState("")
  const [buyWindow, setBuyWindow ] = useState(false)
  const navigate = useNavigate();

  const { id } = useParams();

  const getProduct = async() => {
    try {
      const response = await api.get(`/products/${id}`)
      setUserId(response.data._id)
      setProduct(response.data.product)
    }
    catch (err) {
      console.log(err.response.data)
    }
  }
  

  useEffect(() => {
    getProduct();
  }, [])

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
      console.log(err.response.data)
    }
  }

  return (
    <>  
      <div className="bg-(--bg) gap-8 flex flex-col min-h-screen">
      <UserHeader />
      <div className="relative bg-(--bg) min-h flex flex-col justify-center gap-12 items-center" >
        <button className="absolute left-4 top-0 border p-1 px-2 rounded-lg border-(--truffle)" onClick={() => navigate("/")}><i className="ri-arrow-left-line mr-1"></i>Back</button>
        {buyWindow &&   
        <div className="absolute inset-0 bg-black/50" 
        onClick={() => {
          setBuyWindow(false);
          }}>
        </div>
      }
        <div className="flex gap-12">
          <div className="flex gap-6 border border-(--truffle) p-6 h-113 rounded-lg ">
            <div className="">
              <img src={product.image} alt="" className="h-20 w-18 rounded-lg border border-(--truffle)"/>
            </div>
            <div className="relative">
              <img src={product.image} alt={product.name} className="h-100 w-90 rounded-lg border border-(--truffle)"/>
              <div className="absolute flex items-center justify-center h-8 w-8 bg-(--bg) border border-(--truffle) rounded-full bottom-3 right-3">
                <i className="ri-expand-diagonal-line"></i>
              </div>
            </div>
          </div>  

          <div className="flex flex-col gap-2">
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
                  value={product.price}
                />

                <ProductTag 
                  icon={"ri-price-tag-3-line"} 
                  name={"Discount"} 
                  value={`${product.discount}%`}
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
          <div className="flex gap-4 m-6">
            <div className="w-45 border-r border-(--truffle) flex items-start gap-3">
              <i className={`ri-truck-line font-thin text-2xl text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
              <h2 className="text-xs font shrink-">
                <span className="font-semibold">Fast Delivery</span>
                <br />
                Get your order in 3-5 business days
              </h2>
            </div>
            <div className="w-45 border-r border-(--truffle) flex items-start gap-3">
              <i className={`ri-shield-check-line font-thin text-2xl text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
              <h2 className="text-xs font shrink-">
                <span className="font-semibold">Secure Payment</span>
                <br />
                100% secure payments with trusted partners
              </h2>
            </div>
            
            <div className="w-45 flex items-start gap-3">
              <i className={`ri-customer-service-line font-thin text-2xl text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
              <h2 className="text-xs font shrink-">
                <span className="font-semibold">24/7 Support</span>
                <br />
                We're here to help you anytime
              </h2>
            </div>
          </div>

          <div className="w-px bg-(--truffle)"></div>

          <div className="flex gap-4 m-6" >
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
            />
          </DialogBox>
        }
      </div>
      </div>
    </>
  )
}

export default ProductDescription;