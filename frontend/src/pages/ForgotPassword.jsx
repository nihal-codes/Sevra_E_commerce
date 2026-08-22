import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/errorMessage";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await api.post("/forgot-password", { email });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to send password reset email"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-(--oatmeal) justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="bg-(--bg) flex flex-col gap-4 border border-(--oatmeal) rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-xl font-semibold">Forgot Password</h1>
        <p className="text-sm text-(--fblue)">Enter your email to receive a password reset link.</p>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="border shadow border-(--oatmeal) rounded-lg p-2 outline-none bg-(--bg)"
        />
        <button type="submit" disabled={loading} className="border border-(--oatmeal) rounded-full shadow-lg px-4 py-2 hover:bg-(--oatmeal)">
          {loading ? "Sending..." : "Send reset link"}
        </button>
        <Link to="/login" className="text-sm text-(--truffle) hover:underline text-center">Back to login</Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
