import Category from "../components/Category";
import SubCategory from "../components/SubCategory";
import AdminProduct from "../components/AdminProduct";
import AdminHeader from "./AdminHeader";

const Admin = () => {
  
  return (
    <>
      <div className="flex flex-col bg-(--bg) min-h-screen">
        <AdminHeader />
        <AdminProduct />
      </div>
    </>
  )
}

export default Admin;