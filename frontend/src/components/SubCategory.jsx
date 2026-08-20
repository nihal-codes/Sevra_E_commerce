import { useState, useEffect, use } from "react";
import { useNavigate } from "react-router-dom";
import useProductCatalog from "../hooks/useProductCatalog";

const SubCategory = ({filter, setFilter}) => {
  
  const navigate = useNavigate()
  const {subCategories} = useProductCatalog();

  return (
    <>
    <div className="flex justify-between ">
     
        <div className="flex flex-col overflow-x-auto ml-16 gap-4 ">
          <div className="flex gap-2 items-center">
            <div className="bg-(--truffle) w-1 h-5 rounded"></div>
            <h1 className="text-(--ablue) text-lg  font-bold">Shop by Subcategory</h1> 
          </div>

          <div className="flex overflow-x-scroll scrollbar-none gap-4">
            {subCategories.map((subCategory) => (
              <div key={subCategory._id} 
              className={filter === subCategory.name 
              ? "mb-2  rounded-lg p-3 font-semibold text-white bg-(--fblue) w-48 flex items-center justify-center cursor-pointer shrink-0 "  
              : "flex w-48 gap-10 font-semibold items-center justify-center mb-2 border border-(--oatmeal) shadow rounded-lg p-3 py-4 cursor-pointer shrink-0 transition-all duration-200 hover:bg-(--oatmeal)"}

              onClick={() => {
                navigate(`/?subcategory=${subCategory._id}`);
                setFilter(subCategory.name)
              }}>
                <p className="">{subCategory.name}</p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </>
  )
}

export default SubCategory;