import api from "../api/api"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useProductCatalog from "../hooks/useProductCatalog"

const Category = () => {
  const navigate = useNavigate();
  const { categories } = useProductCatalog();
  const [newCategory, setNewCategory ] = useState("")
  const [id, setId                   ] = useState("")
  const [selectedCategory, setSelectedCategory ] = useState("")  

  return (
    <>
      <div className="flex justify-between">

        <div className="flex flex-col gap-4">
            <div className="flex gap-2 items-center">
              <div className="bg-(--truffle) w-1 h-5 rounded"></div>
              <h1 className="text-(--ablue) text-lg  font-bold">Shop by Category</h1> 
            </div>
          <div className="flex gap-4">
            <button 
            className={selectedCategory === "home" 
            ? "mb-2 rounded-lg p-3 text-white bg-(--fblue) w-48 font-semibold py-4 shrink-0" 
            : "mb-2 border border-(--oatmeal) shadow rounded-lg p-3 py-4 h-fit text-(--ablue) font-semibold w-48 shrink-0"} 
            onClick={() => {
              navigate("/");
              setSelectedCategory("home")
            }}>Home</button>
            <div className="flex overflow-x-auto scrollbar-none gap-4 ">
              {categories.map((category) => (
                <div key={category._id} 
                className={selectedCategory === category.name 
                  ? "mb-2 rounded-lg p-3 text-white bg-(--fblue) w-48 flex items-center justify-center cursor-pointer font-semibold shrink-0"  
                  : "flex w-48 gap-10 items-center justify-center mb-2 border border-(--oatmeal) shadow rounded-lg p-3 py-4 cursor-pointer font-semibold transition-all duration-200 hover:bg-(--oatmeal) shrink-0"}
                onClick={() => {
                  navigate(`/?category=${category._id}`);
                  setSelectedCategory(category.name);
                }}>
                  <p className="">{category.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Category;