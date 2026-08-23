import api from "../api/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form"
import useAuthStore from "../store/AuthStore";
import { useLocation } from "react-router-dom";
import { useNavigate, NavLink } from "react-router-dom";
import { getErrorMessage } from "../utils/errorMessage";
import useGuestCartStore from "../store/GuestCartStore";
// import ResendVerification from "../components/ResendEmail";

const Login = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: {isSubmitting} } = useForm();
  const [password, showPassword ] = useState(false)
  const loginUser = useAuthStore((state) => state.login)
  const location = useLocation();
  const emailFromRegister = location.state?.email;
  const [unverifiedEmail, setUnverifiedEmail] = useState("");

  const login = async(data) => {
    try {
      const response = await api.post("/login", data)
      const role = response.data.role
      if (response.status === 200) {
        loginUser(role);
        const guestItems = useGuestCartStore.getState().items;
        if (guestItems.length) {
          await Promise.all(
            guestItems.map(item =>
              api.post("/cart", { productId: item.productId, orderStatus: false, quantity: item.quantity })
            )
          );
          useGuestCartStore.getState().clear();
        }
        if (role === "admin") {
          navigate("/admin")
        }
        else if (role === "user") {
          navigate("/")
        }
      }
    }
    catch (err) {
      toast.error(getErrorMessage(err, "Unable to sign in"))
      // inside catch (err) in login()
      if (err.response?.status === 403) {
        setUnverifiedEmail(data.email);
      }
      if(err.response?.status === 500) {
        navigate("/login")
      }
    }
  }
  
  return (
    <>
      <div className="flex min-h-screen flex-col bg-(--bg) lg:bg-(--oatmeal) lg:justify-center lg:flex-row">
        <div className="flex w-full flex-col gap-4 border-2 border-(--oatmeal) bg-linear-to-br from-(--ablue) via-(--fblue) to-(--ablue) px-6 py-8 text-white lg:w-auto lg:px-12 lg:py-24" >
          <h1 className="text-4xl leading-tight lg:text-5xl ">"All you <br /> <span className="text-(--flame)">NEED</span> <br /> in one <br /> <span className="text-(--flame)">PLACE</span>"
          </h1>
          <h1>Get Started</h1>

          <div className="flex flex-wrap gap-x-5 gap-y-2 lg:flex-col">
            <div className="flex items-center gap-2">
              <i className="ri-shopping-bag-line border rounded-full h-8 w-8 flex items-center justify-center text-xl"></i>
              <h2 className="text-sm lg:text-lg">Huge MarketPlace</h2>
            </div>
            <div className="flex gap-2 items-center">
              <i className="ri-contract-line border rounded-full h-8 w-8 flex items-center justify-center text-xl"></i>
              <h2 className="text-sm lg:text-lg">Best Deals</h2>
            </div>

          </div>
        </div>
        <div className="flex w-full flex-col gap-6 bg-(--bg) px-4 py-8 lg:w-auto lg:px-8 lg:py-24">
          <div className="flex self-center rounded-full bg-(--oatmeal) p-1">
            <NavLink to="/register"
              className={({ isActive }) =>
                `text-center rounded-full px-2 py-1 transition-all duration-150 hover:-translate-y-px active:scale-102
                ${isActive
                    ? "bg-linear-to-br from-(--ablue) via-(--fblue) to-(--ablue) text-white shadow-lg"
                    : "bg-(--oatmeal)"}`}>
              SignUp
            </NavLink>
            <NavLink to="/login"
              className={({ isActive }) =>
                `text-center rounded-full px-2 py-1 transition-all duration-150 hover:-translate-y-px active:scale-102
                ${isActive
                    ? "bg-linear-to-br from-(--ablue) via-(--fblue) to-(--ablue) text-white shadow-lg"
                    : "bg-(--oatmeal)"}`}>
              SignIn
            </NavLink>
          </div>
          <div className="flex w-full flex-col items-center justify-center">
            <form onSubmit={handleSubmit(login)} className="flex w-full max-w-sm flex-col gap-4 rounded-lg border border-(--oatmeal) bg-transparent p-4">
              <h1 className="text-xl ">Sign In</h1>

              <div className="flex border shadow items-center border-(--oatmeal) rounded-lg p-2 gap-2">
                <i className="ri-mail-line opacity-50 "></i>
                <input className="min-w-0 flex-1 bg-transparent outline-none" type="email" placeholder="Email" defaultValue={emailFromRegister} {...register("email")} />
              </div>
              <div className="flex border shadow items-center border-(--oatmeal) rounded-lg p-2 gap-2">
                <i className="ri-lock-password-line opacity-50 "></i>
                <input className="min-w-0 flex-1 bg-transparent outline-none" type={password ?"text" :"password" } placeholder="Password" {...register("password")} />
                <button type="button" onClick={() => showPassword(!password)}>{password === true ? <i className="ri-eye-line"></i> : <i className="ri-eye-close-line"></i>
                }</button>
                
              </div>

              <input type="submit" value={isSubmitting ? "Signing in..." : "Login"} disabled={isSubmitting} className="w-full rounded-full border border-(--oatmeal) px-4 py-2 shadow-lg transition-all duration-150 hover:bg-(--oatmeal) active:scale-102"/>
              {/*<NavLink to="/forgot-password" className="text-sm text-(--truffle) hover:underline">
                Forgot password?
              </NavLink>*/}
            </form>
            {/*(emailFromRegister || unverifiedEmail) && (
              <ResendVerification initialEmail={emailFromRegister || unverifiedEmail} />
            )*/}
          </div>
        </div>
      </div>
    </>
  )
}


export default Login;
