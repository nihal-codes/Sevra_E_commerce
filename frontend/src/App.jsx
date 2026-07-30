import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom"
import { useState } from "react"
import Admin from "./pages/Admin"
import Category from "./components/Category"
import SubCategory from "./components/SubCategory"
import Product from "./components/Product"
import UserReview from "./components/UserReview"
import SideBar from "./components/SideBar"
import Login from "./components/Login"
import Register from "./components/Register"
import Home from "./pages/Home"

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
    path: "category",
    element: 
      <>
        <SideBar />
        <Category />
      </>
  },
  {
    path: "subcategory",
    element: 
      <>
        <SideBar />
        <SubCategory />
      </>
  },
  {
    path: "product",
    element: 
      <>
        <SideBar />
        <Product />
      </>
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
      <RouterProvider router={router} />
    </>
  )
}

export default App;