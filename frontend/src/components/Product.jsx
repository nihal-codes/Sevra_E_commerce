import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/api"
import DialogBox from "./DialogBox"
import ProductCard from "./ProductCard";
import useProductCatalog from "../hooks/useProductCatalog";

const Product = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();          
  const subCategoryFilter = searchParams.get("subcategory");
  const categoryFilter = searchParams.get("category");
  const {categories, subCategories, products, refetch } = useProductCatalog();
  const [categoryId, setCategoryId       ] = useState("");
  const [subCategoryId, setSubCategoryId ] = useState("");
  const inputStyling = "border border-(--oatmeal) p-2 rounded-lg shadow outline-none";
  
  useEffect(() => {
    if (!subCategoryId) return;

    const subCategory = subCategories.find(
      sub => sub._id === subCategoryId
    )
    if (subCategory) {
      setCategoryId(subCategory.categoryId)
    }
  }, [subCategoryId, subCategories]);

  const handleAddToCart = async (id) => {
    try {
      const response = await api.post("/cart", {
        productId: id,
        orderStatus: false
      })
      console.log(response?.data)
      if (response.status === 200) {
        toast.error("Already added in cart")        
      }
      if (response.status === 201) {
        toast.success("Added to cart successfully")
      }
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  return (
    <>
    <div className="flex justify-between">

      <div className="mx-16 flex flex-col items-start overflow-auto">
        {categories
          .filter(category => !categoryFilter || category._id === categoryFilter) // ← added
        .map(category => 
          (subCategories.some(sub => sub.categoryId === category._id
            && products.some(product => product.subCategoryId === sub._id)
            )
          )
          &&
          (<div key={category._id}>
            
            {subCategories
            .filter(sub => sub.categoryId === category._id)
            .filter(sub => !subCategoryFilter || sub._id === subCategoryFilter) // ← added
            .map((subCategory) => 
              
              (products.some(
                product => product.subCategoryId === subCategory._id)
              )
              &&
              (<div key={subCategory._id}>
                <div className="flex gap-2 items-center  mb-4">
                  <h2 className="font-bold text-lg ">
                    {category.name}
                  </h2>
                  <i className="ri-arrow-right-s-line translate-y-px text-lg font-bold"></i>
                  <h2 className="font-bold text-lg ">
                    {subCategory.name}
                  </h2>
                </div>

                <div className="flex gap-2 overflow-x-auto scrollbar-none mb-2 -ml-3 ">
                  {products
                  .filter(product => product.subCategoryId === subCategory._id)
                  .map(product => (
                    <div key={product._id} className="pb-6 px-3 shrink-0 ">
                      <ProductCard 
                        image    = {product.image }
                        name     = {product.name  }
                        brand    = {product.brand }
                        price    = {product.price }
                        rating   = {product.rating}
                        onClick  = {() => navigate(`/product/${product._id}`)}
                        children = {
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddToCart(product._id);
                            }}
                            className="rounded-lg py-2 px-10 bg-(--ablue) text-white text-sm font-semibold transition-all duration-150 hover:bg-(--fblue) ">
                            <i className="ri-shopping-cart-2-line"></i> Add to Cart
                          </button>
                        }   
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default Product;