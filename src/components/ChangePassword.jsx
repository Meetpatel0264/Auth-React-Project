import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Lock } from "lucide-react";
import { changePassword } from "../redux/slices/authSlice";

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector(
        (state) => state.auth
    );

    const [formData, setFormData] =
        useState({
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
        });

    const [error, setError] =
        useState("");

    useEffect(() => {
        if (!user) {
            navigate("/");
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        const { name, value } =
            e.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (
            formData.newPassword !==
            formData.confirmPassword
        ) {
            setError(
                "New password and confirm password do not match"
            );
            return;
        }

        if (
            formData.oldPassword ===
            formData.newPassword
        ) {
            setError(
                "New password must be different from old password"
            );
            return;
        }

        const token =
            user?.token ||
            JSON.parse(
                localStorage.getItem("token")
            );

        const res = await dispatch(
            changePassword({
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                token,
            })
        );

        if (res.meta.requestStatus === "fulfilled") {
            alert("Password Updated Successfully");

            navigate("/dashboard", {
                replace: true,
            });
        }

        if (
            res.meta.requestStatus ===
            "rejected"
        ) {
            setError(
                res.payload ||
                "Old password is incorrect"
            );
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center relative flex items-center justify-center"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920')",
            }}
        >
            <div className="absolute inset-0 bg-black/75"></div>

            <h1 className="absolute top-6 left-10 text-red-600 text-4xl font-bold z-20 tracking-wide">
                NETFLIX
            </h1>

            <div className="relative z-10 w-full max-w-md bg-black/80 backdrop-blur-sm p-10 rounded-md shadow-2xl">
                <div className="flex items-center gap-3 mb-8">
                    <Lock
                        size={30}
                        className="text-red-600"
                    />

                    <h2 className="text-white text-3xl font-bold">
                        Change Password
                    </h2>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >
                    <input
                        type="password"
                        name="oldPassword"
                        placeholder="Current Password"
                        value={
                            formData.oldPassword
                        }
                        onChange={handleChange}
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-4 rounded outline-none focus:ring-2 focus:ring-red-600"
                    />

                    <input
                        type="password"
                        name="newPassword"
                        placeholder="New Password"
                        value={
                            formData.newPassword
                        }
                        onChange={handleChange}
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-4 rounded outline-none focus:ring-2 focus:ring-red-600"
                    />

                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm New Password"
                        value={
                            formData.confirmPassword
                        }
                        onChange={handleChange}
                        required
                        className="w-full bg-zinc-700 text-white px-4 py-4 rounded outline-none focus:ring-2 focus:ring-red-600"
                    />

                    {error && (
                        <div className="bg-red-600/20 border border-red-500 text-red-300 text-sm p-3 rounded">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded transition duration-300"
                    >
                        Update Password
                    </button>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/dashboard")
                        }
                        className="w-full border border-gray-500 hover:border-white text-white py-3 rounded transition duration-300"
                    >
                        Back to Dashboard
                    </button>
                </form>

                <p className="text-center text-gray-400 text-sm mt-6">
                    Keep your account secure by
                    updating your password
                    regularly.
                </p>
            </div>
        </div>
    );
};

export default ChangePassword;