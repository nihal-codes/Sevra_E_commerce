import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import { useNavigate } from "react-router-dom";
import Button from "../components/button2";
import image from "../assets/images/image.png"

const Sign = () => {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState("register")
  
  return (
    <>
      <div className="flex  h-screen bg-(--oatmeal) justify-center">
        <div className="py-24 flex flex-col px-12 bg-linear-to-br from-(--ablue) via-(--fblue) to-(--ablue) border-2 border-(--oatmeal) gap-4 text-white" >
          <h1 className="text-5xl ">"All you <br /> <span className="text-(--flame)">NEED</span> <br /> in one <br /> <span className="text-(--flame)">PLACE</span>"
          </h1>
          <h1>Get Started</h1>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <i className="ri-shopping-bag-line border rounded-full h-8 w-8 flex items-center justify-center text-xl"></i>
              <h2 className="text-lg">Huge MarketPlace</h2>
            </div>
            <div className="flex gap-2 items-center">
              <i className="ri-contract-line border rounded-full h-8 w-8 flex items-center justify-center text-xl"></i>
              <h2 className="text-lg">Best Deals</h2>
            </div>

          </div>
        </div>
        <div className="bg-(--bg) flex flex-col gap-4 py-24 px-8">
          <div className="flex p-1 bg-(--oatmeal) w-fit rounded-full">
            <Button name="SignUp" onClick={() => setShowPage("register")} />
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