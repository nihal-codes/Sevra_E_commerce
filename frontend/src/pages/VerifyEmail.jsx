import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/api";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState("Verifying...");
  const [error, setError] = useState("");

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await api.get(
          `/verify-email/${token}`
        );

        setStatus(response.data.message);

      } catch (err) {
        console.log("VERIFICATION ERROR:", err);
        console.log("STATUS:", err.response?.status);
        console.log("DATA:", err.response?.data);
        console.log("URL:", err.config?.url);

        setError(
          err.response?.data?.message ||
          err.message ||
          "Verification failed"
        );
      }
    };

    verify();
  }, [token]);

  return (
    <div>
      {error ? (
        <h2>{error}</h2>
      ) : (
        <h2>{status}</h2>
      )}

      {!error && status !== "Verifying..." && (
        <button onClick={() => navigate("/login")}>
          Login
        </button>
      )}
    </div>
  );
};

export default VerifyEmail;