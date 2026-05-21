import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, user, error } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] =
    useState(false);

  const [rememberMe, setRememberMe] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  localStorage.setItem("token", "test-token");

  navigate("/");
};

  return (
    <div
      className="min-h-screen relative flex items-center justify-center px-4 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1920')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Netflix Logo */}
      <div className="absolute top-6 left-6 md:left-12 z-20">
        <h1 className="text-red-600 text-3xl md:text-5xl font-extrabold tracking-wider">
          NETFLIX
        </h1>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/75 backdrop-blur-sm rounded-md px-8 py-10 md:px-14 md:py-14 shadow-2xl">

          <h2 className="text-white text-3xl font-bold mb-8">
            Sign In
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            {/* Email */}
            <input
              autoComplete="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="w-full bg-[#333] text-white px-4 py-4 rounded outline-none border border-transparent focus:border-white"
            />

            {/* Password */}
            <div className="relative">
              <input
                autoComplete="current-password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full bg-[#333] text-white px-4 py-4 rounded outline-none border border-transparent focus:border-white pr-12"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm rounded p-3">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold transition"
            >
              {isLoading
                ? "Signing In..."
                : "Sign In"}
            </button>

            {/* Remember & Forgot */}
            <div className="flex justify-between items-center text-sm text-gray-400">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={() =>
                    setRememberMe(
                      !rememberMe
                    )
                  }
                />
                Remember me
              </label>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    "/forgot-password"
                  )
                }
                className="hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </form>

          {/* Signup */}
          <div className="mt-10 text-gray-400">
            New here?

            <span
              onClick={() =>
                navigate("/signup")
              }
              className="text-white ml-2 cursor-pointer hover:underline"
            >
              Sign Up Now
            </span>
          </div>

          {/* Footer */}
          <p className="text-xs text-gray-500 mt-5 leading-relaxed">
            This page is protected by Google
            reCAPTCHA to ensure you're not a bot.
          </p>

          <button className="text-blue-500 text-sm mt-2 hover:underline">
            Learn more
          </button>

        </div>
      </div>
    </div>
  );
};

export default Login;