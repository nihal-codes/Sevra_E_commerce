import api from "../api/api";
import { useState,useEffect } from "react";
import useCategoryStore from "../store/CategoryStore";
import { useSearchParams } from "react-router-dom"

const FilteredProducts = () => {
  const [categories, setCategories ] = useState([])
  const [products, setProducts     ] = useState([])
  
  const [searchParams] = useSearchParams()
  const categoryID = searchParams.get("category")
  const subCategoryID = searchParams.get("subcategory")

  const getCategories = async() => {
    try {
      const response = await api.get("/categories")
      if (response.data.categories.length === 0) {
        console.log("No category found")
      }
      setCategories(response.data.categories)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const getProducts = async() => {
    try {
      const response = await api.get("/products")
      setProducts(response.data.products)
    }
    catch (err) {
      setRole(err.response.data.role)
    }
  }
  
  useEffect(() => {
    getCategories();
    getProducts();
  }, [])

  const filteredProducts = products.filter(
    product => (product.categoryId === categoryID || product.subCategoryId === subCategoryID)
  )


  return (
    <>
      <div>
        
        <div>
          {filteredProducts.map(filteredProduct => (
            <div key={filteredProduct._id} className="flex gap-4 border p-2 rounded-lg w-fit">
              <p>{filteredProduct.name}</p>
              <p>{filteredProduct.brand}</p>
              <p>{filteredProduct.price}</p>
              <p>{filteredProduct.discount}</p>
            </div>
          ))}
          
        </div>
        
      </div>
    </>
  )
}

export default FilteredProducts;