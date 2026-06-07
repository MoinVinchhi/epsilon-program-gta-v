import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Blog from "../../components/Blog/Blog.jsx";
import { useAuth } from "../../creatContext";
import Swal from "sweetalert2";

const Events = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [venue, setVenue] = useState("");
  const [duration, setDuration] = useState("");
  const [points, setPoints] = useState("");
  const navigate = useNavigate();
  const [auth] = useAuth();

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !title ||
      !description ||
      !date ||
      !time ||
      !venue ||
      !duration ||
      !image
    ) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("date", date);
    formData.append("time", time);
    formData.append("file", image); // Append the file with the key 'file'
    formData.append("venue", venue);
    formData.append("duration", duration);
    formData.append("points", points);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/events",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Event registered successfully");
      navigate("/Blog");
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event: " + error.message);
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
    <div className="eventContainer p-6">
      {auth.isAdmin ? (
        <>
          <div>
            <div className="eventPart relative max-w-xl mx-auto p-4 pt-6 pb-8 mb-4 mt-4 bg-white rounded shadow-md">
              <h2 className="text-2xl font-bold mb-4">Add New Event</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="title"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter event title"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="description"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter event description"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="date"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="time"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="venue"
                  >
                    Venue
                  </label>
                  <input
                    type="text"
                    id="venue"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter event venue"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="points"
                  >
                    Points
                  </label>
                  <input
                    type="number"
                    id="points"
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter required points"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="duration"
                  >
                    Duration
                  </label>
                  <input
                    type="text"
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter event duration"
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="image"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Event
                </button>
              </form>
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

          <div>
            <Blog />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Events;
