import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import Button from "../components/button2";

const Sign = () => {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState("register")
  
  return (
    <>
      <div className="flex gap-4 h-screen justify-center">
        <div className="py-24" >
          <h1 className="text-5xl ">"All you <br /> need <br /> in one <br /> Place"</h1>
        </div>
        <div className="bg-(--bg) flex flex-col gap-10 py-24">
          <div className="flex p-1 bg-(--oatmeal) w-fit rounded-full">
            <Button name="SignUp" onClick={() => setShowPage("register")}/>
            <Button name="SignIn" onClick={() => setShowPage("login")}/>
          </div>
          {showPage === "register" && <Register />} 
          {showPage === "login" && <Login />}
        </div>
      </div>
    </>
  )
}


export default Sign;