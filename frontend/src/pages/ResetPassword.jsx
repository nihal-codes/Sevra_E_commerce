import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/errorMessage";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = token
        ? await api.post(`/reset-password/${token}`, { password })
        : await api.post("/change-password", { currentPassword, password });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(getErrorMessage(error, "Unable to reset password"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-(--oatmeal) justify-center items-center px-4">
      <form onSubmit={handleSubmit} className="bg-(--bg) flex flex-col gap-4 border border-(--oatmeal) rounded-lg p-6 w-full max-w-sm">
        <h1 className="text-xl font-semibold">{token ? "Reset Password" : "Change Password"}</h1>
        {token ? (
          <p className="text-sm text-(--fblue)">Choose a new password for your account.</p>
        ) : (
          <input
            type="password"
            required
            placeholder="Current password"
            value={currentPassword}
            onChange={(event) => setCurrentPassword(event.target.value)}
            className="border shadow border-(--oatmeal) rounded-lg p-2 outline-none bg-(--bg)"
          />
        )}
        <input
          type="password"
          required
          minLength={6}
          placeholder="New password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="border shadow border-(--oatmeal) rounded-lg p-2 outline-none bg-(--bg)"
        />
        <input
          type="password"
          required
          minLength={6}
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          className="border shadow border-(--oatmeal) rounded-lg p-2 outline-none bg-(--bg)"
        />
        <button type="submit" disabled={loading} className="border border-(--oatmeal) rounded-full shadow-lg px-4 py-2 hover:bg-(--oatmeal)">
          {loading ? "Saving..." : "Save password"}
        </button>
        <Link to="/login" className="text-sm text-(--truffle) hover:underline text-center">Back to login</Link>
      </form>
    </div>
  );
};

export default ResetPassword;
