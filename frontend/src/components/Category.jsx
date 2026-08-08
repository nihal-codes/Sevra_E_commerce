import api from "../api/api"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import DialogBox from "./DialogBox"
import useCategoryStore from "../store/CategoryStore"
import Product from "./Product"

const Category = ({clearFilter}) => {
  const navigate = useNavigate();
  const [categories, setCategories   ] = useState([])
  const [newCategory, setNewCategory ] = useState("")
  const [inputBox, showInputBox      ] = useState(false)  
  const [updateBox, showUpdateBox    ] = useState(false)
  const [id, setId                   ] = useState("")
  const [role, setRole               ] = useState("")
  const [selectedCategory, setSelectedCategory ] = useState("")

  const { register, handleSubmit, formState: { isSubmitting }} = useForm();
  
  const getCategories = async() => {
    try {
      const response = await api.get("/categories")
      if (response.data.categories.length === 0) {
        console.log("No category found")
      }
      setCategories(response.data.categories)
      setRole(response.data.role)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  useEffect(() => {
    getCategories();
  }, [])

  const handleAddCategory = async(data) => {
    try {
      const response = await api.post("/categories", data)
      await getCategories();
      showInputBox(false)
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
      showUpdateBox(false)
      console.log(response.data)
      
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const handleUpdateBox = (id) => {
    showUpdateBox(!updateBox);
    setId(id);
  }

  const handleInputBox = () => {
    showInputBox(!inputBox)
  }

  return (
    <>
      <div className="flex justify-between">

        {(updateBox || inputBox) && 
        <div className="absolute inset-0 bg-black/50" onClick={() => showInputBox(false)}></div>
        }
        <div className="flex flex-col mx-16 gap-4">
          {role === "user" && 
            <div className="flex gap-2 items-center">
              <div className="bg-(--truffle) w-1 h-5 rounded"></div>
              <h1 className="text-(--ablue) text-lg  font-bold">Shop by Category</h1> 
            </div>}
          <div className="flex gap-4">
            <button 
            className={selectedCategory === "home" 
            ? "mb-2 rounded-lg p-3 text-white bg-(--fblue) w-48 font-semibold py-4" 
            : "mb-2 border border-(--oatmeal) shadow rounded-lg p-3 py-4 h-fit text-(--ablue) font-semibold w-48"} 
            onClick={() => {
              navigate("/");
              setSelectedCategory("home")
            }}>Home</button>
            <div className="flex overflow-x-auto scrollbar-none gap-4 ">
              {categories.map((category) => (
                <div key={category._id} 
                className={selectedCategory === category.name 
                  ? "mb-2 rounded-lg p-3 text-white bg-(--fblue) w-48 flex items-center justify-center cursor-pointer font-semibold"  
                  : "flex w-48 gap-10 items-center justify-center mb-2 border border-(--oatmeal) shadow rounded-lg p-3 py-4 cursor-pointer font-semibold transition-all duration-200 hover:bg-(--oatmeal) "}
                onClick={() => {
                  navigate(`/?category=${category._id}`);
                  setSelectedCategory(category.name);
                }}>
                  <p className="">{category.name}</p>
                  {role === "admin" && 
                    <div className="flex gap-1">
                      <button onClick={() => {handleDeleteCategory(category._id)}} className="border p-1 rounded">Delete</button>
                      <button onClick={() => handleUpdateBox(category._id)} className="border  p-1 rounded">Update</button>
                    </div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {role === "admin" && 
        <button className="border rounded p-1" onClick={handleInputBox}>
          Add Category
        </button>}
        
        {updateBox === true && role === "admin" && 
          <DialogBox>
            <input type="text" placeholder="Update category name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="border p-1 rounded "/>
            <div className="flex gap-4">
              <button onClick={() => {handleUpdateCategory(id, newCategory)}}
                className="border p-1 rounded">Done</button>
              <button onClick={() => showUpdateBox(false)} className="border p-1 rounded">Cancel</button>
            </div>
          </DialogBox>
        }
          
        
        {role === "admin" && inputBox && 
          <DialogBox>
            <form onSubmit={handleSubmit(handleAddCategory)} className=" w-fit flex flex-col gap-4 p-2 rounded-lg">
            <input type="text" {...register("name")} placeholder="Add new category" className="border p-1 rounded"/>

            <div className="flex gap-4">
              <input type="submit" value={isSubmitting ? "Adding Category" : "Add   Category"} disabled={isSubmitting} className="border w-fit p-1 rounded"/>
              <button className="border p-1 rounded" onClick={() => showInputBox(false)}>
                Cancel
              </button>
            </div>
          </form>
          </DialogBox>
          }
      </div>
    </>
  )
}

export default Category;