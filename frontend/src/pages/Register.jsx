import axios from "axios"
import { useState } from "react";
import { useForm } from "react-hook-form"
import Button from "../components/button2";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [password, showPassword] = useState(false)
  const [showPage, setShowPage] = useState("register")
  const { register, handleSubmit, formState: { isSubmitting }} = useForm();

  const reg = async(data) => {
    try {
      const response = await axios.post("http://localhost:3000/register", data)
      console.log(response.data)
      if (response.status === 201) {
          navigate("/login")
      }
    } catch (err) {
      console.log(err.response.data)
      if(err.response.status === 500) {
        navigate("/login")
      }
    }
  }
  
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
            <Button name="SignUp" onClick={() => navigate("/register")} />
            <Button name="SignIn" onClick={() => navigate("/login")}/>
          </div>
          <div className="flex flex-col items-center justify-center ">
            <form onSubmit={handleSubmit(reg)} className="flex flex-col border rounded-lg border-(--oatmeal) w-fit p-4  gap-4">
              <h1 className="text-xl ">Sign Up</h1>
              
              <div className="flex border shadow items-center border-(--oatmeal) rounded-lg p-2 gap-2">
                <i className="ri-user-line opacity-50 "></i>
                <input className="outline-none bg-(--bg)" type="text" placeholder="Name" {...register("fullName")} />

              </div>

              <div className="flex border shadow items-center border-(--oatmeal) rounded-lg p-2 gap-2">
                <i className="ri-mail-line opacity-50 "></i>
                <input className="outline-none bg-(--bg)" type="email" placeholder="Email" {...register("email")} />

              </div>

              <div className="flex border shadow items-center border-(--oatmeal) rounded-lg p-2 gap-2">
                <i className="ri-lock-password-line opacity-50 "></i>
                <input className="outline-none bg-(--bg)" type={password?"text" :"password" } placeholder="Password" {...register("password")} />
                
                <button type="button" onClick={() => showPassword(!password)}>{password === true ? <i className="ri-eye-line"></i> : <i className="ri-eye-close-line"></i>}</button>
              </div>

              <input type="submit" value={"Register"} disabled={isSubmitting} className="border border-(--oatmeal) w-fit rounded-full shadow-lg transition-all duration-150 hover:bg-(--oatmeal) active:scale-102 px-4 py-1"/>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}


export default Register;