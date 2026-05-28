import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  forgotPassword,
  resetPassword,
} from "../redux/slices/authSlice";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { emailVerify, forgotError } = useSelector(
    (state) => state.auth
  );

  const [otpVerified, setOtpVerified] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "otp" &&
      value.length > 4
    ) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendOtp = () => {
    if (!formData.email) {
      alert("Please enter email");
      return;
    }

    dispatch(
      forgotPassword({
        email: formData.email,
      })
    );
  };

  const handleVerifyOtp = () => {
    if (formData.otp.length !== 4) {
      alert("OTP must be 4 digits");
      return;
    }

    setOtpVerified(true);
  };

  const handleResetPassword = async (
    e
  ) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Verify OTP first");
      return;
    }

    if (!formData.newPassword) {
      alert(
        "Please enter new password"
      );
      return;
    }

    const res = await dispatch(
      resetPassword(formData)
    );

    if (
      res.meta.requestStatus ===
      "fulfilled"
    ) {
      navigate("/login");
    }
  };

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1920')",
      }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20"></div>

      <div className="absolute top-6 left-6 md:left-12 z-20">
        <h1 className="text-red-600 text-3xl md:text-5xl font-extrabold tracking-wider">
          NETFLIX
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/75 backdrop-blur-md rounded-md px-8 py-10 md:px-14 md:py-12 shadow-2xl">

          <h2 className="text-white text-3xl font-bold">
            Forgot Password
          </h2>

          <p className="text-gray-400 text-sm mt-2 mb-8">
            Reset your account password
          </p>

          <form
            onSubmit={
              handleResetPassword
            }
            className="space-y-4"
          >
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={emailVerify}
              placeholder="Email Address"
              className="w-full bg-[#333] text-white px-4 py-4 rounded outline-none border border-transparent focus:border-white disabled:opacity-60"
            />

            <input
              type="text"
              name="otp"
              maxLength={4}
              value={formData.otp}
              onChange={handleChange}
              disabled={!emailVerify}
              placeholder="Enter OTP"
              className="w-full bg-[#333] text-white px-4 py-4 rounded outline-none border border-transparent focus:border-white disabled:opacity-60"
            />

            {!emailVerify && (
              <button
                type="button"
                onClick={
                  handleSendOtp
                }
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold transition"
              >
                Send OTP
              </button>
            )}

            {emailVerify &&
              !otpVerified && (
                <button
                  type="button"
                  onClick={
                    handleVerifyOtp
                  }
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded font-semibold transition"
                >
                  Verify OTP
                </button>
              )}

            {otpVerified && (
              <>
                <input
                  type="password"
                  name="newPassword"
                  value={
                    formData.newPassword
                  }
                  onChange={
                    handleChange
                  }
                  placeholder="New Password"
                  className="w-full bg-[#333] text-white px-4 py-4 rounded outline-none border border-transparent focus:border-white"
                />

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold transition"
                >
                  Reset Password
                </button>
              </>
            )}

            {forgotError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded p-3">
                {forgotError}
              </div>
            )}
          </form>

          <div className="mt-10 text-gray-400">
            Remember password?

            <span
              onClick={() =>
                navigate("/login")
              }
              className="text-white ml-2 cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-5">
            This page is protected by
            Google reCAPTCHA to ensure
            you're not a bot.
          </p>

          <button className="text-blue-500 text-sm mt-2 hover:underline">
            Learn more
          </button>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;