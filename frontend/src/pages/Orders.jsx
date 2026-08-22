import api from "../api/api";
import UserHeader from "./UserHeader";
import { useEffect, useState } from "react";
import ProductCard3 from "../components/ProductCard3";
import useProductCatalog from "../hooks/useProductCatalog";
import toast from "react-hot-toast"
import { getErrorMessage } from "../utils/errorMessage"

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { products } = useProductCatalog();
  const [combinedOrders, setCombinedOrders] = useState([])

  const fetchOrders = async() => {
    try {
      const response = await api.get("/order")
      setOrders(response.data.orders)
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to load orders"))
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [])

  useEffect(() => {
    const combined = orders
      .map(order => {
        const product = products.find(p => p._id === order.productId)
        if (!product) return null
        return {
          ...product,
          orderId: order._id,
          quantity: order.quantity,
          status: order.deliveredStatus ? "Delivered" : "Processing",
        }
      })
      .filter(Boolean)
    setCombinedOrders(combined)
  }, [products, orders])

  const cancelOrder = async(id) => {
    try {
      const response = await api.delete(`/order/${id}`)
      toast.success(response?.data.message)
      fetchOrders();  
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to cancel order"))
    }
  }

  return (
    <>
      <div className="flex flex-col gap-6 bg-(--bg) min-h-screen  ">
        <UserHeader />
        
        <div className="relative flex flex-col p-4 h-[83dvh] w-full mx-auto justify-between items-center bg-(--bg) ">
          <div className="flex justify-between gap-12 ">
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <h1 className="text-3xl font-semibold mb-2">Your Orders</h1>
                  <h3 className="text-sm text-(--fblue)">Total Orders: {orders.length}</h3>
                </div>
              </div>

              <div className="rounded-lg ">
                <div className="grid grid-cols-[3fr_3fr_3fr_3fr_1fr] lg:grid-cols-[6fr_3fr_2fr_3fr_1fr] px-3 py-4 rounded-t-lg text-sm font-semibold bg-(--oatmeal) text-(--ablue)">
                  <div>Product</div>
                  <div>Quantity</div>
                  <div>Total</div>
                  <div>Status</div>
                  <div>Cancel</div>
                </div>
                
                <div className="overflow-y-scroll scrollbar-none max-h-80">
                 {combinedOrders.map(order => (
                    <div key={order.orderId} className="border-x border-b border-(--oatmeal) shrink-0">
                      <ProductCard3
                        image    = {order.image}
                        name     = {order.name}
                        brand    = {order.brand}
                        price    = {order.price}
                        rating   = {order.rating}
                        quantity = {order.quantity}
                        status   = {order.status}
                        onClick  = {() => cancelOrder(order.orderId)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            
            </div>
          </div>

          <div className="flex gap-4 border border-(--truffle)/80 p-4 rounded-lg">
              <div className="w-fit lg:w-80 border-r border-(--truffle) flex items-start gap-3">
                <i className={`ri-truck-line font-thin text-2xl text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
                <h2 className="text-xs font shrink-">
                  <span className="font-semibold">Fast Delivery</span>
                  <br />
                  <span className="hidden lg:block">Get your order in 3-5 business days</span>
                </h2>
              </div>
              <div className="w-fit lg:w-80 border-r border-(--truffle) flex items-start gap-3">
                <i className={`ri-shield-check-line font-thin text-2xl text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
                <h2 className="text-xs font shrink-">
                  <span className="font-semibold">Secure Payment</span>
                  <br />
                  <span className="hidden lg:block">100% secure payments with trusted partners</span>
                </h2>
              </div>
              
              <div className="w-fit lg:w-80 flex items-start gap-3">
                <i className={`ri-customer-service-line font-thin text-2xl text-(--fblue) h-10 w-10 flex items-center justify-center`}></i>
                <h2 className="text-xs font shrink-">
                  <span className="font-semibold">24/7 Support</span>
                  <br />
                  <span className="hidden lg:block">We're here to help you anytifit lg:w-80</span>
                  
                </h2>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Orders;