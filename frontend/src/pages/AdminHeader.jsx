import { useNavigate } from "react-router-dom"

const AdminHeader = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex justify-between p-4">
        <img src="/SevraOfficial.jpeg" alt="Website Logo" />
        <div className="flex gap-4">
          <button>Settings</button>
        </div>
      </div>
    </>
  )
}

export default AdminHeader;