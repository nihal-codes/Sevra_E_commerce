import { useNavigate } from "react-router-dom";
import Utility from "./SidebarContent";

const AdminSidebar = ({viewPage, setViewPage}) => {
  const navigate = useNavigate();
  
  return (
    <>
      <div className="flex flex-col sticky justify-between  text-(--ablue) border-r border-(--oatmeal) ">
        <div className="mx-6">
          <button className="flex rounded-lg gap-4 px-2 w-full py-1 mb-4 items-center transition-all duration-200 hover:bg-(--oatmeal)/50">
            <i className="ri-home-6-line"></i>
            <h2 className="text-sm font-semibold">Dashboard</h2>
          </button>
          <Utility 
            title={"Manage"} 
            items={[
              {icon: "ri-store-2-line", name: "Orders", onClick: "orders"},
              {icon: "ri-box-1-line", name: "Products", onClick: "products"},
              {icon: "ri-box-3-line", name: "Categories", onClick: "categories"},
              {icon: "ri-box-2-line", name: "Subcategories", onClick: "subcategories"},
              {icon: "ri-user-line", name: "Users", onClick: "users"},
            ]}
            viewPage={viewPage}
            setViewPage={setViewPage}
          />
          <Utility 
            title={"Store"} 
            items={[
              {icon: "ri-chat-3-line", name: "Users"},
            ]}
            viewPage={viewPage}
            setViewPage={setViewPage}
          />
          <Utility 
            title={"Settings"} 
            items={[
              {icon: "ri-settings-line", name: "Order"},
            ]} 
            viewPage={viewPage}
            setViewPage={setViewPage}
          />
        </div>
        <button className=" text-red-700 border-y border-(--oatmeal) mb-4 py-2 pl-6  ">
          <div className="flex items-center rounded-lg gap-4 hover:bg-(--oatmeal)/50 px-2 py-1 mr-4 cursor-pointer transition-all duration-200 ">
            <i className="ri-logout-box-r-line "></i>
            <h2 className="text-sm font-semibold">Logout</h2>
          </div>
        </button>
      </div>
    </>
  )
}

export default AdminSidebar;