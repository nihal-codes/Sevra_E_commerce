import api from "../api/api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
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
      toast.error("Cant do more than this dude")
      return  
    } 
    setQuantity(quantity => quantity+1)
  }

  const decrementQuantity = () => {
    if (quantity <= product.minOrderQuantity){
      toast.error("Cant do less than this dude")
      return  
    } 
    setQuantity(prev => prev-1)
  }

  const handleAddToCart = async () => {
    try {
      const response = await api.post("/cart", {
        userId: userId,
        productId: id,
        orderStatus: false
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
      <div>
        {buyWindow && 
        <div className="absolute inset-0 bg-black/50" 
        onClick={() => {
          setBuyWindow(false);
          }}>
        </div>
      }
        <div className="flex">
          <div>
            <div>
              <img src={product.image} alt={product.name} className="h-80 "/>
            </div>
          </div>  

          <div className="flex flex-col">
            <h3>{product.stock ? "In Stock" : "Out of Stock"}</h3>
            <h1>{product.name}</h1>
            <h3><span>by</span>{product.brand}</h3>
            <div className="flex">
              <h1>₹{product.price - product.discount}</h1>
              <h2>{product.price}</h2>
              <h2>{product.discount/(product.price)*100}</h2>
            </div>
            <hr />
            <div className="flex">
              <StarRating rating={product.rating} />
              <h3>{product.rating}</h3>
            </div>
            <h3>{product.description}</h3>

            <div className="flex">
              <div className="flex flex-col">
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

              <div className="flex flex-col">
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

        <div className="flex">
          <div className="flex ">
            <ProductTag 
              icon={"ri-truck-line"} 
              name={"Fast Delivery"} 
              value={"Get your order in 3-5 business days"}
            />
            <ProductTag 
              icon={"ri-shield-check-line"} 
              name={"Secure Payment"} 
              value={"100% secure payments with trusted partners"}
            />
            <ProductTag 
              icon={"ri-customer-service-line"} 
              name={"24/7 Support"} 
              value={"We're here to help you anytime"}
            />
          </div>
          <div className="flex">
            <div className="flex gap-2 border rounded-lg p-1">
              <button onClick={() => decrementQuantity()}><i className="ri-subtract-line"></i></button>
              <h2>{quantity}</h2>
              <button onClick={() => incrementQuantity()}><i className="ri-add-line"></i></button>
            </div>
            <div>
              <Button name="Add to Cart"
              onClick={() => handleAddToCart()}/>
              <Button name="Buy"
              onClick={() => setBuyWindow(true)}/>
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
    </>
  )
}

export default ProductDescription;