import { useNavigate } from "react-router-dom"
import SearchBar from "../components/SearchBar";
import NavButton from "../components/NavButton";
import useAuthStore from "../store/AuthStore";

const UserHeader = () => {
  const navigate = useNavigate()
  const role = useAuthStore((state) => state.role);
  return (
    <>
      <div className="flex mx-4 my-2 border border-(--truffle)/30  rounded-full justify-between p-4 bg-(--bg) shadow-lg">
        <img src="/Sevra1.png" alt="Website Logo" className="h-12 "/>
        
        <div className="flex gap-4">
          {role === "user" && <NavButton name={"Cart"} onClick={() => navigate("/cart")}/>}
          {role === "user" && <NavButton name={"Orders"} onClick={() => navigate("/")}/>}
          {role === null && <NavButton name={"Onboard"} onClick={() => navigate("/signup")}/>}
          <NavButton name={"Settings"} />
        </div>
      </div>
    </>
  )
}

export default UserHeader;