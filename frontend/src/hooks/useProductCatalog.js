import { useState, useEffect, useCallback } from "react"
import api from "../api/api"
import toast from "react-hot-toast"
import { getErrorMessage } from "../utils/errorMessage"

export default function useProductCatalog() {
  const [categories, setCategories       ] = useState([]);
  const [subCategories, setSubCategories ] = useState([]);
  const [products, setProducts           ] = useState([]);

  const getCategories = useCallback(async() => {
    try {
      const response = await api.get("/categories")
      setCategories(response?.data.categories)
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to load categories"))
    }
  }, []);

  const getSubCategories = useCallback(async() => {
    try {
      const response = await api.get("/subcategories")
      setSubCategories(response?.data.subCategories)
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to load subcategories"))
    }
  }, []);

  const getProducts = useCallback(async() => {
    try {
      const response = await api.get("/products")
      setProducts(response?.data.products)
    }
    catch (err) {
      toast.error(getErrorMessage(err, "Unable to load products"))
    }
  }, []);

  const refetchEverything = useCallback(() => {
    getProducts();
    getSubCategories();
    getCategories();
  }, [getCategories, getSubCategories, getProducts]);

  const refetch_c_sc = useCallback(() => {
    getSubCategories();
    getCategories();
  }, [getCategories, getSubCategories]);

  const refetchCategories = useCallback(() => {
    getCategories();
  }, [getCategories]);
  
  useEffect(() => {
    getCategories();
    getSubCategories();
    getProducts();
  }, []);

  return { categories, subCategories, products, refetchEverything, refetch_c_sc, refetchCategories };
}