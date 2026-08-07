import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import api from "../api/api"
import DialogBox from "./DialogBox"
import useCategoryStore from "../store/CategoryStore";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";


const Product = () => {
  const [categories, setCategories       ] = useState([]);
  const [subCategories, setSubCategories ] = useState([]);
  const [products, setProducts           ] = useState([]);
  const [categoryId, setCategoryId       ] = useState("");
  const [subCategoryId, setSubCategoryId ] = useState("");
  const [productId, setProductId         ] = useState("");
  const [newName, setNewName             ] = useState("");
  const [newPrice, setNewPrice           ] = useState("");
  const [role, setRole                   ] = useState("");
  const [image, setImage                 ] = useState(null);
  const [inputBox, showInputBox          ] = useState(false);
  const [updateBox, showUpdateBox        ] = useState(false);

  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

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
  
  const getSubCategories = async() => {
    try {
      const response = await api.get("/subcategories")
      setSubCategories(response.data.subCategories)
      setRole(response.data.role)
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
    getSubCategories();
    getProducts();
  }, [])
  
  const postProducts = async(data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name)
      formData.append("brand", data.brand)
      formData.append("price", data.price)
      formData.append("discount", data.discount)
      formData.append("stock", data.stock)
      formData.append("minOrderQuantity", data.minOrderQuantity)
      formData.append("returnPolicy", data.returnPolicy)
      formData.append("subCategoryId", subCategoryId)
      formData.append("categoryId", categoryId)
      formData.append("image", image)

      const response = await api.post("/products", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        });
      getSubCategories();
      getProducts();
      showInputBox(false);
      console.log(response)
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const putProduct = async(id) => {
    try {
      const response = await api.put(`/products/${id}`, {
        name: newName,
        price: newPrice
      })
      getSubCategories();
      getProducts();
      showUpdateBox(false);
    } catch (err) {
      console.log(err.response.data)
    }
  }

  const deleteProduct = async(id) => {
    try {
      const response = await api.delete(`/products/${id}`)
      getSubCategories();
      getProducts();
    }
    catch (err) {
      console.log(err.response.data)
    }
  }

  const handleInputBox = (id) => {
    showInputBox(true)
    setSubCategoryId(id);
  }

  const handleUpdateBox = (id) => {
    showUpdateBox(true);
    setProductId(id)
  }

  useEffect(() => {
    if (!subCategoryId) return;

    const subCategory = subCategories.find(
      sub => sub._id === subCategoryId
    )
    if (subCategory) {
      setCategoryId(subCategory.categoryId)
    }
  }, [subCategoryId, subCategories]);

  const selectedCategory = useCategoryStore(
    (state) => state.selectedCategory
  )

  return (
    <>
    <div className="flex justify-between bg-(--bg)">

        {(updateBox || inputBox) && 
          <div className="absolute inset-0 bg-black/50" 
          onClick={() => showInputBox(false)}></div>
        }

      <div className="mx-8 flex flex-col items-start">
        {categories.map(category => 
          (subCategories.some(sub => sub.categoryId === category._id
            && products.some(product => product.subCategoryId === sub._id)
            )
          )
          &&
          (<div key={category._id}>
            
            
            {subCategories
            .filter(sub => sub.categoryId === category._id)
            .map((subCategory) => 
              
              (products.some(
                product => product.subCategoryId === subCategory._id)
              )
              &&
              (<div key={subCategory._id}>
                <h2 className="font-semibold text-lg mb-2">{category.name}<i class="ri-arrow-right-s-line"></i>{subCategory.name}</h2>

                <div className="flex gap-4 overflow-x-auto mb-6">
                  {products
                  .filter(product => product.subCategoryId === subCategory._id)
                  .map(product => (
                    <div key={product._id} className="border-2 rounded-lg p-2 ">
                      <ProductCard 
                        image={product.image}
                        name={product.name}
                        brand={product.brand}
                        price={product.price}
                        onClick={() => navigate(`/product/${product._id}`)}
                        
                      />

                      {role === "admin" && 
                      <div className="flex gap-4">
                        <button onClick={() => handleUpdateBox(product._id) } className="border rounded p-1">Update</button>
                        <button onClick={() => deleteProduct(product._id) } className="border rounded p-1">Delete</button>
                      </div>}

                    </div>
                  ))}
                </div>

              </div>
            ))}

          </div>
        ))}

      </div>

      {role === "admin" && 
      <button onClick={() => showInputBox(true)} className="border p-1 rounded h-fit">
        Add product
      </button>}

      {updateBox && 
        <DialogBox>
          <input type="text" placeholder="Enter new name" onChange={(e) => setNewName(e.target.value)} className="w-fit border rounded p-1"/>
          <input type="text" placeholder="Enter new price" onChange={(e) => setNewPrice(e.target.value)} className="w-fit border rounded p-1"/>
          <div className="flex gap-4">
            <button onClick={() => putProduct(productId)}>Done</button>
            <button onClick={() => showUpdateBox(false)}>Cancel</button>
          </div>
        </DialogBox>
      }

      {inputBox && 
      <DialogBox>
        <div>
          <select value={subCategoryId} onChange={(e) => setSubCategoryId(e.target.value)} className="border p-1 rounded">
            <option value="">Select subcategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
            ))}
          </select>
        </div>
        <form onSubmit={handleSubmit(postProducts)} className="flex flex-col w-fit  p-2 gap-4 border rounded-lg m-2">
          <input type="text" {...register("name")} placeholder="Enter product name" className="border p-1 rounded"/>
          <input type="text" {...register("brand")} placeholder="Enter brand name" className="border p-1 rounded"/>
          <input type="text" {...register("price")} placeholder="Enter price" className="border p-1 rounded"/>
          <input type="text" {...register("discount")} placeholder="Enter discount" className="border p-1 rounded"/>
          <input type="text" {...register("stock")} placeholder="Enter stock" className="border p-1 rounded"/>
          <input type="text" {...register("minOrderQuantity")} placeholder="Enter min order quantity" className="border p-1 rounded"/>
          <input type="text" {...register("returnPolicy")} placeholder="Enter return policy" className="border p-1 rounded"/>
          <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>

          <input type="submit" value={isSubmitting ?  "Adding Product" : "Add product"} disabled={isSubmitting}/>
          <button onClick={() => showInputBox(false)}>Cancel</button>
        </form>
      </DialogBox>
      }
    </div>
    </>
  )
}

export default Product;