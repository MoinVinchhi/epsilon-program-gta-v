import React, { useState } from "react";
import { useAuth } from "../../creatContext";

const ProfilePage = () => {
  const [userData, setUserData] = useAuth();
  const [auth] = useAuth();
  const [edit, setEdit] = useState(true);
  const [showPassword, setShowPassword] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    phone: "",
    password: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  const cursorStyle = edit
    ? "cursor-text border-gray-300"
    : "cursor-not-allowed";
  const textColor = edit ? "text-white" : "text-gray-100";

  return (
    <div className="profileContainer relative flex justify-end p-10 min-h-screen overflow-hidden">
      <div className="fixed z-[5] left-0 top-30 flex flex-col p-16">
        <h1 className="sideText text-6xl text-left text-white m-0 p-0 select-none">
          Profile
        </h1>
      </div>
      <div className="m-auto left-52 relative">
        <div className="m-auto relative profilePart max-w-screen-md mx-auto my-6 bg-gray-800 text-white rounded-lg px-10 py-20 flex flex-col items-center">
          <img
            className="h-80 w-8h-80 rounded-lg object-cover mb-5"
            src={auth.image}
            alt="profile picture"
          />
          <div className="text-center">
            <h4 className="text-2xl mb-3">Username: {auth.username}</h4>
            <h4 className="text-xl mb-3">Email address: {auth.email}</h4>
            <h4>Points: {auth.points.toFixed(2) }</h4>
          </div>
        </div>

      </div>
        {/* vertical */}
        <div className="absolute top-0 left-0 w-screen h-screen opacity-5 flex">
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
          <div className="w-[0.5px]  ml-5 bg-white h-screen"></div>
        </div>

        {/* horizontal */}
        <div className="absolute top-0 left-0 w-screen h-screen opacity-5 flex flex-col">
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
          <div className="w-screen  mt-5 bg-white h-[0.5px]"></div>
        </div>
    </div>
  );
};

export default ProfilePage;
