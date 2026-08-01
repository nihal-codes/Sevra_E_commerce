import api from "../api/api"
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form"
import DialogBox from "./DialogBox"
import { useNavigate } from "react-router-dom";

const SubCategory = () => {
  const [categories, setCategories       ] = useState([]);
  const [subCategories, setSubCategories ] = useState([]);
  const [categoryId, setCategoryId       ] = useState("")
  const [subCategoryId, setSubCategoryId ] = useState("")
  const [inputBox, showInputBox          ] = useState(false)
  const [updateBox, showUpdateBox        ] = useState(false)
  const [newName, setNewName             ] = useState("")
  const [role, setRole                   ] = useState("")

  const navigate = useNavigate()

  const { register, handleSubmit, formState: {isSubmitting}} = useForm();

  const getCategories = async() => {
    try {
      const response = await api.get("/categories")
      setCategories(response.data.categories)
      setRole(response.data.role)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const getSubCategories = async() => {
    try {
      const response = await api.get("/subcategories")
      setSubCategories(response.data.subCategories)
    }
    catch (err) {
      console.log(err.response.data)
      setRole(err.response.data.role)
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
    showUpdateBox(!updateBox);
  }

  return (
    <>
    <div className="flex justify-between overflow-x-auto scrollbar-none">
        {(updateBox || inputBox) && 
          <div className="absolute inset-0 bg-black/50"></div>
        }      
      <div className="flex items-center justify-center">
        {subCategories.map((subCategory) => (
          <div key={subCategory._id} className="flex items-center justify-center w-30 h-30 lg:w-fit lg:gap-10 m-2 rounded-lg p-2 border"
          onClick={() => navigate(`/products?subcategory=${subCategory._id}`)}>
            <p>{subCategory.name}</p>
            {role === "admin" && 
            <div className="flex gap-2">
              <button className="border p-1 rounded" onClick={() => handleUpdateBox(subCategory._id)}>Update</button>
              <button className="border p-1 rounded" onClick={() => handleDeleteSubCategory(subCategory._id)}>Delete</button>
            </div>
            }
          </div>
        ))}
      </div>

      {role === "admin" && 
        <button className="border rounded p-1" onClick={() => showInputBox(!inputBox)}>
        Add SubCategory
      </button>}

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

export default SubCategory;