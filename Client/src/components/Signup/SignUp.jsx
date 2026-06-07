import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTheme } from "../../usetheamContext";
import { RiEye2Fill, RiEyeCloseFill } from "react-icons/ri";
import Swal from "sweetalert2";
import signup_img from "../../assets/images/Group_image.jpg";

export default function App() {
  const [value, setValue] = useState({
    name: "",
    email: "",
    password: "",
    image: "", // To store the file locally
  });
  const [showPassword, setShowPassword] = useState(false);
  const { theme } = useTheme();

  const url = import.meta.env.VITE_BACKEND_URL;

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setValue({
      ...value,
      image: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", value.name);
    formData.append("email", value.email);
    formData.append("password", value.password);
    formData.append("file", value.image);

    try {
      const response = await axios.post(
        `${url}/register`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      setValue({
        name: "",
        email: "",
        password: "",
        image: null,
      });
      await Swal.fire({
        title: "Success!",
        text: "Account created successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (err) {
      let errorMessage = "An error occurred";
      if (err.response) {
        errorMessage = `Error ${err.response.status}: ${err.response.data.message || "An error occurred"
          }`;
      } else if (err.request) {
        errorMessage = "No response received from the server";
      } else {
        errorMessage = "Error setting up the request";
      }
      await Swal.fire({
        title: "Error!",
        text: errorMessage,
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

  return (
    <>
      <div
        className={`h-screen flex justify-center items-center ${overlayColor}`}
      >
        <div
          className={`max-w-md w-full p-6 ${containerBgColor} rounded shadow-md`}
        >
          <form className={`flex flex-col gap-2`} onSubmit={handleSubmit}>
            <img src={signup_img} className={`h-50 shadow-lg`} alt="Logo" />
            <h2 className={`text-5xl font-bold mt-2 mb-8 text-center`}>
              Sign Up
            </h2>

            <input
              placeholder="Username"
              value={value.name}
              onChange={handleChange}
              required
              name="name"
              className={`w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded`}
            />

            <input
              type="email"
              placeholder="Email"
              value={value.email}
              onChange={handleChange}
              required
              name="email"
              className={`w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded mt-4`}
            />

            <div className={`flex gap-2`}>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={value.password}
                onChange={handleChange}
                required
                name="password"
                className={`w-full p-2 pl-5 text-sm text-gray-700 border border-gray-300 rounded mt-4`}
              />

              <button
                type="button"
                onClick={handleShowPassword}
                className={`border w-7 rounded mt-4 p-1`}
              >
                {showPassword ? <RiEye2Fill /> : <RiEyeCloseFill />}
              </button>
            </div>

            <input
              type="file"
              placeholder="Upload a profile image"
              id="image"
              onChange={handleImageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />

            <button
              type="submit"
              className={`w-full bg-orange-500 hover:bg-orange-600 transition-all text-white font-bold py-2 px-4 rounded mt-4`}
            >
              Submit
            </button>

            <h4 className={`mt-4 text-center`}>
              Already have an account?{" "}
              <a
                href="/login"
                className={`text-blue-500 font-bold hover:cursor-pointer hover:text-blue-400 transition-all`}
              >
                Log In
              </a>
            </h4>
          </form>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}
