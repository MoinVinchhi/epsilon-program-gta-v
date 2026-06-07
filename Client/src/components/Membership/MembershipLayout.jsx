import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../creatContext";
import { useTheme } from "../../usetheamContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./layout.css";
import axios from "axios";
import Swal from "sweetalert2";

const MembershipDetails = ({ title, description, benefits }) => (
  <div>
    <h2 className="font-bold mb-2">{title}</h2>
    <p className="mb-4">{description}</p>
    <p className={`text-3xl `}>
      <ul className="pl-5 mb-4">
        {benefits.map((benefit, index) => (
          <li key={index} className="">
            {benefit}
          </li>
        ))}
      </ul>
    </p>
  </div>
);

const MembershipLayout = () => {
  const [auth, setAuth] = useAuth();
  const [userData, setUserData] = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const url = import.meta.env.VITE_BACKEND_URL;

  const updatePoints = async (pointsToUpdate, membership_id) => {
    try {
      // Show a confirmation alert before proceeding
      const result = await Swal.fire({
        title: "Are you sure?",
        text: `Your coins will be reduced by ${pointsToUpdate}. Do you want to proceed?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, proceed",
        cancelButtonText: "Cancel",
        reverseButtons: true,
      });

      // Check if the user confirmed the action
      if (result.isConfirmed) {
        const response = await fetch(
          `${url}/updateuser/${auth.email}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              points: userData.userPoints,
              addPoints: pointsToUpdate,
              membership_id: membership_id,
            }),
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error);
        } else {
          const data = await response.json();
          setUserData({ ...data.username, membership_id: membership_id });
          setAuth({
            ...auth,
            username: data.user.name,
            userPoints: data.user.points,
            membership_id: membership_id,
          });

          localStorage.setItem("auth", JSON.stringify(auth));
          localStorage.setItem("userData", JSON.stringify(data.user));
          localStorage.setItem(auth.username, membership_id); // Store membership status

          await Swal.fire({
            title: "Success!",
            text: "Membership updated successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });

          navigate(`/epsilon_program_membership/${membership_id}`);
        }
      }
    } catch (error) {
      setError(error.message);
      await Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const { membership_id } = useParams();

  let membershipDetails = {
    title: "Invalid Membership ID",
    description:
      "Sorry, we couldn’t find a membership with that ID. Please check your membership ID and try again.",
    benefits: [],
  };

  if (membership_id === "1") {
    membershipDetails = {
      title: "Epsilon Enthusiast",
      description: `Embark on your Epsilon journey with our Basic membership! As an Epsilon Enthusiast, you'll unlock a world of exclusive content and perks designed to elevate your experience. This tier is perfect for those new to the Epsilon Program, offering a gateway to a vibrant community of like-minded individuals.`,
      benefits: [
        "📚 **Exclusive Content**: Access tutorials, webinars, and articles only available to members.",
        "💸 **Discounts**: Enjoy special discounts on our premium products and services.",
        "🚀 **Priority Support**: Receive enhanced support from our dedicated customer service team.",
        "🌐 **Community Access**: Connect with fellow enthusiasts through exclusive forums and events.",
      ],
      up: 10,
    };
  } else if (membership_id === "2") {
    membershipDetails = {
      title: "Epsilon Evangelist",
      description: `Take your Epsilon experience to the next level with the Premium membership! The Epsilon Evangelist tier builds on the Basic membership, offering additional perks and personalized support. Perfect for those seeking a deeper connection with the program and more tailored guidance.`,
      benefits: [
        "🔑 All Basic Benefits: Continue enjoying all the perks of the Epsilon Enthusiast membership.",
        "🎓 Personalized Coaching: Get one-on-one guidance from experts tailored to your goals.",
        "📖 Premium Content: Access an exclusive library of advanced resources and materials.",
        "🌟 Enhanced Support: Receive priority support with personalized attention.",
        "🎟️ Special Events: Invitations to exclusive events and webinars with industry leaders.",
      ],
      up: 20,
    };
  } else if (membership_id === "3") {
    membershipDetails = {
      title: "Epsilon Visionary",
      description: `Join the elite ranks of the Epsilon community with our top-tier membership! The Epsilon Visionary tier provides unparalleled access and exclusivity, including VIP events and personalized consulting. Ideal for those fully committed to maximizing their Epsilon experience.`,
      benefits: [
        "🏆 All Premium Benefits**: Enjoy all the perks of the Epsilon Evangelist membership.",
        "🎉 VIP Events: Receive exclusive invitations to high-profile events and networking opportunities.",
        "🤝 Personalized Consulting: Benefit from tailored consulting services to achieve your goals.",
        "📊 Dedicated Account Manager: Get personalized support from a dedicated account manager.",
        "🌟 Recognition: Be acknowledged as a top supporter within the Epsilon community.",
      ],
      up: 30,
    };
  }

  const { theme } = useTheme();
  const textPrimary =
    theme === "blue" ? "text-blue-text-light" : "text-dark-text-light";
  const textSecondary =
    theme === "blue" ? "text-blue-text-blue" : "text-dark-text-blue";
  const Hightlight =
    theme === "blue" ? "text-blue-text-dark" : "text-dark-text-dark";
  return (
    <div id="card_container" className="relative mx-auto max-w-3xl p-4 mt-20">
      <div
        id="card"
        className="relative bg-cover bg-center text-white p-6 rounded-lg shadow-lg"
      >
        <div className="shine absolute inset-0"></div>
        <div className="text-block relative z-10">
          {error && (
            <div className="text-red-600 text-center mb-4">
              <p>{error}</p>
            </div>
          )}
          <h1 className="font-bold uppercase mb-2">
            Membership Details{" "}
            <small className="text-gray-300 text-sm">What you can get?</small>
          </h1>
          <h3 className="font-bold mb-4">Goals | Mission</h3>
          {/* <p className="mb-4">
          Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.
        </p> */}
          <MembershipDetails {...membershipDetails} />
          <div>
            <button
              onClick={() => updatePoints(membershipDetails.up, membership_id)}
              className="bg-transparent border-4  border-white text-white py-2 px-4 rounded hover:bg-blue-800"
            >
              Get Membership
            </button>
          </div>
          {auth.userPoints && (
            <p className="mt-4 text-gray-300">Your Points: {auth.userPoints}</p>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MembershipLayout;
