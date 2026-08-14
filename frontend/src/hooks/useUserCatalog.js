import api from "../api/api"
import { useState, useEffect, useCallback } from "react"

export default function useUserCatalog() {
  const [orders, setOrders ] = useState([])
  const [users, setUsers ] = useState([])

  const fetchOrders = useCallback(async () => {
    try {
      const response = await api.get("/order");
      setOrders(response?.data.orders)
    } catch (err) {
      console.log(err.response.data)
    }
  }, []);


  const getUsers = useCallback(async() => {
    try {
      const response = await api.get("/users");
      setUsers(response.data.users);
    } catch (err) {
      console.log(err.response.data)
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