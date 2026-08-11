import { useState } from "react";
import Category from "../components/Category";
import SubCategory from "../components/SubCategory";
import AdminProduct from "../components/AdminProduct";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "../components/AdminSidebar";

const Admin = () => {
  const [viewPage, setViewPage] = useState("")
  const renderComponent = () => {
    switch(viewPage) {
      case "product":
        return <AdminProduct />
      case "categories":
        return <Category />
      case "subcategories":
        return <SubCategory />
      
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