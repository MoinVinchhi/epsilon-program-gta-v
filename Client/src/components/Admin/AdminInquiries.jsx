import React, { useState, useEffect } from "react";
import { useAuth } from "../../creatContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminInquiries = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [auth] = useAuth();

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await fetch("http://localhost:5000/admin/inquiries");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setInquiries(data);
      } catch (error) {
        setError("There was a problem fetching the inquiries.");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();

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

  return (
    <div className="max-w mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">All Inquiries</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry._id}
            className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:bg-gray-800"
          >
            <div className="mb-2">
              <span className="font-bold text-white">Name:</span>
              <div className="text-gray-300">{inquiry.name}</div>
            </div>
            <div className="mb-2">
              <span className="font-bold text-white">Email:</span>
              <div className="text-gray-300">{inquiry.email}</div>
            </div>
            <div className="mb-2">
              <span className="font-bold text-white">Message:</span>
              <div className="text-gray-300">{inquiry.message}</div>
            </div>
            <div>
              <span className="font-bold text-white">Date:</span>
              <div className="text-gray-300">
                {new Date(inquiry.date).toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminInquiries;
