
import { useState } from "react";
import api from "../api/api";
import toast from "react-hot-toast";
import { getErrorMessage } from "../utils/errorMessage";

const ResendVerification = ({ initialEmail = "" }) => {
    const [email, setEmail] = useState(initialEmail);
    const [loading, setLoading] = useState(false);
    const handleResend = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await api.post("/resend-verification", { email });
            toast.success(response.data.message);
        } catch (err) {
            toast.error(
                getErrorMessage(
                    err,
                    "Unable to resend verification email"
                )
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleResend}
            className="flex flex-col gap-3 border-t border-(--oatmeal) mt-4 pt-4"
        >
            <p className="text-sm opacity-70">
                Didn't receive your verification email?
            </p>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border rounded-lg p-2 outline-none"
            />
            <button
                type="submit"
                disabled={loading}
                className="border rounded-full px-4 py-2"
            >
                {loading
                    ? "Sending..."
                    : "Resend verification email"
                }
            </button>
        </form>
    );
};

export default ResendVerification;