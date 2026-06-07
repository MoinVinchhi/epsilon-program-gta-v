import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../creatContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../usetheamContext";
import Swal from "sweetalert2";
import login_img from "../../assets/images/epsilon_house.jpg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const url = import.meta.env.VITE_BACKEND_URL;

  axios.defaults.withCredentials = true;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/login`, {
        email,
        password,
      });
      if (response.status === 200) {
        const { username, token, points, isAdmin, email } = response.data;

        const newAuth = {
          username,
          token,
          isLoggedIn: true,
          isAdmin: isAdmin || false,
          points: points,
          email,
        };

        setAuth(newAuth);
        localStorage.setItem("auth", JSON.stringify(newAuth));

        await Swal.fire({
          title: "Success!",
          text: isAdmin ? "Admin Login successful" : "Login successful",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      await Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.error || "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const containerBgColor =
    theme === "blue"
      ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700"
      : "bg-gradient-to-r from-gray-800 via-gray-900 to-black";
  const overlayColor =
    theme === "blue"
      ? "bg-blue-light bg-opacity-50"
      : "bg-gray-900 bg-opacity-50";
  const sectionBgColor =
    theme === "blue" ? "bg-blue-primary-bg" : "bg-dark-primary-bg";
  const textPrimaryColor =
    theme === "blue" ? "text-blue-text-blue" : "text-dark-text-blue";
  const textSecondaryColor =
    theme === "blue" ? "text-blue-text-dark" : "text-dark-text-dark";
  const buttonBgColor = theme === "blue" ? "bg-green-500" : "bg-yellow-500";
  const buttonHoverBgColor =
    theme === "blue" ? "hover:bg-green-600" : "hover:bg-yellow-600";

  return (
    <div className={`flex justify-center items-center ${overlayColor} `}>
      <div
        className={`max-w-md h-fit w-full p-6 ${containerBgColor} rounded-lg opacity-90 shadow-md`}
      >
        <form className={`flex flex-col gap-2`} onSubmit={handleSubmit}>
          <img src={login_img} className={`h-40 shadow-lg`} alt="Logo" />
          <h2 className={` font-bold mt-2  text-center`}>Log In</h2>
          <p>Welcome, {auth.username ? auth.username : "Guest"}</p>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded`}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={`w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded mt-4`}
          />

          <button
            type="submit"
            className={`w-full bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold py-2 px-4 rounded mt-4`}
          >
            Log In
          </button>

          <h4 className={`mt-4 text-center`}>
            Don&apos;t have an account?{" "}
            <a
              href="\signup"
              className={`text-blue-500 font-bold hover:cursor-pointer hover:text-blue-400 transition-all`}
            >
              Sign Up
            </a>
          </h4>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
