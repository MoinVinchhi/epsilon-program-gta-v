import React, { useState, useEffect } from "react";
import { useAuth } from "../../creatContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useTheme } from "../../usetheamContext";
import Swal from "sweetalert2";
import pic from "../../assets/images/epsilon1.jpg";

function Donate() {
  const [auth, setAuth] = useAuth();
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [amount, setAmount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  const [showThankYou, setShowThankYou] = useState(false); // State for thank you message
  const navigate = useNavigate();
  const { theme } = useTheme();

  const url = import.meta.env.VITE_BACKEND_URL;

  const fetchData = async () => {
    if (auth.email) {
      try {
        const response = await fetch(
          `${url}/getalluser/${auth.email}`
        );

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchTotalDonations = async () => {
    try {
      const response = await fetch(`${url}/total-donations`);
      const data = await response.json();
      setTotalDonations(data.total);
    } catch (error) {
      console.error("Failed to fetch total donations:", error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTotalDonations();
  }, [auth.username]);

  useEffect(() => {
    if (auth.username) {
      setAuth({ ...auth, userPoints: userData.points });
    }
  }, [userData.points]);

  const handleDonate = async (donationAmount) => {
    if (donationAmount <= 0) {
      Swal.fire({
        title: "Error!",
        text: "Please enter a valid amount.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    setError(null);
    try {
      console.log(auth.email);

      const response = await fetch(
        `${url}/donate/${auth.email}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            points: auth.userPoints - donationAmount,
            addPoints: donationAmount,
          }),
        }
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      } else {
        const data = await response.json();
        setUserData(data.user);
        const newAuth = {
          ...auth,
          username: data.user.name,
          userPoints: data.user.points,
        };
        setAuth(newAuth);
        localStorage.setItem("auth", JSON.stringify(newAuth));
        localStorage.setItem("userData", JSON.stringify(data.user));

        await Swal.fire({
          title: "Thank You!",
          text: "Your donation was successful!",
          icon: "success",
          confirmButtonText: "OK",
        });

        setShowThankYou(true); // Show thank you message
        fetchTotalDonations();
      }
    } catch (error) {
      setError(error.message);
      await Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
      console.error(error);
    }
  };

  const handleButtonClick = (amount) => {
    setAmount(amount);
    setError(null);
  };

  const goHome = () => {
    navigate(`/`);
  };

  const bgColor =
    theme === "blue" ? "bg-blue-primary-bg" : "bg-dark-primary-bg";
  const textColor =
    theme === "blue" ? "text-blue-text-light" : "text-dark-text-light";
  const buttonColor =
    theme === "blue"
      ? "bg-green-600 hover:bg-green-800"
      : "bg-green-600 hover:bg-green-800";
  const overlayColor =
    theme === "blue"
      ? "bg-blue-light bg-opacity-50"
      : "bg-gray-900 bg-opacity-50";

  return (
    <div className="donateContainer">
      <div className="flex justify-end p-10 ml-[30vw] min-h-screen">
        <div className="fixed left-0 top-30 flex flex-col p-16">
          <h1 className="text-6xl text-left text-white m-0 p-0">DONATE</h1>
        </div>
        <div className={`donatePart relative ${bgColor} w-full`}>
          <div className={`relative bg-center `}>
            <div className={`absolute inset-0  bg-opacity-50`} />

            <div className="absolute inset-0 z-0">
              <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 1200 800"
                fill="none"
              >
                <circle
                  cx="800"
                  cy="500"
                  r="600"
                  fill="rgba(255, 165, 0, 0.1)"
                />
                <circle
                  cx="400"
                  cy="300"
                  r="400"
                  fill="rgba(255, 255, 255, 0.05)"
                />
              </svg>
            </div>
            <div className="relative z-10 p-6 md:p-12">
              <div className="flex justify-center">
                <img
                  className="w-[38%] h-[38%] max-w-full object-cover rounded-full shadow-md border-2 border-white "
                  src={pic}
                  alt="img"
                />
              </div>

              <div className="flex flex-center items-center justify-center">
                <motion.h1
                  className={``}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 4 }}
                  transition={{ duration: 4 }}
                >
                  <h1>Support the Epsilon Program</h1>
                </motion.h1>
              </div>

              <section
                className={`max-w-screen-lg mx-auto my-12 ${bgColor} p-8 rounded-lg shadow-lg relative border`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  {auth.isLoggedIn ? (
                    <>
                      <h2
                        className={`mt-5 font-semibold mb-6 text-center ${textColor}`}
                      >
                        Dear {auth.username}!
                      </h2>
                    </>
                  ) : (
                    <div className="mt-2 text-center mb-12">
                      <h2 className={`text-2xl font-bold mb-4`}>
                        Sign in to Donate
                      </h2>
                      <p className="text-gray-600">
                        Please sign in to donate and contribute to our
                        community.
                      </p>
                      <button
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mt-4"
                        onClick={() => {
                          navigate(`/Login`);
                        }}
                      >
                        Sign In
                      </button>
                    </div>
                  )}
                  {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                  )}
                  {showThankYou ? ( // Display thank you message if donation is successful
                    <div className={`text-lg mb-6 text-center ${textColor}`}>
                      <p className={`${textColor}`}>
                        {" "}
                        Thank you for your generous donation! Your support helps
                        us continue our mission.
                      </p>
                      <button
                        onClick={goHome}
                        className="mt-16 hover:text-gray-500 transition-all"
                      >
                        Go to home
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className={`mb-6 text-center  ${textColor}`}>
                        Your donation will help us level up our resources and
                        support our community.
                        <br />
                        "Support the Epsilon Program - Your donations help us
                        spread the truth and enlighten more souls."
                        <br />
                        Donation Levels:
                        <br />
                        • $50: "Seeker of Truth"
                        <br />
                        • $100: "Beacon of Enlightenment"
                        <br />• $500: "Ultimate Believer - Guaranteed
                        Enlightenment"
                      </p>

                      <div className="text-center mb-6">
                        <h3 className={`text-2xl font-semibold ${textColor}`}>
                          Total Accumulated Donations: ${totalDonations}
                        </h3>
                      </div>

                      {auth.isLoggedIn ? (
                        <>
                          <div className="flex flex-wrap justify-center -mx-4 mb-6">
                            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                              <motion.button
                                className={`text-white font-bold py-2 px-4 rounded shadow-md ${buttonColor}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleButtonClick(50)}
                              >
                                $50
                              </motion.button>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                              <motion.button
                                className={`text-white font-bold py-2 px-4 rounded shadow-md ${buttonColor}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleButtonClick(100)}
                              >
                                $100
                              </motion.button>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                              <motion.button
                                className={`text-white font-bold py-2 px-4 rounded shadow-md ${buttonColor}`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleButtonClick(500)}
                              >
                                $500
                              </motion.button>
                            </div>
                          </div>

                          <form
                            className={`max-w-md mx-auto p-4 pt-6 ${bgColor} rounded-lg shadow-md`}
                          >
                            <label className="block mb-4">
                              <h1 className={`text-2xl mb-4 ${textColor}`}>
                                Custom Donation Amount:
                              </h1>
                              <input
                                type="number"
                                className="w-full p-2 text-black border border-gray-600 rounded"
                                onChange={(e) => setAmount(e.target.value)}
                                value={amount}
                                id="donation-amount"
                              />
                            </label>
                            <motion.button
                              className={`text-white font-bold py-2 px-4 rounded shadow-md w-full ${buttonColor}`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={(e) => {
                                e.preventDefault();
                                handleDonate(amount);
                              }}
                            >
                              Donate Now
                            </motion.button>
                          </form>
                        </>
                      ) : (
                        <></>
                      )}
                    </>
                  )}
                </motion.div>
              </section>
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
    </div>
  );
}

export default Donate;
