// src/components/InquiryForm.js
import React, { useState, useContext } from "react";
import { useAuth } from "../../creatContext";
import { useTheme } from "../../usetheamContext";
import Swal from "sweetalert2";

const InquiryForm = () => {
  const [auth, setAuth] = useAuth();
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: auth.username,
          email: auth.email,
          message,
        }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      await Swal.fire({
        title: "Thank You!",
        text: "Your Inquiry has been send successful! Thank you for connecting with the Epsilon Program.",
        icon: "success",
        confirmButtonText: "OK",
      });

      // setSuccessMessage('Your inquiry has been sent successfully!');
      setMessage("");
    } catch (error) {
      await Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerBgColor =
    theme === "blue" ? "bg-blue-primary-bg" : "bg-dark-primary-bg";
  const sectionBgColor =
    theme === "blue" ? "bg-blue-secondary-bg" : "bg-dark-secondary-bg";
  const textPrimaryColor =
    theme === "blue" ? "text-blue-text-light" : "text-dark-text-light";
  const buttonHoverBgColor =
    theme === "blue" ? "hover:bg-blue-accent" : "hover:bg-dark-accent";
  const overlayColor =
    theme === "blue"
      ? "bg-blue-light bg-opacity-50"
      : "bg-gray-900 bg-opacity-50";
  const shade =
    theme === "blue" ? "bg-white bg-opacity-50" : "bg-blue- bg-opacity-50";

  return (
    <div className="flex justify-end p-10 ml-[30vw] min-h-screen">
      <div className="fixed left-0 top-30 flex flex-col p-16">
        <h1 className="text-5xl text-left text-white m-0 p-0">INQUIRY</h1>
        <h1 className="text-7xl text-left text-white m-0 p-0">FORM</h1>
      </div>
      <div
        className={`mx-auto  text-white rounded-lg shadow-lg ${containerBgColor} ${overlayColor} w-full`}
      >
        {auth.isLoggedIn ? (
          <>
            <div className={``}>
              <div
                className={` mt-10 max-h-screen  mx-auto p-10 rounded-xl py-10 mb-10 `}
              >
                <div className="flex flex-row">
                  <h1>Your problem our soultion</h1>
                  <img
                    className="w-[55%] h-auto max-w-full object-cover rounded-full shadow-md border-2 "
                    src="https://static1.srcdn.com/wordpress/wp-content/uploads/2020/03/GTA-Red-Dead-Redemption-2-Time-Travel.jpg"
                    alt="img"
                  />
                </div>
                <p className="pt-6">
                  At the Epsilon Program, we cherish the quest for wisdom and
                  truth. If you have any questions or need further guidance,
                  please don’t hesitate to reach out to us. Our dedicated team
                  is here to assist you and provide the support you need on your
                  journey.
                </p>
                <p>
                  Feel free to reach out with any questions or concerns, and we
                  will respond to you promptly via your email address.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-3xl font-medium mb-6"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-[50%] p-4 border border-gray-500 rounded-md bg-gray-900 text-white"
                      rows="4"
                      required
                    ></textarea>
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                  {successMessage && (
                    <p className="text-green-500 mt-2">{successMessage}</p>
                  )}
                  {errorMessage && (
                    <p className="text-red-500 mt-2">{errorMessage}</p>
                  )}
                </form>
              </div>
            </div>
          </>
        ) : (
          <div className="m-6 text-center mb-12">
            <h2 className={`text-2xl font-bold mb-4 p-6`}>
              Sign in to continue
            </h2>
            <p className="text-gray-600">
              Please sign in to inquiry and contribute to our community.
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg m-4"
              onClick={() => {
                navigate(`/Login`);
              }}
            >
              Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InquiryForm;
