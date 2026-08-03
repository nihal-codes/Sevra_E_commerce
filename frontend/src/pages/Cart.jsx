import { useEffect, useState } from "react";
import api from "../api/api";


const Cart = () => {

  const [savedCartOrders, setSavedCartOrders ] = useState([])

  const getCartOrders = async() => {
    try {
      const response = await api.get("/cart")
      setSavedCartOrders(response.data.cartOrders)
      console.log(response.data)
    }
    catch (err) {
      console.log(err.response.data)
    }
  }
  
  useEffect(() => {
    getCartOrders()
  },[])



  return (
    <>
      <div>
        {savedCartOrders.map((cart) => (
          <div>
            Dfck          
          </div>
        ))}
      </div>
    </>
  )
}

export default Cart;