import { useNavigate } from "react-router-dom";

export default function AdminSideBar () {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex p-2 gap-4 bg-black text-white rounded-lg ">
        <button onClick={() => navigate("/admin/category")} className="border p-1 rounded">Category</button>
        <button onClick={() => navigate("/admin/subcategory")} className="border p-1 rounded">Sub Category</button>
        <button onClick={() => navigate("/admin/product")} className="border p-1 rounded">Products</button>
      </div>
    </>
  )
}