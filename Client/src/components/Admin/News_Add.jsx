import React, { useState, useEffect } from "react";
import { useAuth } from "../../creatContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const AdminNewsForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [newsItems, setNewsItems] = useState([]);
  const [editingNews, setEditingNews] = useState(null);
  const navigate = useNavigate();
  const [auth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/news", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, image }),
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "News item created successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setTitle("");
        setDescription("");
        setImage("");
        // Refresh news list
        const updatedResponse = await fetch("http://localhost:5000/news");
        const updatedData = await updatedResponse.json();
        setNewsItems(updatedData);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to create news item",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error creating news:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:5000/news");
        const data = await response.json();
        setNewsItems(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchNews();
  }, []);

  const handleEdit = (news) => {
    setEditingNews(news._id);
    setTitle(news.title);
    setDescription(news.description);
    setImage(news.image);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:5000/news/${editingNews}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, image }),
        }
      );

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: "News item updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        setEditingNews(null);
        setTitle("");
        setDescription("");
        setImage("");
        // Refresh news list
        const updatedResponse = await fetch("http://localhost:5000/news");
        const updatedData = await updatedResponse.json();
        setNewsItems(updatedData);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to update news item",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error updating news:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/news/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        Swal.fire({
          title: "Deleted!",
          text: "News item deleted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        // Refresh news list
        const updatedResponse = await fetch("http://localhost:5000/news");
        const updatedData = await updatedResponse.json();
        setNewsItems(updatedData);
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete news item",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error deleting news:", error);
      Swal.fire({
        title: "Error!",
        text: "An unexpected error occurred. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  useEffect(() => {
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

  return (
    <div
      className={`p-8 bg-gray-400 rounded-lg shadow-lg max-w-4xl mx-auto mt-10`}
    >
      <h1 className={`text-4xl font-extrabold text-gray-900 mb-6 text-center`}>
        Create News Item
      </h1>
      <form onSubmit={handleSubmit} className={`space-y-6`}>
        <div className={`mb-4`}>
          <label className={`block text-lg font-medium text-gray-700 mb-2`}>
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            required
          />
        </div>
        <div className={`mb-4`}>
          <label className={`block text-lg font-medium text-gray-700 mb-2`}>
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            rows="4"
            required
          />
        </div>
        <div className={`mb-4`}>
          <label className={`block text-lg font-medium text-gray-700 mb-2`}>
            Image URL
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          Submit
        </button>
      </form>
      <div className={`p-8  rounded-lg shadow-lg mt-10`}>
        <h1
          className={`text-4xl font-extrabold text-gray-900 mb-6 text-center`}
        >
          News Items
        </h1>
        <ul className={`grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3`}>
          {newsItems.map((news) => (
            <li key={news._id} className={`p-4 rounded-lg shadow-md`}>
              <h2 className={`text-2xl font-bold text-gray-800`}>
                {news.title}
              </h2>
              <p className={`text-gray-700 mb-2`}>{news.description}</p>
              {news.image && (
                <img
                  src={news.image}
                  alt={news.title}
                  className={`w-full h-auto mb-2 rounded-lg`}
                />
              )}
              <div className={`flex justify-between`}>
                <button
                  onClick={() => handleEdit(news)}
                  className={`bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none`}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(news._id)}
                  className={`bg-red-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-700 focus:outline-none`}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {editingNews && (
        <form
          onSubmit={handleUpdate}
          className={`space-y-6 mt-8  p-6 rounded-lg shadow-lg`}
        >
          <h1
            className={`text-4xl font-extrabold text-gray-900 mb-6 text-center`}
          >
            Edit News Item
          </h1>
          <div className={`mb-4`}>
            <label className={`block text-lg font-medium text-gray-700 mb-2`}>
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              required
            />
          </div>
          <div className={`mb-4`}>
            <label className={`block text-lg font-medium text-gray-700 mb-2`}>
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
              rows="4"
              required
            />
          </div>
          <div className={`mb-4`}>
            <label className={`block text-lg font-medium text-gray-700 mb-2`}>
              Image URL
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className={`w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            Update
          </button>
          <button
            type="button"
            onClick={() => setEditingNews(null)}
            className={`w-full mt-4 bg-gray-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500`}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default AdminNewsForm;
