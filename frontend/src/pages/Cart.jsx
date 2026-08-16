import { use, useEffect, useState } from "react";
import api from "../api/api";
import ProductCard2 from "../components/ProductCard2";
import useProductCatalog from "../hooks/useProductCatalog";

const Cart = () => {

  const [savedCartOrders, setSavedCartOrders ] = useState([])
  const { products } = useProductCatalog();
  const [filteredProducts, setFilteredProducts] = useState([])

  const getCartOrders = async() => {
    try {
      const response = await api.get("/cart")
      setSavedCartOrders(response.data.cartOrders)
    }
    catch (err) {
      console.log(err.response.data)
    }
  }

  const deleteFromCart = async (id) => {
    try {
      const response = await api.delete(`/cart/${id}`)
      getCartOrders();
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  const emptyCart = async() => {
    try {
      const response = await api.delete("/cart")
      getCartOrders();
      console.log(response.data)
    }
    catch (err) {
      console.log(err.response?.data)
    }
  }
  
  useEffect(() => {
    getCartOrders()
  },[])

  const filterProducts = () => {
    const matched = savedCartOrders
    .map(order => products.find(p => p._id === order.productId))
    .filter(Boolean)
    setFilteredProducts(matched)
  }

  const totalPrice = filteredProducts.reduce((sum, product) => {
    const orderEntry = savedCartOrders.find(order => order.productId === product._id);
    const qty = orderEntry?.quantity ?? 1;
    return sum + product.price * qty;
  }, 0);

  useEffect(() => {
    filterProducts();
  }, [products, savedCartOrders])

  return (
    <>
      <div className="flex gap-4">
        <div>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <h1>Your Cart</h1>
              <h3>{savedCartOrders.length} items in your cart</h3>
            </div>

            <div>
              <button className="" onClick={() => emptyCart()}>Clear Cart</button>
            </div>
          </div>

          <div>
            <div>
              <div></div>
            </div>
            {filteredProducts.map(product => {
              const savedCartOrder = savedCartOrders.find(order => order.productId === product._id)
              return (
                <div key={product._id} className="flex w-fit">
                  <ProductCard2
                    image    = {product.image}
                    name     = {product.name}
                    brand    = {product.brand}
                    price    = {product.price}
                    rating   = {product.rating}
                    quantity = {savedCartOrder?.quantity}
                    onClick={() => deleteFromCart(savedCartOrder?._id)}
                  />
                </div>
            )})}
          </div>
        
        </div>

        <div className="p-4 w-80">
          <div className="flex justify-between">
            <h2>Order Summary</h2>
            <h2>{savedCartOrders.length} items</h2>
          </div>

          <div>
            <div className="flex">
              <h2>SubTotal</h2>
              <h2>{totalPrice}</h2>
            </div>

            <div className="flex">
              <h2>Shipping</h2>
              {totalPrice > 500 ? 
              <h1>₹0 <span className="line-through">₹80</span></h1> : 
              <h1>₹80</h1> }
            </div>

            <div className="flex">
              <h2>Extimated Tax</h2>
              <h2>{totalPrice * 3 /100}</h2>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <h1>Total</h1>
              <h2>Including Taxes</h2>
            </div>
            <div>
              <h1>{totalPrice > 500 ? totalPrice + (totalPrice*3/100) : totalPrice+80+(totalPrice*3/100) }</h1>
            </div>
          </div>

          <div>
            <button className="rounded bg-(--flame) text-white">
              Proceed to Checkout <i class="ri-arrow-right-line"></i>
            </button>
            <h5><i class="ri-lock-line"></i> Secure Checkout</h5>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart;