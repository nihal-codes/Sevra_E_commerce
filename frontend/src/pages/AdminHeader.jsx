import { useNavigate } from "react-router-dom"

const AdminHeader = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex justify-between p-4">
        <img src="null" alt="Website Logo" />
        <div className="flex gap-4">
          <button>Orders</button>
          <button onClick={() => navigate("/category")}>Categories</button>
          <button>Subcategories</button>
          <button>Settings</button>
        </div>
      </div>
    </>
  )
}

export default AdminHeader;