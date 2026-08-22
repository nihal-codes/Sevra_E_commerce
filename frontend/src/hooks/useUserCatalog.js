import api from "../api/api"
import { useState, useEffect, useCallback } from "react"
import toast from "react-hot-toast"
import { getErrorMessage } from "../utils/errorMessage"

export default function useUserCatalog() {
  const [orders, setOrders ] = useState([])
  const [users, setUsers ] = useState([])

  const fetchOrders = useCallback(async () => {
    try {
      const response = await api.get("/order");
      setOrders(response?.data.orders)
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to load orders"))
    }
  }, []);


  const getUsers = useCallback(async() => {
    try {
      const response = await api.get("/users");
      setUsers(response.data.users);
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to load users"))
    }
  }, []);

  useEffect(() => {
    fetchOrders();
    getUsers();
  },[])
  
  return (
    { orders, users }
  )
}