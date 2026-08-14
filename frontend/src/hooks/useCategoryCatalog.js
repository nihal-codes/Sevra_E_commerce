import api from "../api/api";
import { useState, useEffect, useCallback } from "react";

export default function useCategoryCatalog() {
  const [categories, setCategories]  = useState([])  
  
  const getCategories = useCallback(async() => {
    try {
      const response = await api.get("/categories")
      if (response.data.categories.length === 0) {
        console.log("No category found")
      }
      setCategories(response?.data.categories)
    } catch (err) {
      console.log(err.response?.data)
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, []);
  
  return (
    { categories }
  )
}