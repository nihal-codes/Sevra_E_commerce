import { useState, useEffect, useCallback } from "react"
import api from "../api/api"

export default function useProductCatalog() {
  const [categories, setCategories       ] = useState([]);
  const [subCategories, setSubCategories ] = useState([]);
  const [products, setProducts           ] = useState([]);

  const getCategories = useCallback(async() => {
    try {
      const response = await api.get("/categories")
      setCategories(response.data.categories)
    } catch (err) {
      console.log(err.response?.data)
    }
  }, []);

  const getSubCategories = useCallback(async() => {
    try {
      const response = await api.get("/subcategories")
      setSubCategories(response.data.subCategories)
    } catch (err) {
      console.log(err.response?.data)
    }
  }, []);

  const getProducts = useCallback(async() => {
    try {
      const response = await api.get("/products")
      setProducts(response.data.products)
    }
    catch (err) {
      console.log(err.response?.data)
    }
  }, []);

  const refetch = useCallback(() => {
    getProducts();
    getSubCategories();
  }, [getSubCategories, getProducts]);
  
  useEffect(() => {
    getCategories();
    getSubCategories();
    getProducts();
  }, []);

  return { categories, subCategories, products, refetch };
}