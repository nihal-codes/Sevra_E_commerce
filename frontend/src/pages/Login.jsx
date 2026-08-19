import axios from "axios"
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {isSubmitting} } = useForm();
  const [password, showPassword ] = useState(false)
  const loginUser = useAuthStore((state) => state.login)

  const login = async(data) => {
    try {
      const response = await axios.post("http://localhost:3000/login", data)
      const role = response.data.role
      if (response.status === 200) {
        loginUser(response.data.token, role);
        if (role === "admin") {
          navigate("/admin")
        }
        else if (role === "user") {
          navigate("/")
        }
      }
    }
    catch (err) {
      console.log(err.response.data)
      if(err.response.status === 500) {
        navigate("/signup")
      }
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center ">
        <form onSubmit={handleSubmit(login)} className="flex flex-col border rounded-lg border-(--oatmeal) bg-transparent w-fit p-4  gap-4">
          <h1 className="text-xl ">Sign In</h1>

          <div className="flex border shadow items-center border-(--oatmeal) rounded-lg p-2 gap-2">
            <i className="ri-mail-line opacity-50 "></i>
            <input className="outline-none " type="email" placeholder="Email" {...register("email")} />
          </div>
          <div className="flex border shadow items-center border-(--oatmeal) rounded-lg p-2 gap-2">
            <i className="ri-lock-password-line opacity-50 "></i>
            <input className="outline-none" type={password ?"text" :"password" } placeholder="Password" {...register("password")} />
            <button type="button" onClick={() => showPassword(!password)}>{password === true ? <i className="ri-eye-line"></i> : <i className="ri-eye-close-line"></i>
            }</button>
            
          </div>

          <input type="submit" value={"Login"} disabled={isSubmitting} className=" border border-(--oatmeal) w-fit rounded-full shadow-lg transition-all duration-150 hover:bg-(--oatmeal) active:scale-102 px-4 py-1"/>
        </form>
      </div>
    </>
  )
}

export default Login;