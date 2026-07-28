import api from "../api/api"
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const AdminSubCategory = () => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("")
  const [subCategoryId, setSubCategoryId] = useState("")
  const [inputBox, showInputBox] = useState(false)
  const [updateBox, showUpdateBox] = useState(false)
  const [newName, setNewName] = useState("")

  const { register, handleSubmit, formState: {isSubmitting}} = useForm();

  const getCategories = async() => {
    try {
      const response = await api.get("/categories")
      setCategories(response.data.categories)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const getSubCategories = async() => {
    try {
      const response = await api.get("/subcategories")
      setSubCategories(response.data.subCategories)
      console.log(response.data.subCategories)
    }
    catch (err) {
      console.log(err.response.data)
    }
  }

  useEffect(() => {
    getCategories();
    getSubCategories();
  }, [])

  const handleAddSubCategory = async (data) => {
    try {
      const response = await api.post("/subcategories", {
        name: data.name,
        categoryId: categoryId
      })
      console.log(response.data)
      getCategories();
      getSubCategories();
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
      getCategories();
      getSubCategories();
      setNewName("")  
      showUpdateBox(false)
    } 
    catch (err) {
      console.log(err.response.data)
    }
  }

  const handleDeleteSubCategory = async(id) => {
    try {
      const response = await api.delete(`/subcategories/${id}`)
      console.log(response.data)
      getCategories();
      getSubCategories();    
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
    showUpdateBox(true);
  }

  return (
    <>
      <div className=" w-fit">
        {categories.map((category) => (
          <div key={category._id} className="flex flex-row  gap-4 ">
            <button onClick={() => handleInputBox(category._id)} className="flex border p-1 rounded m-2">{category.name}</button>
          </div>
        ))}
      </div>

      <div>
        {subCategories.map((subCategory) => (
          <div key={subCategory._id} className="flex w-80 m-2 rounded-lg p-2 border items-center justify-between">
            <p>{subCategory.name}</p>
            <div className="flex gap-4">
              <button className="border p-1 rounded" onClick={() => handleUpdateBox(subCategory._id)}>Update</button>
              <button className="border p-1 rounded" onClick={() => handleDeleteSubCategory(subCategory._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <div>
        {updateBox === true && 
          <div className="flex flex-col border rounded-lg w-fit m-2 gap-4 p-4">
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Enter new name" className="border w-fit p-1 rounded"/>
            <button onClick={() => handlePutSubCategory(subCategoryId, newName)}>Done</button>
          </div>}
      </div>


      {inputBox === true && 
      <form onSubmit={handleSubmit(handleAddSubCategory)} className="border w-fit flex flex-col gap-4 p-4 rounded-lg">
        <input type="text" {...register("name")} placeholder="Add new Sub category" className="border p-1 rounded"/>

        <input type="submit" value={isSubmitting ? "Adding Sub Category" : "Add Sub Category"} disabled={isSubmitting} className="border w-fit p-1 rounded"/>
      </form>}
    </>
  )
}

export default AdminSubCategory;