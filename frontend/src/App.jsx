import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useEffect } from "react"
import api from "./api/api"
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import Admin from "./pages/Admin"
import Sevra from "./pages/Sevra"
import Orders from "./pages/Orders"
import 'remixicon/fonts/remixicon.css'
import Register from "./pages/Register"
import { Toaster } from "react-hot-toast"
import useAuthStore from "./store/AuthStore"
import VerifyEmail from "./pages/VerifyEmail"
import ProtectedRoute from "./components/ProtectedRoute"
import ProductDescription from "./pages/ProductDescription"

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
    path: "/verify-email/:token",
    element: <VerifyEmail />
  },
  {
    path: "*",
    element: "Nigaa where the fuck you think you goin"
  }
  
])

const App = () => {
  const login = useAuthStore((state) => state.login);
  const setLoading = useAuthStore((state) => state.setLoading);

  useEffect(() => {
    const checkAuth = async () => {
        try {
          const response = await api.get("/me");
          login(response.data.role);
      } catch (err) {
          setLoading(false);
      }
    };
    checkAuth();
  }, [login, setLoading]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  )
}

export default App;