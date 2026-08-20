import api from "../api/api"
import { useState } from "react";
import { useForm } from "react-hook-form"
import DialogBox from "./DialogBox"
import useProductCatalog from "../hooks/useProductCatalog";
import SearchBar from "./SearchBar";

const AdminSubcategory = () => {
  const {categories, subCategories, refetch_c_sc} = useProductCatalog();
  const [serialNum, setSerialNum     ] = useState(1)
  const [categoryId, setCategoryId       ] = useState("")
  const [subCategoryId, setSubCategoryId ] = useState("")
  const [inputBox, showInputBox          ] = useState(false)
  const [updateBox, showUpdateBox        ] = useState(false)
  const [newName, setNewName             ] = useState("")

  const { register, handleSubmit, formState: {isSubmitting}} = useForm();

  const handleAddSubCategory = async (data) => {
    try {
      const response = await api.post("/subcategories", {
        name: data.name,
        categoryId: categoryId
      })
      console.log(response.data)
      refetch_c_sc();
      showInputBox(false)
    } 
    catch (err) {
      console.log(err.response.data)
    }
  }

  const handlePutSubCategory = async (id, newName) => {
    try {
      const response = await api.put(`/subcategories/${id}`, {
        name: newName,

      })
      console.log(response.data)
      setNewName("")  
      showUpdateBox(false)
      refetch_c_sc();

    } 
    catch (err) {
      console.log(err.response.data)
    }
  }

  const handleDeleteSubCategory = async(id) => {
    try {
      const response = await api.delete(`/subcategories/${id}`)
      console.log(response.data)
      refetch_c_sc();
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleInputBox = (id) => {
    setCategoryId(id)
    showInputBox(true)
  }

  const handleUpdateBox = (id) => {
    setSubCategoryId(id);
    showUpdateBox(!updateBox);
  }

  return (
    <>
    <div className="flex justify-between ">
      {(updateBox || inputBox) && 
        <div className="absolute inset-0 bg-black/50 " onClick={() => {showInputBox(false); showUpdateBox(false)}}></div>
      }      
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center ">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-(--ablue)">Subcategories</h1>
                <h4 className="text-xs font-light ">Manage all Subcategories in your store</h4>
              </div>
              <button onClick={() => handleInputBox()} className=" rounded-lg py-2 px-2 bg-(--ablue) text-white text-sm w-fit font-semibold transition-all duration-150 hover:bg-(--fblue) h-fit">
                <i className="ri-add-line mr-2"></i>Add Subcategory
              </button>
            </div>

          <SearchBar item={"Subcategory"} />

          <div>
            <div className="grid grid-cols-[3fr_9fr_9fr_6fr] gap-45 px-3 py-4 rounded-t-lg text-sm font-semibold bg-(--oatmeal) text-(--ablue) ">
                <div>#</div>
                <div>Category</div>
                <div>Subcategory</div>
                <div>Actions</div>
              </div>

            <div className="">
              {categories.map((category) => (
                subCategories.some((subcategory) => subcategory.categoryId === category._id 
              ))
              && 
              (
                <div key={category._id}>
                  {subCategories
                  .filter((subcategory) => subcategory.categoryId === category._id)
                  .map((subcategory) => (
                    <div key={subcategory._id} className="grid grid-cols-[3fr_9fr_9fr_6fr] gap-45 items-center px-3 py-2 border-b border-x border-(--oatmeal) hover:bg-(--oatmeal)/20 transition-colors duration-300 ease-in-out text-sm">
                      <div>
                        <h2>{serialNum}</h2>
                      </div>
                      <div>
                        <h2 className="font-semibold">{category.name}</h2>
                      </div>
                      <div>
                        <h2 className="font-semibold">{subcategory.name}</h2>
                      </div>
                    
                      <div className="flex gap-2">
                        <button className="rounded-lg h-fit w-10 py-2 px-2 text-black transition-all duration-150 hover:bg-(--oatmeal) border border-(--oatmeal)" onClick={() => handleUpdateBox(subcategory._id)}><i className="ri-pencil-line"></i></button>
                        <button className="rounded-lg h-fit w-10 py-2 px-2 text-red-700 transition-all duration-150 hover:bg-(--oatmeal) border border-(--oatmeal)" onClick={() => handleDeleteSubCategory(subcategory._id)}><i className="ri-delete-bin-line"></i></button>
                      </div>

                  </div>
                  ))}
                </div>
              )
            )}
            </div>
          </div>

        </div>
        
      {updateBox === true &&  
        <DialogBox>
          <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter new name" className="border w-fit p-1 rounded"/>
          <div className="flex gap-4">
            <button onClick={() => handlePutSubCategory(subCategoryId, newName)}>Done</button>
            <button onClick={() => showUpdateBox(false)}>Cancel</button>
          </div>
        </DialogBox>
      }


      {inputBox === true && 
      <DialogBox>
        <div>
          <select value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className=" border p-1 rounded"> 
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <form onSubmit={handleSubmit(handleAddSubCategory)} className="border w-fit flex flex-col gap-4 p-4 rounded-lg">
          <input type="text" {...register("name")} placeholder="Add new Sub category" className="border p-1 rounded"/>
          <input type="submit" value={isSubmitting ? "Adding Sub Category" : "Add Sub Category"} disabled={isSubmitting} className="border w-fit p-1 rounded"/>
          <button onClick={() => showInputBox(false)}>Cancel</button>
        </form>
      </DialogBox>
      }
      </div>
    </>
  )
}

export default AdminSubcategory;