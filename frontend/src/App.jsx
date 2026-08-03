import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom"
import { useState } from "react"
import Admin from "./pages/Admin"
import Category from "./components/Category"
import SubCategory from "./components/SubCategory"
import Product from "./components/Product"
import Reviews from "./pages/Reviews"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import FilteredProducts from "./pages/FilteredProducts"
import ProductDescription from "./pages/ProductDescription"
import { Toaster } from "react-hot-toast"

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
    path: "/products",
    element: <FilteredProducts />
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