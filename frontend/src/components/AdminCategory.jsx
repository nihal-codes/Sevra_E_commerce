import api from "../api/api"
import { useForm } from "react-hook-form"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import DialogBox from "./DialogBox"
import useCategoryCatalog from "../hooks/useCategoryCatalog"

const AdminCategory = () => {
  const navigate = useNavigate();
  const { categories } = useCategoryCatalog();
  const [serialNum, setSerialNum     ] = useState(1)
  const [newCategory, setNewCategory ] = useState("")
  const [inputBox, showInputBox      ] = useState(false)  
  const [updateBox, showUpdateBox    ] = useState(false)
  const [id, setId                   ] = useState("")
  const [selectedCategory, setSelectedCategory ] = useState("")

  const { register, handleSubmit, formState: { isSubmitting }} = useForm();

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

        <div className="flex flex-col gap-4">

          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-(--ablue)">Categories</h1>
                <h4 className="text-xs font-light ">Manage all Categories in your store</h4>
              </div>
              <button onClick={() => handleInputBox()} className=" rounded-lg py-2 px-2 bg-(--ablue) text-white text-sm w-fit font-semibold transition-all duration-150 hover:bg-(--fblue) h-fit">
                <i className="ri-add-line mr-2"></i>Add Category
              </button>
            </div>

            <div className=" ">
              
              {categories.map((category) => (
                <div key={category._id} className="grid grid-cols-[1fr_3fr_3fr] gap-2 items-center px-3 py-2 border-b border-x border-(--oatmeal) hover:bg-(--oatmeal)/20 transition-colors duration-300 ease-in-out">
                  <div>
                    <h2>{serialNum}</h2>
                  </div>
                  <div>
                    {category.name}
                  </div>
                
                  <div className="flex gap-1">
                    <button onClick={() => {handleDeleteCategory(category._id)}} className="rounded-lg h-fit w-10 py-2 px-2 text-black transition-all duration-150 hover:bg-(--oatmeal) border border-(--oatmeal)"><i className="ri-pencil-line"></i></button>
                    <button onClick={() => handleUpdateBox(category._id)} className="rounded-lg h-fit w-10 py-2 px-2 text-red-700 transition-all duration-150 hover:bg-(--oatmeal) border border-(--oatmeal)"><i className="ri-delete-bin-line"></i></button>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
        
        {updateBox === true && 
          <DialogBox>
            <input type="text" placeholder="Update category name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} className="border p-1 rounded "/>
            <div className="flex gap-4">
              <button onClick={() => {handleUpdateCategory(id, newCategory)}}
                className="border p-1 rounded">Done</button>
              <button onClick={() => showUpdateBox(false)} className="border p-1 rounded">Cancel</button>
            </div>
          </DialogBox>
        }
          
        
        {inputBox && 
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

export default AdminCategory;