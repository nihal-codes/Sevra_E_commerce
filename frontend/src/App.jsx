import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom"
import { useState } from "react"
import { Toaster } from "react-hot-toast"
import 'remixicon/fonts/remixicon.css'
import Admin from "./pages/Admin"
import Category from "./components/Category"
import SubCategory from "./components/SubCategory"
import Product from "./components/Product"
import Reviews from "./pages/Reviews"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import ProductDescription from "./pages/ProductDescription"
import Cart from "./pages/Cart"
import Sign from "./pages/SignPage"
import Order from "./pages/Orders"

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <>
        <Home />
      </>
  },
  {
    path: "/admin",
    element:
      <>
        <Admin />
      </>
  },
  {
    path: "/category",
    element: 
      <>
        <Category />
      </>
  },
  {
    path: "/subcategory",
    element: 
      <>
        <SubCategory />
      </>
  },
  {
    path: "/product",
    element: 
      <>
        <Product />
      </>
  },
  {
    path: "/product/:id",
    element: <ProductDescription />
  },
  {
    path: "/cart",
    element: <Cart />
  },
  {
    path: "/orders",
    element: <Order />
  },
  {
    path: "/register",
    element:<Register />
  },
  {
    path: "/login",
    element:<Login />
  },
  {
    path: "/signup",
    element: <Sign />
  },
  {
    path: "*",
    element: "Nigaa where the fuck you think you goin"
  }
  
])

const App = () => {
  const [tab, setTab] = useState("category")
  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App;