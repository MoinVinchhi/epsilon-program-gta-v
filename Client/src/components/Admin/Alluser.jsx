import React, { useState, useEffect } from "react";
import { useTheme } from "../../usetheamContext";
import { useAuth } from "../../creatContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [auth] = useAuth();

  const url = import.meta.env.VITE_BACKEND_URL;

  // Fetch users data
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${url}/getallusers`);
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    if (!auth.isAdmin) {
      Swal.fire({
        title: "Error!",
        text: "You are not authorised!",
        icon: "error",
        confirmButtonText: "OK",
      });
      navigate("/");
    }
  }, []);

  const { theme } = useTheme();
  const bgColor =
    theme === "blue" ? "bg-blue-primary-bg" : "bg-dark-primary-bg";
  const textColor =
    theme === "blue" ? "text-blue-text-light" : "text-dark-text-light";
  const buttonColor =
    theme === "blue"
      ? "bg-green-600 hover:bg-green-800"
      : "bg-green-600 hover:bg-green-800";
  const overlayColor = theme === "blue" ? "bg-blue-overlay" : "bg-dark-overlay";

  return (
    <div className={`p-6 bg-gray-100 min-h-screen`}>
      <h1 className={`text-3xl font-bold text-center text-gray-800 mb-6`}>
        All Users
      </h1>
      {error && <p className={`text-red-500 text-center mb-4`}>{error}</p>}
      <div className={`overflow-x-auto`}>
        <table
          className={`min-w-full ${bgColor} ${textColor} border border-gray-200 rounded-lg shadow-md`}
        >
          <thead className={`bg-gray-800 text-white`}>
            <tr>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}
              >
                Name
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}
              >
                Email
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}
              >
                Points
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}
              >
                Membership ID
              </th>
              <th
                className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider`}
              >
                Profile
              </th>
            </tr>
          </thead>
          <tbody className={`divide-y divide-gray-200`}>
            {users.map((user) => (
              <tr key={user._id} className={`hover:bg-gray-600`}>
                <td
                  className={`px-6 py-4 whitespace-nowrap text-sm font-medium`}
                >
                  {user.name}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap  `}>
                  {user.email}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap  `}>
                  {user.points}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap  `}>
                  {user.membership_id}
                </td>
                <td className={`px-6 py-4 whitespace-nowrap  `}>
                  <img
                    className="w-60 h-60 object-cover border-4 border-gray-300 shadow-lg mb-6 md:mb-0 md:mr-6"
                    src={user.image}
                    alt="Membership"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
