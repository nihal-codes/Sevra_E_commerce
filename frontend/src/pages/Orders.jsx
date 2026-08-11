import { useEffect, useState } from "react";
import api from "../api/api";

const Order = () => {
  const [orders, setOrders ] = useState([])
  const [products, setProducts] = useState([])
  const [filteredProduct, setFilteredProduct] = useState(null)
  const [users, setUsers ] = useState([])

  const fetchOrders = async () => {
    try {
      const response = await api.get("/order");
      setOrders(response.data.orders)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const getProducts = async() => {
    try {
      const response = await api.get("/products")
      setProducts(response.data.products)
    }
    catch (err) {
      console.log(err.response?.data)
    }
  };

  const getUsers = async() => {
    try {
      const response = await api.get("/users");
      setUsers(response.data.users);
    } catch (err) {
      console.log(err.response.data)
    }
  }

  useEffect(() => {
    fetchOrders();
    getProducts();
    getUsers();
  },[])

  return (
    <> 
      <div>
        <div className="grid grid-cols-[3fr_1.5fr_1fr_1fr_1.5fr_1fr] gap-2 px-3 py-4 rounded-t-lg text-xs font-semibold bg-(--oatmeal) text-(--ablue) ">
            <div>Product</div>
            <div>User's Name</div>
            <div>Quantity</div>
            <div>Location</div>
            <div>Order Status</div>
            <div>Delivery Status</div>
          </div>
          <div className="">
            {orders.map((order) => {
              const product = products.find((product) => product._id === order.productId)
              const user = users.find((user) => user._id === order.userId)
              return (
                <div key={order._id} className="grid grid-cols-[3fr_1.5fr_1fr_1fr_1.5fr_1fr] gap-2 items-center px-3 py-2 border-b border-x border-(--oatmeal) hover:bg-(--oatmeal)/20 transition-colors duration-300 ease-in-out">
                  <div className="flex gap-4">
                    <img src={product?.image} alt="" className="h-16 w-16 rounded-lg"/>
                    <div>
                      <h2 className="text-xs font-semibold">{product.name}</h2>                          
                      <h2 className="text-xs font-light">{product.brand}</h2>    
                    </div>
                  </div>
                  <div>
                    <h1>{user.fullName}</h1>
                  </div>
                  <div>
                    <h2>{order.quantity}</h2>
                  </div>
                  <div>
                    <h2>{order.location}</h2>
                  </div>
                  <div>
                    <h2>{order.orderedStatus ? "True" : "False"}</h2>
                  </div>
                  <div>
                    <h2>{order.deliveredStatus ? "Delivered" :"Not delivered"}</h2>
                  </div>
                </div>
              )
            })}
          </div>
      </div>
    </>
  )
}

export default Order;