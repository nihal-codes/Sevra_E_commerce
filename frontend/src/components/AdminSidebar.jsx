import Utility from "./SidebarContent";
import useLogout from "../hooks/logout";

const AdminSidebar = ({viewPage, setViewPage, menu, showMenu}) => {
  const handleLogout = useLogout();
  const handlePageChange = (page) => {
    setViewPage(page);
    showMenu(false);
  };
  
  return (
    <>
      {menu && <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => showMenu(false)}></div>}
      <div className={`${menu ? "fixed left-0 top-0 z-50 h-screen w-fit lg:w-72 bg-(--bg) shadow-xl" : "hidden"} flex lg:flex lg:static lg:w-auto lg:h-full lg:bg-transparent lg:shadow-none flex-col justify-between shrink-0 text-(--ablue) border-r border-(--oatmeal)`}>
        <div className="mx-6">
          <h2 className=" font-semibold text-lg -ml-2 mt-2 mb-4 lg:hidden">Admin Menu</h2>
          <button
            onClick={() => handlePageChange("dashboard")}
            className={viewPage === "dashboard" || viewPage === ""
              ? "flex rounded-lg gap-4 px-2 w-full py-1 mb-4 items-center transition-all duration-200 bg-(--oatmeal)/50"
              : "flex rounded-lg gap-4 px-2 w-full py-1 mb-4 items-center transition-all duration-200 hover:bg-(--oatmeal)/50"}
          >
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
            setViewPage={handlePageChange}
          />
          <Utility 
            title={"Store"} 
            items={[
              {icon: "ri-chat-3-line", name: "Reviews", onClick: "reviews"},
            ]}
            viewPage={viewPage}
            setViewPage={handlePageChange}
          />
        </div>
        <button className=" text-red-700 border-y border-(--oatmeal) mb-4 py-2 pl-6" onClick={handleLogout}>
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