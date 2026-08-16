import { useNavigate } from "react-router-dom"

const AdminHeader = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex mx-4 my-2 border border-(--truffle)/30  rounded-full justify-between p-4 bg-(--bg) shadow-lg">
        <img src="/Sevra1.png" alt="Website Logo" className="h-12"/>
        <div className="flex gap-4">
          <button>Settings</button>
        </div>
      </div>
    </>
  )
}

export default AdminHeader;