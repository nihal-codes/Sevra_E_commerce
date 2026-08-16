import { useNavigate } from "react-router-dom"

const UserHeader = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex justify-between p-4">
        <img src="/SevraOfficial.jpeg" alt="Website Logo" className="h-12 w-12"/>
        <div className="flex gap-4">
          <button onClick={() => navigate("/cart")}>Cart</button>
          <button>SignUp/SignIn</button>
          <button>Settings</button>
        </div>
      </div>
    </>
  )
}

export default UserHeader;