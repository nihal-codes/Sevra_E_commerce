import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import api from "../api/api"
import DialogBox from "./DialogBox"
import useCategoryStore from "../store/CategoryStore";
import { useNavigate } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useSearchParams } from "react-router-dom";

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
  const inputStyling = "border border-(--oatmeal) p-2 rounded-lg shadow outline-none";

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();          
  const categoryFilter = searchParams.get("category");
  const subCategoryFilter = searchParams.get("subcategory");

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
    <div className="flex justify-between">

      {(updateBox || inputBox) && 
        <div className="absolute inset-0 bg-black/50" 
        onClick={() => {
          showInputBox(false);
          showUpdateBox(false);
          }}>
        </div>
      }

      <div className="mx-16 flex flex-col items-start">
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

                <div className="flex gap-2 overflow-x-auto mb-2 -ml-3 ">
                  {products
                  .filter(product => product.subCategoryId === subCategory._id)
                  .map(product => (
                    <div key={product._id} className="pb-6 px-3 ">
                      <ProductCard 
                        image={product.image}
                        name={product.name}
                        brand={product.brand}
                        price={product.price}
                        rating={product.rating}
                        onClick={role === "user" && (() => navigate(`/product/${product._id}`))}
                        children={
                          role === "admin" && 
                          <div className="flex gap-2">
                            <button onClick={() => handleUpdateBox(product._id) } className="rounded-lg py-2 px-4.5 bg-(--ablue) text-white text-sm font-semibold transition-all duration-150 hover:bg-(--fblue)">Update</button>
                            <button onClick={() => deleteProduct(product._id) } className="rounded-lg py-2 px-4.5 bg-(--ablue) text-white text-sm font-semibold transition-all duration-150 hover:bg-(--fblue)">Delete</button>
                          </div>
                        }
                        role={role}
                      />
                    </div>
                  ))}
                </div>

              </div>
            ))}

          </div>
        ))}

      </div>
        
      {role === "admin" && 
      <button onClick={() => showInputBox(true)} className="rounded-lg py-2 px-4.5 bg-(--ablue) text-white text-sm font-semibold transition-all duration-150 hover:bg-(--fblue) h-fit mr-12 mt-4">
        Add product
      </button>}

      {updateBox && 
        <DialogBox>
          <h2 className="font-bold text-lg text-(--ablue)">Update Box</h2>
          <input type="text" placeholder="Enter new name" onChange={(e) => setNewName(e.target.value)} className={inputStyling}/>
          <input type="text" placeholder="Enter new price" onChange={(e) => setNewPrice(e.target.value)} className={inputStyling}/>
          <div className="flex gap-4">
            <button onClick={() => putProduct(productId)} className="rounded-lg py-2 px-4.5 bg-(--ablue) text-white text-sm font-semibold transition-all duration-150 hover:bg-(--fblue) w-29.5">Done</button>
            <button onClick={() => showUpdateBox(false)} className="rounded-lg py-2 px-4.5 bg-(--ablue) text-white text-sm font-semibold transition-all duration-150 hover:bg-(--fblue) w-29.5">Cancel</button>
          </div>
        </DialogBox>
      }

      {inputBox && 
      <DialogBox>
        <div>
          <select 
            value={subCategoryId} 
            onChange={(e) => setSubCategoryId(e.target.value)} 
            className=" border border-(--oatmeal) shadow p-1 rounded-lg">
            <option value="">Select subcategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
            ))}
          </select>
        </div>
        <form onSubmit={handleSubmit(postProducts)} className="flex flex-col w-fit  p-2 gap-3 m-2">
          <input type="text" {...register("name")} placeholder="Enter product name" className={inputStyling}/>
          <input type="text" {...register("brand")} placeholder="Enter brand name" className={inputStyling}/>
          <input type="text" {...register("price")} placeholder="Enter price" className={inputStyling}/>
          <input type="text" {...register("discount")} placeholder="Enter discount" className={inputStyling}/>
          <input type="text" {...register("stock")} placeholder="Enter stock" className={inputStyling}/>
          <input type="text" {...register("minOrderQuantity")} placeholder="Enter min order quantity" className={inputStyling}/>
          <input type="text" {...register("returnPolicy")} placeholder="Enter return policy" className={inputStyling}/>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImage(e.target.files[0])} 
            className="
              block w-full text-sm text-(--ablue)
              border border-(--oatmeal) rounded-lg shadow p-2
              file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0
              file:text-sm file:font-semibold
              file:bg-(--ablue) file:text-white
              hover:file:bg-(--fblue)
              file:cursor-pointer file:transition-colors file:duration-150
            "
          />
          <div className="flex gap-4 justify-center">
            <input type="submit" value={isSubmitting ?  "Adding Product" : "Add product"} disabled={isSubmitting} className="rounded-lg py-2 px-4.5 bg-(--ablue) text-white text-sm font-semibold transition-all duration-150 hover:bg-(--fblue) w-39"/>
            <button onClick={() => showInputBox(false)} className="rounded-lg py-2 px-4.5 bg-(--ablue) text-white text-sm font-semibold transition-all duration-150 hover:bg-(--fblue) w-39">Cancel</button>
          </div>
        </form>
      </DialogBox>
      }
    </div>
    </>
  )
}

export default Product;