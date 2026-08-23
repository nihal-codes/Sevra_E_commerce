import useAuthStore from "../store/AuthStore";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/logout";

const UserSidebar = ({menu, showMenu}) => {
  const role = useAuthStore((state) => state.role);
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const buttonStyle = "flex items-center justify-end gap-2 border-b border-(--truffle)/30 text-right w-full cursor-pointer transition-all duration-100 active:bg-(--oatmeal)/50 px-2 py-1"
  return (
    <>
      <div className="absolute bg-black/40 h-screen w-screen z-9" onClick={() => showMenu(false)}></div>

      <div className="absolute h-full flex flex-col p-4 right-0 z-99 gap-2 items-end bg-(--bg) ">

        <h1 className="text-lg font-semibold self-start w-full mb-2">Menu</h1>
        <button className={buttonStyle} onClick={() => navigate("/")}><i className="ri-home-line"></i>Home</button>

        {role === "user" && <button className={buttonStyle} onClick={() => navigate("/cart")}>
          <i className="ri-shopping-cart-2-line"></i>
          <h2>Cart</h2>
        </button>}

        {role === "user" && <button className={buttonStyle} onClick={() => navigate("/orders")}><i className="ri-shopping-bag-line"></i>Orders</button>}


        {role === "user" && <div className="flex flex-col gap-2">
          <h3 className="text-sm self-start mt-6">Settings</h3>
          {/*<button className={buttonStyle} onClick={() => navigate("/forgot-password")}><i className="ri-lock-unlock-line"></i>Forget Password</button>*/}
          <button className={buttonStyle} onClick={() => navigate("/reset-password")}><i className="ri-pencil-line"></i>Reset Password</button>
          <button className={`${buttonStyle} text-red-600`} onClick={handleLogout}><i className="ri-logout-box-line"></i>Logout</button>
        </div>}
        {!role &&
        <button className={buttonStyle} onClick={() => navigate("/register")}>Onboard</button>
        }
      </div>
    </>
  )
}

export default UserSidebar;
