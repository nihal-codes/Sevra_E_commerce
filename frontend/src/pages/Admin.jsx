import Category from "../components/Category";
import SubCategory from "../components/SubCategory";
import Product from "../components/Product";
import AdminHeader from "./AdminHeader";

const Admin = () => {
  
  return (
    <>
      <div className="flex flex-col bg-(--bg) min-h-screen">
        <AdminHeader />
        <Product />
      </div>
    </>
  )
}

export default Admin;