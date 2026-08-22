import { useState } from "react";
import AdminCategory from "../components/AdminCategory";
import AdminSubcategory from "../components/AdminSubcategory";
import AdminProduct from "../components/AdminProduct";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import AdminUser from "../components/AdminUser";
import AdminOrder from "./AdminOrders";
import AdminDashboard from "../components/AdminDashboard";

const Admin = () => {
  const [viewPage, setViewPage] = useState("")
  const renderComponent = () => {
    switch(viewPage) {
      case "dashboard":
        return <AdminDashboard />
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
        return <AdminDashboard />
    }
  }

  return (
    <>
      <div className="flex flex-col bg-(--bg) h-screen overflow-hidden">
        <AdminHeader />
        <div className="flex flex-1 min-h-0 gap-20">
          <AdminSidebar viewPage={viewPage} setViewPage={setViewPage} />
          <div className="mt-4 flex-1 min-w-0 overflow-y-auto pr-6">
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin;