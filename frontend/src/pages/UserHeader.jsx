import { useNavigate } from "react-router-dom"
import SearchBar from "../components/SearchBar";
import NavButton from "../components/NavButton";
import useAuthStore from "../store/AuthStore";
import Settings from "./Settings";
import { useState } from "react";

const UserHeader = () => {
  const navigate = useNavigate()
  const role = useAuthStore((state) => state.role);
  const [settings, showSettings ] = useState(false)
  return (
    <>
      <div className="relative flex mx-4 my-2 border border-(--truffle)/30  rounded-full justify-between p-4 bg-(--bg) shadow-lg">
        <img src="/Sevra1.png" alt="Website Logo" className="h-12 "/>
        
        <div className="flex gap-4">
          {role === "user" && <NavButton name={"Home"} onClick={() => navigate("/")}/>}
          {role === "user" && <NavButton name={"Cart"} onClick={() => navigate("/cart")}/>}
          {role === "user" && <NavButton name={"Orders"} onClick={() => navigate("/orders")}/>}
          {!role && <NavButton name={"Onboard"} onClick={() => navigate("/register")}/>}
          <NavButton name={"Settings"} onMouseOver={() => showSettings(true)} onMouseLeave={() => showSettings(false)}/>
          
        </div>
        {settings === true && <Settings onMouseOver={() => showSettings(true)} onMouseLeave={() => showSettings(false)}/>}
      </div>
    </>
  )
}

export default UserHeader;