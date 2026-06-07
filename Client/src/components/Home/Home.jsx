import React, { useState, useEffect } from "react";
import { ReactTyped } from "react-typed";
import axios from "axios";
import moment from "moment";
import "./Home.css";
import ReactGA from "react-ga4";

function Home() {
  const [events, setEvents] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  ReactGA.send({
    hitType: "pageview",
    page: "/",
    title: "Home",
  });

  axios.defaults.withCredentials = true;

  const upcomingEvents = events.slice(0, 3);
  const lastFiveStories = stories.slice(0, 5);

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:5000/api/events")
      .then((response) => {
        const today = moment().startOf("day");
        const upcomingEventsList = response.data.filter((event) =>
          moment(event.date).isAfter(today)
        );
        const sortedEvents = upcomingEventsList.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setEvents(sortedEvents);
      })
      .catch((error) => console.error(error));

    axios
      .get("http://localhost:5000/stories")
      .then((response) => {
        const sortedStories = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setStories(sortedStories || []);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (upcomingEvents.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [upcomingEvents.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const prevSlide = () => {
    if (upcomingEvents.length === 0) return;
    setCurrentSlide((prev) =>
      prev === 0 ? upcomingEvents.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    if (upcomingEvents.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % upcomingEvents.length);
  };

  return (
    <div className="overflow-hidden">
      <div className="textContainer h-[710px] flex items-center justify-center relative">
        <div className="reactText bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500 bg-opacity-30 backdrop-filter backdrop-blur-2xl p-4 rounded-lg shadow-lg w-auto">
          <ReactTyped
            className="md:text-3xl font-bold md:py-6 text-white text-center"
            strings={[
              "Welcome to the Epsilon Program!",
              "Discover cosmic truths and transcend the ordinary.",
              "Join our journey to spiritual enlightenment.",
              "Explore our beliefs and embrace inner peace.",
              "Become a member today and start your transformation!",
            ]}
            typeSpeed={120}
            backSpeed={180}
            loop
          />
        </div>

        {/* vertical */}
        <div className="grids absolute top-0 w-screen h-screen opacity-5 flex">
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
        <div className="grids absolute top-0 w-screen h-screen opacity-5 flex flex-col">
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

      {/* Three Events Section */}
      <div className="eventsContainer relative h-[70vh] m-auto">
        <h2 className="text-white text-4xl font-extrabold mb-6 p-4 text-center">
          Events
        </h2>
        {loading ? (
          <p>Loading events...</p>
        ) : (
          <div
            id="default-carousel"
            className="eventsPage p-4 relative max-w-screen-xl m-auto"
            data-carousel="slide"
          >
            <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
              <div
                className="flex transition-transform ease-in-out duration-500"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-60 object-cover mb-2"
                    />
                    <h3 className="text-xl font-bold">{event.title}</h3>
                    <p>{moment(event.date).format("DD MMMM YYYY")}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
              {upcomingEvents.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-3 h-3 rounded-full ${index === currentSlide ? "bg-blue-950" : "bg-white"
                    }`}
                  aria-current={index === currentSlide}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => goToSlide(index)}
                ></button>
              ))}
            </div>

            <button
              type="button"
              className="eventsButton absolute top-0 -start-20 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent"
              onClick={prevSlide}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 ">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="eventsButton absolute top-0 -end-20 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none bg-transparent focus:bg-transparent active:bg-transparent hover:bg-transparent"
              onClick={nextSlide}
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>
        )}

        {/* vertical */}
        <div className="absolute top-0 w-screen h-screen opacity-5 flex">
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
        <div className="absolute top-0 w-screen h-screen opacity-5 flex flex-col">
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

      {/* Latest Stories */}
      <div className="storiesContainer relative pb-8">
        <h2 className="text-white text-4xl font-extrabold mb-6 p-4 text-center">
          Latest Stories
        </h2>
        {loading ? (
          <p>Loading stories...</p>
        ) : (
          <div className="relative flex flex-wrap justify-center gap-8 max-w-screen-xl m-auto">
            {lastFiveStories.map((story, index) => (
              <div
                key={story._id}
                className={`stories rounded-none text-white relative w-96 p-4 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300`}
              >
                <img
                  src={story.image}
                  alt={story.username}
                  className="h-14 w-14 rounded-full"
                />
                <p className="text-white mb-2 w-50">{story.story}</p>
                <p className="text-lg mb-2 text-white text-right">
                  -{story.username}
                </p>
                <p className="text-white text-sm italic text-right">
                  {moment(story.date).fromNow()}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* vertical */}
        <div className="absolute top-0 w-screen  opacity-5 flex">
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
        <div className="absolute top-0 w-screen  opacity-5 flex flex-col">
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
    </div>
  );
}

export default Home;
