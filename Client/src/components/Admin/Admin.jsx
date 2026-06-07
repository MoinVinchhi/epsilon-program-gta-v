import React, { useState, useEffect } from "react";
import { useTheme } from "../../usetheamContext";
import { useAuth } from "../../creatContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register the components you use
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const AdminDonations = () => {
  const [userDonations, setUserDonations] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [auth] = useAuth();

  // Fetch user donations data
  const fetchUserDonations = async () => {
    try {
      const response = await fetch("http://localhost:5000/user-donations");
      if (!response.ok) {
        throw new Error("Failed to fetch user donations");
      }
      const data = await response.json();
      setUserDonations(data.userDonations);
    } catch (error) {
      setError(error.message);
      console.error("Failed to fetch user donations:", error);
    }
  };

  useEffect(() => {
    fetchUserDonations();
    if (!auth.isAdmin) {
      Swal.fire({
        title: "Error!",
        text: "You are not authorised!",
        icon: "error",
        confirmButtonText: "OK",
      });
      navigate("/");
    }
  }, [auth.isAdmin, navigate]);

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

  // Prepare data for the chart
  const chartData = {
    labels: userDonations.map((donation) => donation.username),
    datasets: [
      {
        label: "Total Donations",
        data: userDonations.map((donation) => donation.totalDonations),
        backgroundColor:
          theme === "blue"
            ? "rgba(59, 130, 246, 0.5)"
            : "rgba(45, 55, 72, 0.5)",
        borderColor:
          theme === "blue" ? "rgba(59, 130, 246, 1)" : "rgba(45, 55, 72, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={`p-6 ${bgColor} min-h-screen`}>
      {auth.isAdmin ? (
        <>
          <h1 className={`text-3xl font-bold mb-6`}>User Donations</h1>
          {error && (
            <p
              className={`text-red-600 bg-red-100 border border-red-300 rounded p-4 mb-6`}
            >
              {error}
            </p>
          )}
          <div
            className={`overflow-x-auto ${bgColor} shadow-md rounded-sm border-2 border-sky-100 mb-6`}
          >
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: "top",
                  },
                  tooltip: {
                    callbacks: {
                      label: (context) => {
                        return ` $${context.raw.toFixed(2)}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    ticks: {
                      autoSkip: false,
                    },
                  },
                  y: {
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `$${value}`,
                    },
                  },
                },
              }}
            />
          </div>
          <div
            className={`overflow-x-auto ${bgColor} shadow-md rounded-sm border-2 border-sky-100`}
          >
            <table className={`min-w-full divide-y ${bgColor} divide-gray-200`}>
              <thead className={`border-3`}>
                <tr>
                  <th
                    className={`px-6 py-3 text-2xl font-xl uppercase tracking-wider`}
                  >
                    Username
                  </th>
                  <th
                    className={`px-6 py-3 text-2xl font-xl uppercase tracking-wider`}
                  >
                    Total Donations
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y ${textColor}`}>
                {userDonations.map((donation) => (
                  <tr key={donation.username} className="hover:bg-gray-600">
                    <td className={`px-6 py-4 whitespace-nowrap text-lg`}>
                      {donation.username}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-lg`}>
                      ${donation.totalDonations.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default AdminDonations;
