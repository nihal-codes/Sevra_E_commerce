import api from "../api/api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Button from "../components/button"
import toast from "react-hot-toast"
import Buy from "./Buy"
import UserHeader from "./UserHeader"
import ProductCard from "../components/ProductCard"

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
    setQuantity(quantity => quantity-1)
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
      <div className="flex flex-col gap-4 p-2 border rounded w-fit">
        <div className="flex gap-2">
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.brand}</p>
          <p>{product.discount}</p>
          <p>{product.stock}</p>
        </div>
        <div className="flex border w-fit p-1 rounded gap-2">
          <button onClick={() => decrementQuantity()}>-</button>
          <p>{quantity}</p>
          <button onClick={() => incrementQuantity()}>+</button>
        </div>
        <div className="flex rounded gap-4 p-2">

          <Button name="Buy"
          onClick={() => setBuyWindow(true)}/>
          <Button name="Add to Cart"
          onClick={() => handleAddToCart()}/>
        </div>
      </div>
        {buyWindow === true && 
          <Buy 
            productId={id}
            userId={userId}
            quantity={quantity}  
            oldStock={product.stock}
          />
        }
    </>
  )
}

export default ProductDescription;