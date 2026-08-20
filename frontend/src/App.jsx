import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import { useState } from "react"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import Sevra from "./pages/Sevra"
import Sign from "./pages/SignPage"
import Orders from "./pages/Orders"
import Reviews from "./pages/Reviews"
import 'remixicon/fonts/remixicon.css'
import Register from "./pages/Register"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/ProtectedRoute"
import ProductDescription from "./pages/ProductDescription"
import VerifyEmail from "./pages/VerifyEmail"

const router = createBrowserRouter([
  {path: "/sevra", element: <Sevra />},
  {path: "/", element:<Home />},
  {path: "/product/:id", element: <ProductDescription />},
  
  {
    path: "/admin",
    element: (
      <ProtectedRoute allowedRoles={["admin"]}>
        <Admin />
      </ProtectedRoute>
    )
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute allowedRoles={["user", "admin"]}>
        <Cart />
      </ProtectedRoute>
    )
  },
  {
    path: "/orders",
    element: (
      <ProtectedRoute allowedRoles={["user"]}>
        <Orders />
      </ProtectedRoute>
    )
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
    path: "/verify-email/:token",
    element: <VerifyEmail />
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