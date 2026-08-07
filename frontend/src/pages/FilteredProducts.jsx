import api from "../api/api";
import useCategoryStore from "../store/CategoryStore";
import Category from "../components/Category";
import SubCategory from "../components/SubCategory";
import ProductCard from "../components/ProductCard";
import UserHeader from "./UserHeader";
import { useSearchParams } from "react-router-dom"
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const FilteredProducts = () => {
  const [categories, setCategories ] = useState([])
  const [products, setProducts     ] = useState([])

  const navigate = useNavigate();
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
      <div className="min-h-screen bg-(--bg) flex flex-col gap-4">
        <UserHeader />
        <div className=" flex items-center pr-8 justify-between">
          <Category />
          <button className="mb-2 border border-(--oatmeal) shadow rounded-lg p-2 h-fit" onClick={() => navigate("/")}>Home</button>
        </div>
        <SubCategory />
        
        <div className="flex gap-4 overflow-x-auto mb-6 ">
          {filteredProducts.map(filteredProduct => (
            <div key={filteredProduct._id} className="border rounded p-4">
              <ProductCard 
                image={filteredProduct.image}
                name={filteredProduct.name}
                brand={filteredProduct.brand}
                price={filteredProduct.price}
                onClick={() => navigate(`/product/${product._id}`)}
              />
            </div>
          ))}
          
        </div>
        
      </div>
    </>
  )
}

export default FilteredProducts;