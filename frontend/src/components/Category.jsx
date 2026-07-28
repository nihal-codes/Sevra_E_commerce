import api from "../api/api"
import { useEffect } from "react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"

const AdminCategory = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([])
  const [newCategory, setNewCategory] = useState("")
  const [inputBox, showInputBox] = useState(false)
  const [id, setId] = useState("")
  const [role, setRole] = useState("")
  const { register, handleSubmit, formState: { isSubmitting }} = useForm();
  
  const getCategories = async() => {
    try {
      const response = await api.get("/categories")
      setCategories(response.data.categories)
      setRole(response.data.role)
    } catch (err) {
      console.log(err.response?.data)
    }
  }

  useEffect(() => {
    getCategories();
  }, [])

  const handleAddCategory = async(data) => {
    try {
      const response = await api.post("/categories", data)
      await getCategories();
      console.log(response)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleDeleteCategory = async(id) => {
    try {
      const response = await api.delete(`/categories/${id}`)
      await getCategories();
      console.log(response.data)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleUpdateCategory = async(id, newName) => {
    try {
      const response = await api.put(`/categories/${id}`,{
        name: newName
      })
      await getCategories();
      showInputBox(false)
      console.log(response.data)
      
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleInputBox = (id) => {
    showInputBox(true);
    setId(id);
  }

  return (
    <>
      {categories.map((category) => (
        <div key={category._id} className="flex gap-2 w-80 items-center justify-between mb-2 border rounded p-2 ">
          <p className="">{category.name}</p>
          {role === "admin" && 
            <div className="flex gap-1">
              <button onClick={() => {handleDeleteCategory(category._id)}} className="border p-1 rounded">Delete</button>
              <button onClick={() => handleInputBox(category._id)} className="border  p-1 rounded">Update</button>
            </div>}
        </div>
      ))}
      
      {inputBox === true && role === "admin" && 
        <div className="flex flex-col w-fit">
          <input type="text" placeholder="Update category name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="border p-1 rounded "/>
          <button onClick={() => {handleUpdateCategory(id, newCategory)}}>Done</button>
        </div>}
        
      
      {role === "admin" &&
        <form onSubmit={handleSubmit(handleAddCategory)} className="border w-fit flex flex-col gap-4 p-4 rounded-lg">
        <input type="text" {...register("name")} placeholder="Add new category" className="border p-1 rounded"/>

        <input type="submit" value={isSubmitting ? "Adding Category" : "Add Category"} disabled={isSubmitting} className="border w-fit p-1 rounded"/>
      </form>}
    </>
  )
}

export default AdminCategory;