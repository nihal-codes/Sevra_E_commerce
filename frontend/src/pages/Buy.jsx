import { useState } from "react";
import api from "../api/api";
import Button from "../components/button";
import toast from "react-hot-toast";

const Buy = ({productId, userId, quantity, oldStock}) => {
  const [location, setLocation ] = useState("")
  
  const updateStock = async () => {
    if (oldStock-quantity < 0){
      toast.error("Cant Place order")
      return
    }
    try {
      const response = await api.put(`/products/${productId}`, {
        stock: oldStock-quantity
      })
      console.log(response.data)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const placeOrder = async() => {
    if (oldStock-quantity < 0){
      toast.error("Cant Place order")
      return
    }
    try {
      const response = await api.post("/order", 
        {
          userId: userId,
          productId: productId,
          location: location,
          quantity: quantity,
        }
      )
      console.log(response.data)
      updateStock();
    } catch (err) {
      console.log(err.response.data)
    }
  }
  
  return (
    <>
      <div className="border p-4 w-fit rounded-lg flex flex-col items-center justify-center">
        <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-1 rounded"/>
        <Button name="Place Order" onClick={() => {placeOrder(); ;}}/>
      </div>
    </>
  )
}

export default Buy;