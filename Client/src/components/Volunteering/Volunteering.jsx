import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../creatContext";
import moment from "moment";
import VolunteeringForm from "./VolunteeringForm";

function Volunteering() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [volunteerStatus, setVolunteerStatus] = useState({});
  const [auth] = useAuth();

  const url = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${url}/api/events`)
      .then((response) => {
        setEvents(response.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Error loading events: " + error.message);
        setLoading(false);
      });

    axios
      .get(`${url}/api/volunteers`)
      .then((response) => {
        const statusMap = {};
        response.data.forEach((volunteer) => {
          statusMap[volunteer.eventId] = volunteer.status;
        });
        setVolunteerStatus(statusMap);
      })
      .catch((error) => {
        console.error(error);
        alert("Error loading volunteer status: " + error.message);
      });
  }, []);

  const handleShowInterest = (event) => {
    setSelectedEvent(event);
    setVolunteerStatus((prevStatus) => ({
      ...prevStatus,
      [event._id]: "Pending",
    }));

    // Send interest request to the backend
    axios
      .post(`${url}/api/volunteers`, {
        eventId: event._id,
        userId: auth.userId,
      })
      .then((response) => {
        // Optionally handle the response
      })
      .catch((error) => {
        console.error("Error showing interest:", error);
        //   alert('Error showing interest: ' + error.message);
      });
  };

  const renderEvents = (eventsList) => (
    <div className="flex justify-end gap-8">
      <div className="space-y-8 relative right-0 w-full">
        {eventsList.map((event) => (
          <div
            key={event._id}
            className="eventCard flex bg-zinc-800 shadow-lg rounded-lg overflow-hidden transition-all duration-300"
          >
            <div className="w-52 bg-gray-800 text-white flex-shrink-0 p-4 text-center flex flex-col justify-center items-center relative">
              <img
                src={event.image || "./src/assets/images/blank.png"}
                className="absolute inset-0 object-cover w-full h-full opacity-30"
              />
              <p className="text-5xl font-bold">
                {moment(event.date).format("D")}
              </p>
              <p className="text-4xl">{moment(event.date).format("MMM")}</p>
            </div>

            <div className="flex flex-col justify-items-start p-4 flex-1">
              <h4 className="text-left text-2xl m-0 p-0 font-semibold text-gray-300 mb-2">
                {event.title}
              </h4>
              <hr className="bg-black mb-2 opacity-25" />
              <p className="text-left text-md leading-7 text-gray-300 mb-5">
                {event.description}
              </p>
              <p className="text-left text-sm leading-6 text-gray-300 mb-2">
                <h4 className="">Time: {event.time}</h4>
                <h4 className="">Venue: {event.venue}</h4>
                <h4 className="">Duration: {event.duration}</h4>
              </p>

              {volunteerStatus[event._id] == "pending" ? (
                <>
                  <button
                    className={`w-fit mt-2 px-4 py-2 bg-yellow-400 text-white rounded-lg cursor-not-allowed`}
                  >
                    Pending
                  </button>
                </>
              ) : (
                <>
                  {volunteerStatus[event._id] == "Approved" ? (
                    <>
                      <button
                        className={`w-fit mt-2 px-4 py-2 bg-green-500 text-white rounded-lg cursor-not-allowed`}
                      >
                        Approved
                      </button>
                    </>
                  ) : (
                    <>
                      {volunteerStatus[event._id] == "Rejected" ? (
                        <>
                          <button
                            className={`w-fit mt-2 px-4 py-2 bg-red-500 text-white rounded-lg cursor-not-allowed`}
                          >
                            Rejected
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleShowInterest(event)}
                            className={`w-fit mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg`}
                          >
                            Show Interest in this Event
                          </button>
                        </>
                      )}
                    </>
                  )}
                </>
              )}

              {/* <button
                onClick={() => handleShowInterest(event)}
                className={`w-fit mt-2 px-4 py-2 text-white rounded-lg ${volunteerStatus[event._id] === 'Pending' ? 'bg-gray-600 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
                disabled={volunteerStatus[event._id] === 'pending'}
              >
                {volunteerStatus[event._id] === 'pending' ? 'pending' : 'Show Interest in this Event'}
              </button> */}
              {/* {volunteerStatus[event._id] && (
                <p className="text-left text-sm leading-6 text-gray-300 mt-2">Status: {volunteerStatus[event._id]}</p>
              )} */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="donateContainer">
      <div className="relative flex justify-end p-8 min-h-screen overflow-hidden">
        <div className="fixed left-0 top-30 flex flex-col p-16">
          <h1 className="text-3xl text-left text-white m-0 p-0">
            VOLUNTEERING
          </h1>
        </div>
        <div className="max-w-screen-lg justify-end w-full z-[1]">
          {loading ? (
            <div className="text-center py-16">
              <div
                className="spinner-border text-orange-500 mb-4"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
              <p>Loading events...</p>
            </div>
          ) : (
            <div className="p-6 mb-12 storyPart text-white rounded-lg shadow-lg">
              <h4 className="text-lg mb-3">
                If you're interested in volunteering for any of the upcoming
                events listed below, you can show your interest by clicking the{" "}
                <span className="text-blue-400">"Show Interest"</span> button.
                Your request will be reviewed by our admin team, and upon
                approval, you will have the opportunity to volunteer for the
                event.
              </h4>

              <h4 className="text-lg mb-3">
                As a token of appreciation for your time and effort, you'll earn{" "}
                <span className="text-green-400">20 points</span> after
                successfully completing the volunteering.
              </h4>

              <h4 className="text-lg mb-4">
                Don't miss out on this chance to contribute and earn rewards!
              </h4>

              {renderEvents(events)}
            </div>
          )}
          {selectedEvent && (
            <VolunteeringForm
              isOpen={Boolean(selectedEvent)}
              onClose={() => setSelectedEvent(null)}
              event={selectedEvent}
            />
          )}
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
}

export default Volunteering;
