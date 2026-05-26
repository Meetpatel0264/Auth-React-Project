import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

import { registerUser } from "../redux/slices/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, isRegister, error } = useSelector(
    (state) => state.auth
  );

  const [showPassword, setShowPassword] = useState(false);

  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  useEffect(() => {
    if (isRegister) {
      navigate("/login");
    }
  }, [isRegister, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegister((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(register));
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

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20"></div>

      <div className="absolute top-6 left-6 md:left-12 z-20">
        <h1 className="text-red-600 text-3xl md:text-5xl font-extrabold tracking-wider">
          NETFLIX
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-black/75 backdrop-blur-md rounded-md px-8 py-10 md:px-14 md:py-12 shadow-2xl">
          <h2 className="text-white text-3xl font-bold mb-8">
            Sign Up
          </h2>

          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-500 text-red-300 p-3 rounded">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <input
              type="text"
              name="name"
              value={register.name}
              onChange={handleChange}
              required
              placeholder="Full Name"
              className="w-full bg-[#333] text-white px-4 py-4 rounded outline-none border border-transparent focus:border-white"
            />

            <input
              type="email"
              name="email"
              value={register.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="w-full bg-[#333] text-white px-4 py-4 rounded outline-none border border-transparent focus:border-white"
            />

            <div className="relative">
              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                value={register.password}
                onChange={handleChange}
                required
                placeholder="Password"
                className="w-full bg-[#333] text-white px-4 py-4 rounded outline-none border border-transparent focus:border-white pr-12"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>
            </div>

            <select
              name="role"
              value={register.role}
              onChange={handleChange}
              className="w-full bg-[#333] text-white px-4 py-4 rounded outline-none border border-transparent focus:border-white"
            >
              <option value="user">
                User
              </option>
              <option value="admin">
                Admin
              </option>
            </select>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded font-semibold transition"
            >
              {isLoading
                ? "Creating Account..."
                : "Create Account"}
            </button>
          </form>

          <div className="mt-10 text-gray-400">
            Already have an account?

            <span
              onClick={() =>
                navigate("/login")
              }
              className="text-white ml-2 cursor-pointer hover:underline"
            >
              Sign In
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-5 leading-relaxed">
            By creating an account you agree to our
            Terms of Use and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;