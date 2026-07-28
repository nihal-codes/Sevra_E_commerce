import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { isSubmitting }} = useForm();

  const login = async(data) => {
    try {
      const response = await axios.post("http://localhost:3000/register", data)
      console.log(response.data)
      if (response.status === 201) {
          navigate("/login")
      }
    }
    catch (err) {
      console.log(err.response.data)
      if(err.response.status === 500) {
        navigate("/login")
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(login)} className="flex flex-col border rounded w-fit p-2 gap-4">
        <input className="border p-1 rounded " type="text" placeholder="Enter name" {...register("fullName")} />
        <input className="border p-1 rounded " type="email" placeholder="Enter email" {...register("email")} />
        <input className="border p-1 rounded " type="password" placeholder="Enter password" {...register("password")} />

        <input type="submit" value={isSubmitting ? "Registering" : "Register"} disabled={isSubmitting}/>
      </form>
    </>
  )
}

export default Register;