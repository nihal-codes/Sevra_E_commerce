import { useNavigate } from "react-router-dom"
import SearchBar from "../components/SearchBar";
import NavButton from "../components/NavButton";

const UserHeader = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className="flex mx-4 my-2 border border-(--truffle)/30  rounded-full justify-between p-4 bg-(--bg) shadow-lg">
        <img src="/Sevra1.png" alt="Website Logo" className="h-12 "/>
        
        <div className="flex gap-4">
          <NavButton name={"Cart"} onClick={() => navigate("/cart")}/>
          <NavButton name={"Onboard"} onClick={() => navigate("/signup")}/>
          <NavButton name={"Orders"} onClick={() => navigate("/")}/>
          <NavButton name={"Settings"} />
        </div>
      </div>
    </>
  )
}

export default UserHeader;