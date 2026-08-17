import api from "../api/api";
import { use, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import UserHeader from "./UserHeader";
import ProductTag from "../components/ProductTag";
import ProductCard2 from "../components/ProductCard2";
import useProductCatalog from "../hooks/useProductCatalog";

const Cart = () => {
  const navigate = useNavigate();

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

  const buyAllCart = () => {

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
      <div className="flex flex-col gap-6 bg-(--bg) min-h-screen  ">
        <UserHeader />
        
        <div className="relative flex flex-col p-4 h-[83dvh] w-full mx-auto justify-between items-center bg-(--bg) ">
          <button className="absolute left-4 top-4 border p-1 px-2 rounded-lg border-(--truffle)" onClick={() => navigate("/")}>
              <i className="ri-arrow-left-line mr-1"></i>Back
          </button>
          <div className="flex justify-between gap-12 ">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-semibold mb-2">Your Cart</h1>
                  <h3 className="text-sm text-(--fblue)">{savedCartOrders.length} items in your cart</h3>
                </div>

                <div>
                  <button className="border rounded px-3 py-1 text-(--truffle) font-semibold border-(--truffle) hover:bg-(--light)/40 " onClick={() => emptyCart()}>Clear Cart</button>
                </div>
              </div>

              <div className="rounded-lg ">
                <div className="grid grid-cols-[6fr_3fr_3fr_1fr] px-3 py-4 rounded-t-lg text-sm font-semibold bg-(--oatmeal) text-(--ablue)">
                  <div>Product</div>
                  <div>Quantity</div>
                  <div>Price</div>
                  <div>Delete</div>
                </div>
                
                <div className="overflow-y-scroll scrollbar-none max-h-80">
                  {filteredProducts.map(product => {
                    const savedCartOrder = savedCartOrders.find(order => order.productId === product._id)
                    return (
                      <div key={product._id} className="border-x border-b border-(--oatmeal) shrink-0">
                        <ProductCard2
                          image    = {product.image  }
                          name     = {product.name   }
                          brand    = {product.brand  }
                          price    = {product.price  }
                          rating   = {product.rating }
                          quantity = {savedCartOrder?.quantity}
                          onClick={() => deleteFromCart(savedCartOrder?._id)}
                          />
                      </div>
                      
                    )})}
                </div>
              </div>
            
            </div>

            <div className="px-8 py-8 w-90 mt-4 text-white bg-(--ablue) h-fit rounded-lg ">
              <div className="flex pb-4 justify-between border-b border-(--bg)/40">
                <h2 className="text-(--flame) uppercase font-semibold">Order Summary</h2>
                <h2 className="text-white/90">{savedCartOrders.length} <span className="text-sm">items</span></h2>
              </div>

              <div className="flex flex-col gap-4 py-4 text-white/90 border-b border-(--bg)/40 ">
                <div className="flex justify-between items-center">
                  <h2 className="text-sm">SubTotal</h2>
                  <h2 className="font-semibold">₹{totalPrice}</h2>
                </div>

                <div className="flex justify-between items-center">
                  <h2 className="text-sm">Shipping</h2>
                  {savedCartOrders.length === 0 ? <h1 className="font-semibold">₹0</h1>
                  :
                  
                  totalPrice > 500 ? 
                  <h1 className="font-semibold ">₹0 <span className="line-through opacity-40 font-normal">₹80</span></h1> : 
                  <h1>₹80</h1> }
                </div>

                <div className="flex justify-between items-center">
                  <h2 className="text-sm">Extimated Tax</h2>
                  <h2 className="font-semibold">₹{totalPrice * 3 /100}</h2>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-lg">Total</h1>
                  <h2 className="text-xs">Including Taxes</h2>
                </div>
                <div>
                  <h1 className="text-(--flame) text-2xl font-bold py-6">₹{totalPrice > 500 || savedCartOrders.length === 0 ? totalPrice + (totalPrice*3/100) : totalPrice+80+(totalPrice*3/100) }</h1>
                </div>
              </div>

              <div className="flex flex-col gap-4 items-center pt-4">
                <button 
                onClick={() => {}}
                className="rounded bg-(--flame) text-white w-full text-xl py-2 cursor-pointer transition-all duration-200 ">
                  Proceed to Checkout <i className="ri-arrow-right-line"></i>
                </button>
                <h5 className="text-xs text-white/80 select-none"><i className="ri-lock-line"></i> Secure Checkout</h5>
              </div>
            </div>
          </div>

          <div className="flex gap-4  border border-(--truffle)/80 p-4 rounded-lg">
              <div className="w-80 border-r border-(--truffle) flex items-start gap-3">
                <i className={`ri-truck-line font-thin text-2xl text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
                <h2 className="text-xs font shrink-">
                  <span className="font-semibold">Fast Delivery</span>
                  <br />
                  Get your order in 3-5 business days
                </h2>
              </div>
              <div className="w-80 border-r border-(--truffle) flex items-start gap-3">
                <i className={`ri-shield-check-line font-thin text-2xl text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
                <h2 className="text-xs font shrink-">
                  <span className="font-semibold">Secure Payment</span>
                  <br />
                  100% secure payments with trusted partners
                </h2>
              </div>
              
              <div className="w-80 flex items-start gap-3">
                <i className={`ri-customer-service-line font-thin text-2xl text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
                <h2 className="text-xs font shrink-">
                  <span className="font-semibold">24/7 Support</span>
                  <br />
                  We're here to help you anytime
                </h2>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart;