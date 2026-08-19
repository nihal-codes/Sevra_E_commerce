import { useState } from "react";
import AdminCategory from "../components/AdminCategory";
import AdminSubcategory from "../components/AdminSubcategory";
import AdminProduct from "../components/AdminProduct";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import AdminUser from "../components/AdminUser";
import AdminOrder from "./AdminOrders";

const Admin = () => {
  const [viewPage, setViewPage] = useState("")
  const renderComponent = () => {
    switch(viewPage) {
      case "product":
        return <AdminProduct />
      case "categories":
        return <AdminCategory />
      case "subcategories":
        return <AdminSubcategory />
      case "orders":
        return <AdminOrder />
      case "users":
        return <AdminUser />
      
      default:
        return <AdminProduct />
    }
  }

  return (
    <>
      <div className="flex flex-col bg-(--bg) min-h-screen h-screen ">
        <AdminHeader />
        <div className="flex h-[calc(100%)] gap-20">
          <AdminSidebar 
            viewPage={viewPage}
            setViewPage={setViewPage}
          />
          <div className="mt-4">
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin;