import { useNavigate } from "react-router-dom"
import SearchBar from "../components/SearchBar";
import NavButton from "../components/NavButton";
import useAuthStore from "../store/AuthStore";
import Settings from "./Settings";
import { useState } from "react";
import UserSidebar from "../components/UserSidebar";

const UserHeader = () => {
  const navigate = useNavigate()
  const role = useAuthStore((state) => state.role);
  const [settings, showSettings ] = useState(false)
  const [menu, showMenu] = useState(false)

  return (
    <>
      <div className="relative flex mx-4 my-2 items-center border border-(--truffle)/30  rounded-full justify-between p-4 bg-(--bg) shadow-lg">
        <img src="/Sevra1.png" alt="Website Logo" className="h-12 "/>
        
        <div className="hidden lg:flex gap-4">
          {role === "user" && <NavButton name={"Home"} onClick={() => navigate("/")}/>}
          {role === "user" && <NavButton name={"Cart"} onClick={() => navigate("/cart")}/>}
          {role === "user" && <NavButton name={"Orders"} onClick={() => navigate("/orders")}/>}
          {!role && <NavButton name={"Onboard"} onClick={() => navigate("/register")}/>}
          <NavButton name={"Settings"} onMouseOver={() => showSettings(true)} onMouseLeave={() => showSettings(false)}/>
          
        </div>
        <button 
        onClick={(e) => {e.stopPropagation(); showMenu(true);}}
        className="flex flex-col items-center justify-center lg:hidden border rounded-full border-(--truffle)/30 w-10 h-10">
          <i className="ri-menu-unfold-2-line text-lg"></i>
        </button>
        {settings === true && <Settings onMouseOver={() => showSettings(true)} onMouseLeave={() => showSettings(false)}/>}
      </div>

      {menu && <UserSidebar menu={menu} showMenu={showMenu} />}
    </>
  ) 
}

export default UserHeader;