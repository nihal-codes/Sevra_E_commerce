import { useState } from "react";
import AdminCategory from "../components/AdminCategory";
import AdminSubcategory from "../components/AdminSubcategory";
import AdminProduct from "../components/AdminProduct";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "../components/AdminSidebar";
import AdminUser from "../components/AdminUser";
import AdminOrder from "./AdminOrders";
import AdminDashboard from "../components/AdminDashboard";
import AdminReviews from "../components/AdminReviews";

const Admin = () => {
  const [viewPage, setViewPage] = useState("dashboard")
  const [menu, showMenu] = useState(false)
  const renderComponent = () => {
    switch(viewPage) {
      case "dashboard":
        return <AdminDashboard />
      case "products":
        return <AdminProduct />
      case "categories":
        return <AdminCategory />
      case "subcategories":
        return <AdminSubcategory />
      case "orders":
        return <AdminOrder />
      case "users":
        return <AdminUser />
      case "reviews":
        return <AdminReviews />
      
      default:
        return <AdminDashboard />
    }
  }

  return (
    <>
      <div className="flex flex-col bg-(--bg) h-screen overflow-hidden">
        <AdminHeader showMenu={showMenu} />
        <div className="flex flex-1 min-h-0 gap-0 lg:gap-20">
          <AdminSidebar 
            viewPage={viewPage}
            setViewPage={setViewPage}
            menu={menu}
            showMenu={showMenu}
          />
          <div className="mt-4 flex-1 min-w-0 overflow-y-auto px-4 lg:px-0 lg:pr-6">
            {renderComponent()}
          </div>
        </div>
      </div>
    </>
  )
}

export default Admin;