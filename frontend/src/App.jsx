import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom"
import { useState } from "react"
import Admin from "./components/Admin"
import AdminCategory from "./components/AdminCategory"
import AdminSubCategory from "./components/AdminSubCategory"
import AdminProduct from "./components/AdminProduct"
import UserReview from "./components/UserReview"
import AdminSideBar from "./components/AdminSideBar"
import Login from "./components/Login"
import Register from "./components/Register"

const router = createBrowserRouter([
  {
    path: "/",
    element:
      <>
      </>
  },
  {
    path: "/admin",
    element:
    <>
        <AdminSideBar />  
        <Admin />
      </>,
    children: [
      {
        path: "category",
        element: 
          <>
            <AdminCategory />
          </>
      },
      {
        path: "subcategory",
        element: 
          <>
            <AdminSubCategory />
          </>
      },
      {
        path: "product",
        element: 
          <>
            <AdminProduct />
          </>
      }
    ]
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