import useLogout from "../hooks/logout";
import { useNavigate } from "react-router-dom";

const Settings = ({onMouseOver, onMouseLeave}) => {
  const handleLogout = useLogout();
  const navigate = useNavigate();
  return (
    <>
      <div 
      onMouseOver={onMouseOver}
      onMouseOut={onMouseLeave}
      className="absolute right-0 top-16 flex flex-col items-start gap-2 w-fit bg-(--bg) border border-(--oatmeal) rounded-lg p-4 z-99">
        <button 
        onClick={() => navigate("/reset-password")}
        className="flex items-center rounded-lg gap-2 cursor-pointer transition-all duration-200 hover:bg-(--oatmeal)/50 px-2 py-1 w-full">
          <i className="ri-edit-line"></i>
          <h2>Reset Password</h2>
        </button>
        {/*<button 
        onClick={() => navigate("/forgot-password")}
        className="flex items-center rounded-lg gap-2 cursor-pointer transition-all duration-200 hover:bg-(--oatmeal)/50 px-2 py-1 w-full">
          <i className="ri-lock-unlock-line"></i>
          <h2>Forgot Password</h2>
        </button>*/}
        <button 
        onClick={handleLogout}
        className="flex items-center rounded-lg gap-2 cursor-pointer transition-all duration-200 hover:bg-(--oatmeal)/50 px-2 py-1 w-full  text-red-600">
          <i className="ri-logout-box-r-line"></i>
          <h2>Logout</h2>
        </button>
      </div>
    </>
  )
}

export default Settings;
