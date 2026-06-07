import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import { useAuth } from "../../creatContext";

Modal.setAppElement("#root");

function VolunteeringForm({ isOpen, onClose, event }) {
  const [message, setMessage] = useState("");
  const [auth] = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/volunteers", {
        eventId: event._id,
        name: auth.username,
        email: auth.email,
        message,
      })
      .then(() => {
        alert("Your interest has been registered!");
        onClose();
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        alert("Error submitting form: " + error.message);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Volunteering Form"
      className="modal fixed inset-0 z-50 flex justify-center items-center"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 z-40"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative z-50">
        <h2 className="text-3xl mb-4">Volunteer for {event.title}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 p-2 text-black block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default VolunteeringForm;
