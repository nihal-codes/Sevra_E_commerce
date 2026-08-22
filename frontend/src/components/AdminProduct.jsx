import api from "../api/api"
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import DialogBox from "./DialogBox"
import useProductCatalog from "../hooks/useProductCatalog";
import SearchBar from "./SearchBar";
import toast from "react-hot-toast"
import { getErrorMessage } from "../utils/errorMessage"

const AdminProduct = () => {
  const {categories, subCategories, products, refetchEverything } = useProductCatalog();
  const [categoryId, setCategoryId       ] = useState("");
  const [subCategoryId, setSubCategoryId ] = useState("");
  const [productId, setProductId         ] = useState("");
  const [newName, setNewName             ] = useState("");
  const [newPrice, setNewPrice           ] = useState("");
  const [image, setImage                 ] = useState(null);
  const [inputBox, showInputBox          ] = useState(false);
  const [updateBox, showUpdateBox        ] = useState(false);
  const inputStyling = "border border-(--oatmeal) p-2 rounded-lg shadow outline-none";

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();          
  const categoryFilter = searchParams.get("category");
  const subCategoryFilter = searchParams.get("subcategory");

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const postProducts = async(data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name)
      formData.append("brand", data.brand)
      formData.append("description", data.description)
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
      showInputBox(false);
      refetchEverything();
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to add product"))
    }
  }

  const putProduct = async(id) => {
    try {
      const response = await api.put(`/products/${id}`, {
        name: newName,
        price: newPrice
      })
      showUpdateBox(false);
      refetchEverything();
    } catch (err) {
      toast.error(getErrorMessage(err, "Unable to update product"))
    }
  }

  const deleteProduct = async(id) => {
    try {
      const response = await api.delete(`/products/${id}`)
      refetchEverything();
    }
    catch (err) {
      toast.error(getErrorMessage(err, "Unable to delete product"))
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

  return (
    <>
    <div className="flex flex-col items-center ">

      {(updateBox || inputBox) && 
        <div className="absolute inset-0 bg-black/50 " 
        onClick={() => {
          showInputBox(false);
          showUpdateBox(false);
          }}>
        </div>
      }
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-(--ablue)">Products</h1>
            <h4 className="text-xs font-light ">Manage all products in your store</h4>
          </div>
          <button onClick={() => showInputBox(true)} className=" rounded-lg py-2 px-2 bg-(--ablue) text-white text-sm w-fit font-semibold transition-all duration-150 hover:bg-(--fblue) h-fit">
            <i className="ri-add-line mr-2"></i>Add product
          </button>
        </div>

        <SearchBar item={"Product"} />

        <div className="flex flex-col">
          <div className="grid grid-cols-[3fr_1.5fr_1fr_1fr_1.5fr_1fr_1fr_1fr] gap-2 px-3 py-4 rounded-t-lg text-sm font-semibold bg-(--oatmeal) text-(--ablue) ">
            <div>Product</div>
            <div>Category</div>
            <div>Price</div>
            <div>Discount</div>
            <div>Stock</div>
            <div>Min Order</div>
            <div>Rating</div>
            <div>Actions</div>
          </div>
          <div className="flex flex-col ">
            {categories
            .map(category => 
              (subCategories.some(sub => sub.categoryId === category._id && products.some(product => product.subCategoryId === sub._id)))
              &&
              (<div key={category._id}>
                {subCategories
                .filter(sub => sub.categoryId === category._id)
                .map((subCategory) => 
                  (products.some(product => product.subCategoryId === subCategory._id))
                  &&
                  (<div key={subCategory._id}>
                    <div className="">
                      {products
                      .filter(product => product.subCategoryId === subCategory._id)
                      .map(product => (
                      <div key={product._id}>  
                        <div className="grid grid-cols-[3fr_1.5fr_1fr_1fr_1.5fr_1fr_1fr_1fr] gap-2 items-center px-3 py-2 border-b border-x border-(--oatmeal) hover:bg-(--oatmeal)/20 transition-colors duration-300 ease-in-out">
                          <div className="flex items-center gap-4">
                            <img src={product.image} alt={product.name} className="h-16 w-16 rounded-lg"/>
                            <div className="flex flex-col">
                              <h2 className="text-xs font-semibold">{product.name}</h2>                          
                              <h2 className="text-xs font-light">{product.brand}</h2>                          
                              <h2 className="text-xs lg:w-40">{product.description}</h2>                       
                            </div>
                          </div>

                          <div>
                            <h2 className="text-xs font-semibold">{category.name}</h2>
                            <h2 className="text-xs">{subCategory.name}</h2>
                          </div>
                          
                          <div>
                            <h2 className="text-xs font-semibold">₹{product.price}</h2>
                            <h2 className="text-xs line-through opacity-70">₹{product.price + product.discount}</h2>
                          </div>

                          <div className="w-fit">
                            <h2 className="bg-(--truffle) w-fit text-white text-sm px-2 py-0.5 rounded-lg ">{Math.round(product.discount/(product.discount+product.price)*100)}%</h2>
                          </div>

                          <div className="flex flex-col ">
                            <h2 className="text-sm ml-2 font-semibold">{product.stock}</h2>
                            {product.stock > 50 && <h2 className="text-xs bg-green-300/40 w-fit py-0.5 px-2 rounded">In Stock</h2>}
                            {(product.stock < 50 && product.stock > 0) && <h2 className="text-xs bg-orange-300/40 w-fit py-0.5 px-2 rounded">Low Stock</h2>}
                            {(product.stock === 0) && <h2 className="text-xs bg-red-300/40 w-fit py-0.5 px-2 rounded">Out of Stock</h2>}
                          </div>

                          <div>
                            <h2 className="text-sm font-semibold">{product.minOrderQuantity}</h2>
                          </div>

                          <div>
                            <h2 className="text-sm">{product.rating}</h2>
                          </div>

                          <div className="flex gap-2">
                            <button onClick={() => handleUpdateBox(product._id) } className="rounded-lg h-fit w-10 py-2 px-2 text-black transition-all duration-150 hover:bg-(--oatmeal) border border-(--oatmeal)"><i className="ri-pencil-line"></i></button>
                            <button onClick={() => deleteProduct(product._id) } className="rounded-lg h-fit w-10 py-2 px-2 text-red-700 transition-all duration-150 hover:bg-(--oatmeal) border border-(--oatmeal)"><i className="ri-delete-bin-line"></i></button>
                          </div>
                        </div>
                      </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>

      {updateBox && 
        <DialogBox>
          <h2 className="font-bold text-lg text-(--ablue)">Update Product</h2>
          <input type="text" placeholder="Enter new name" onChange={(e) => setNewName(e.target.value)} className={inputStyling}/>
          <input type="text" placeholder="Enter new price" onChange={(e) => setNewPrice(e.target.value)} className={inputStyling}/>
          <div className="flex gap-4">
            <button onClick={() => putProduct(productId)} className="rounded-lg py-2 px-4.5 bg-(--ablue) text-white text-sm font-semibold transition-all duration-150 hover:bg-(--fblue) w-29.5">Done</button>
            <button onClick={() => showUpdateBox(false)} className="rounded-lg py-2 px-4.5 bg-(--ablue) text-white text-sm font-semibold transition-all duration-150 hover:bg-(--fblue) w-29.5">Cancel</button>
          </div>
        </DialogBox>}

      {inputBox && 
      <DialogBox>
        <div>
          <select 
            value={subCategoryId} 
            onChange={(e) => setSubCategoryId(e.target.value)} 
            className=" border border-(--oatmeal) shadow p-1 rounded-lg outline-none">
            <option value="">Select subcategory</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
            ))}
          </select>
        </div>
        <form onSubmit={handleSubmit(postProducts)} className="flex flex-col w-fit  p-2 gap-3 m-2">
          <input type="text" {...register("name")} placeholder="Enter product name" className={inputStyling}/>
          <input type="text" {...register("brand")} placeholder="Enter brand name" className={inputStyling}/>
          <input type="text" {...register("description")} placeholder="Enter description" className={inputStyling}/>
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
      </DialogBox>}
    </div>
    </>
  )
}

export default AdminProduct;
