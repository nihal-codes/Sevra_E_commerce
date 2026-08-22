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
        const response = await api.get(`/verify-email/${token}`);

        setStatus(response.data.message);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Verification failed"
        );
      }
    };

    verify();
  }, [token]);

  const isVerifying = status === "Verifying...";

  return (
    <div className="min-h-screen bg-[#EEE9DF] flex items-center justify-center px-5 py-10">

      <div className="w-full max-w-md">

        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-[0.18em] text-[#1B2632]">
            SEVRA
          </h1>

          <div className="w-8 h-0.5 bg-[#FFB162] mx-auto mt-3" />
        </div>

        <div className="bg-white rounded-2xl border border-[#C9C1B1]/40 shadow-[0_20px_60px_rgba(27,38,50,0.10)] overflow-hidden">

          <div className="h-1.5 bg-[#FFB162]" />
          <div className="px-8 py-10 sm:px-10 sm:py-12 text-center">
            {isVerifying && !error && (
              <>
                <div className="mx-auto w-16 h-16 rounded-full bg-[#EEE9DF] flex items-center justify-center">
                  <div className="w-7 h-7 border-[3px] border-[#C9C1B1] border-t-[#2C3B4D] rounded-full animate-spin" />
                </div>
                <h2 className="mt-7 text-2xl font-semibold text-[#1B2632]">
                  Verifying your email
                </h2>
                <p className="mt-3 text-sm leading-6 text-[#2C3B4D]/70">
                  We're confirming your email address.
                  This will only take a moment.
                </p>
              </>
            )}

            {!isVerifying && !error && (
              <>
                <div className="mx-auto w-20 h-20 rounded-full bg-[#2C3B4D] flex items-center justify-center shadow-lg">
                  <div className="w-10 h-10 rounded-full border-2 border-[#FFB162] flex items-center justify-center">
                    <i className="ri-check-line text-2xl text-[#FFB162]" />
                  </div>
                </div>
                <p className="mt-7 text-xs font-semibold tracking-[0.2em] uppercase text-[#A35139]">
                  Verification complete
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1B2632]">
                  Email verified
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#2C3B4D]/70 max-w-sm mx-auto">
                  Your email address has been successfully verified.
                  Your account is now ready to use.
                </p>
                <div className="mt-8 flex items-center gap-4 rounded-xl bg-[#EEE9DF]/70 border border-[#C9C1B1]/40 px-5 py-4 text-left">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-[#2C3B4D] flex items-center justify-center">
                    <i className="ri-shield-check-line text-lg text-[#FFB162]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1B2632]">
                      Account verified
                    </p>
                    <p className="text-xs text-[#2C3B4D]/60 mt-0.5">
                      You can now securely access your account.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full mt-8 h-12 rounded-xl bg-[#1B2632] text-white text-sm font-semibold
                  hover:bg-[#2C3B4D]
                  transition-all duration-200
                  shadow-[0_8px_20px_rgba(27,38,50,0.15)]
                  hover:shadow-[0_10px_25px_rgba(27,38,50,0.22)]
                  active:scale-[0.98]
                  flex items-center justify-center gap-2"
                >
                  Continue to Login
                  <i className="ri-arrow-right-line text-lg" />
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="mt-5 text-sm font-medium text-[#2C3B4D]/70
                  hover:text-[#A35139]
                  transition-colors duration-200"
                >
                  Return to store
                </button>
              </>
            )}
            {error && (
              <>
                <div className="mx-auto w-20 h-20 rounded-full bg-[#A35139]/10 border border-[#A35139]/20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-[#A35139] flex items-center justify-center">
                    <i className="ri-close-line text-2xl text-white" />
                  </div>
                </div>
                <p className="mt-7 text-xs font-semibold tracking-[0.2em] uppercase text-[#A35139]">
                  Verification unsuccessful
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#1B2632]">
                  We couldn't verify you
                </h2>
                <p className="mt-4 text-sm leading-6 text-[#2C3B4D]/70">
                  {error}
                </p>
                <div className="mt-8 rounded-xl bg-[#EEE9DF]/70 border border-[#C9C1B1]/40 px-5 py-4 text-left">
                  <div className="flex gap-3">
                    <i className="ri-information-line text-lg text-[#A35139] mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-[#1B2632]">
                        What can you do?
                      </p>
                      <p className="text-xs leading-5 text-[#2C3B4D]/60 mt-1">
                        The verification link may have expired or
                        already been used. Please request a new
                        verification email.
                      </p>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/login")}
                  className="w-full mt-8 h-12 rounded-xl bg-[#1B2632] text-white text-sm font-semibold
                  hover:bg-[#2C3B4D]
                  transition-all duration-200
                  active:scale-[0.98]
                  flex items-center justify-center gap-2"
                >
                  Go to Login
                  <i className="ri-arrow-right-line text-lg" />
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="mt-5 text-sm font-medium text-[#2C3B4D]/70
                  hover:text-[#A35139]
                  transition-colors duration-200"
                >
                  Return to store
                </button>
              </>
            )}
          </div>
        </div>
        <div className="mt-7 text-center">
          <p className="text-xs text-[#2C3B4D]/50">
            Secure account verification
          </p>
          <div className="flex items-center justify-center gap-2 mt-2">
            <i className="ri-lock-line text-xs text-[#2C3B4D]/40" />
            <span className="text-[11px] text-[#2C3B4D]/40">
              Your account is protected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;