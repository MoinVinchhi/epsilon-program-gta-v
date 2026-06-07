import React, { useState, useEffect, useRef } from "react";
import { data } from "./data";
import { useTheme } from "../../usetheamContext";
import { useNavigate } from "react-router-dom";
import "./quiz.css";
import { useAuth } from "../../creatContext";

function TermsAndConditions({ onAccept }) {
  const [accepted, setAccepted] = useState(false);

  const handleAcceptChange = (event) => {
    setAccepted(event.target.checked);
  };

  return (
    <div className="terms-and-conditions  p-6 rounded-lg shadow-lg ">
      <h1 className="font-bold mb-4">Terms and Conditions</h1>
      <p className="mb-4">
        Please read the terms and conditions carefully before taking the quiz.
      </p>
      <p>
        <ul className="list-disc list-inside mb-4">
          <li className="m-2">There will be a total of 10 questions.</li>
          <li className="mb-2">
            You can't undo the option and you can't go back to the previous
            question.
          </li>
          <li className="mb-2">
            If you select the correct option, it will turn green; if you select
            the wrong option, it will turn red, and the correct option will turn
            green.
          </li>
          <li className="mb-2">
            You can't go to the next question unless you attempt the current
            question.
          </li>
          <li className="mb-2">
            Points system: Your points will increase by the number of correct
            answers you give in the quiz.
          </li>
          <li className="mb-2">
            You can only take the quiz once every 24 hours.
          </li>
        </ul>
      </p>
      <label className="flex items-center mb-4">
        <input
          type="checkbox"
          checked={accepted}
          onChange={handleAcceptChange}
          className="mr-2 h-5 w-5"
        />
        <span className="">I accept the terms and conditions</span>
      </label>
      <button
        onClick={onAccept}
        disabled={!accepted}
        className={`px-5  py-4 rounded-lg ${accepted
            ? "bg-blue-500 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
      >
        Go to Quiz
      </button>
    </div>
  );
}

function Quiz() {
  const randomQuestions = React.useMemo(() => {
    const shuffledData = [...data].sort(() => Math.random() - 0.5);
    return shuffledData.slice(0, 10);
  }, []);

  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(randomQuestions[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [canTakeQuiz, setCanTakeQuiz] = useState(true);
  const [remainingTime, setRemainingTime] = useState(0);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const navigate = useNavigate();

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);

  const optionArray = [option1, option2, option3, option4];

  const [auth, setAuth, userData, setUserData] = useAuth();

  useEffect(() => {
    const updateRemainingTime = () => {
      const now = new Date().getTime();
      if (auth.lastAttempt) {
        const timeSinceLastAttempt = now - auth.lastAttempt;
        if (timeSinceLastAttempt < 24 * 60 * 60 * 1000) {
          setCanTakeQuiz(false);
          setRemainingTime(24 * 60 * 60 * 1000 - timeSinceLastAttempt);
        }
      }
    };

    const interval = setInterval(updateRemainingTime, 1000);
    updateRemainingTime();

    return () => clearInterval(interval);
  }, [auth.lastAttempt]);

  const checkAns = (e, ans) => {
    if (!lock) {
      const target = e.target;
      if (question.ans === ans) {
        target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        target.classList.add("wrong");
        optionArray[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === randomQuestions.length - 1) {
        setResult(true);
      } else {
        setIndex(index + 1);
        setQuestion(randomQuestions[index + 1]);
      }
      setLock(false);
      optionArray.forEach((option) => {
        option.current.classList.remove("correct", "wrong");
      });
    }
  };

  const url = import.meta.env.VITE_BACKEND_URL;

  const finishQuiz = async () => {
    try {
      const response = await fetch(`${url}/quizPoints`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: auth.username, addPoints: score }),
      });

      if (response.ok) {
        const updatedAuth = {
          ...auth,
          userPoints: auth.userPoints + score,
          lastAttempt: new Date().getTime(),
        };
        setAuth(updatedAuth);
        setUserData((prevData) => ({
          ...prevData,
          points: updatedAuth.userPoints,
        }));
        localStorage.setItem("auth", JSON.stringify(updatedAuth));
      } else {
        console.error("Error in quiz points");
      }
    } catch (error) {
      console.error("Error updating quiz points:", error);
    }
  };

  const { theme } = useTheme();

  // Define theme-based classes
  const containerBgColor =
    theme === "blue" ? "bg-blue-primary-bg" : "bg-dark-primary-bg";
  const sectionBgColor =
    theme === "blue" ? "bg-blue-secondary-bg" : "bg-dark-secondary-bg";
  const textPrimaryColor =
    theme === "blue" ? "text-blue-text-light" : "text-dark-text-light";
  const buttonHoverBgColor =
    theme === "blue" ? "hover:bg-blue-accent" : "hover:bg-dark-accent";

  const formatRemainingTime = (time) => {
    const hours = Math.floor(time / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  return (
    <div className="profileContainer ">
      <div className=" flex justify-center p-10 ml-[25vw] min-h-screen">
        <div className="fixed left-0 top-30 flex flex-col p-16">
          <h1 className="text-7xl text-left text-white m-0 p-0">QUIZ</h1>
        </div>
        <div
          className={`profilePart flex flex-col items-center justify-center `}
        >
          {auth.isLoggedIn ? (
            <div
              className={`${sectionBgColor} m-20  border w-full ${textPrimaryColor} border-blue-400 w-full  max-w mx-auto p-6 md:p-8 lg:p-10 rounded-xl py-10`}
            >
              {acceptedTerms ? (
                canTakeQuiz ? (
                  result ? (
                    <>
                      <h2 className="mt-10  md:text-xl lg:text-2xl">
                        You scored{" "}
                        <span className="font-semibold text-2xl">{score}</span>{" "}
                        out of {randomQuestions.length}
                      </h2>
                      <button
                        onClick={finishQuiz}
                        className={`bg-blue-200 block mx-auto w-28 md:w-32 lg:w-36 mt-8 p-2 rounded-lg ${buttonHoverBgColor} transition-all`}
                      >
                        Finish
                      </button>
                    </>
                  ) : (
                    <>
                      <h2 className="m-10 p-7 md:text-2xl lg:">
                        {index + 1}. {question.question}
                      </h2>

                      <ul className="m-10 flex flex-col gap-2 ">
                        <li
                          ref={option1}
                          onClick={(e) => checkAns(e, 1)}
                          className="border p-2 rounded-md ml-8 hover:cursor-pointer"
                        >
                          {question.option1}
                        </li>
                        <li
                          ref={option2}
                          onClick={(e) => checkAns(e, 2)}
                          className="border p-2 rounded-md ml-8 hover:cursor-pointer"
                        >
                          {question.option2}
                        </li>
                        <li
                          ref={option3}
                          onClick={(e) => checkAns(e, 3)}
                          className="border p-2 rounded-md ml-8 hover:cursor-pointer"
                        >
                          {question.option3}
                        </li>
                        <li
                          ref={option4}
                          onClick={(e) => checkAns(e, 4)}
                          className="border p-2 rounded-md ml-8 hover:cursor-pointer"
                        >
                          {question.option4}
                        </li>
                      </ul>
                      <button
                        onClick={next}
                        className={`block  mx-auto w-28 md:w-32 lg:w-36 mt-8 p-2 rounded-lg ${buttonHoverBgColor} transition-all`}
                      >
                        Next
                      </button>
                      <div className="mt-4  md:text-base">
                        {index + 1} of {randomQuestions.length} questions
                      </div>
                    </>
                  )
                ) : (
                  <div className="mt-10 text-lg md:text-xl lg:">
                    <h2>
                      You have already taken the quiz. Please come back after 24
                      hours.
                    </h2>
                    <p>Time remaining: {formatRemainingTime(remainingTime)}</p>
                    <button
                      onClick={() => setAcceptedTerms(false)}
                      className="mt-12 text-sm md:text-base lg:text-lg hover:font-bold transition-all flex items-center"
                    >
                      <svg
                        width="20" // Adjust the size as needed
                        height="20" // Adjust the size as needed
                        viewBox="0 0 512 512"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <polygon points="352,128.4 319.7,96 160,256 160,256 160,256 319.7,416 352,383.6 224.7,256" />
                      </svg>
                      Back to Terms
                    </button>
                  </div>
                )
              ) : (
                <TermsAndConditions onAccept={() => setAcceptedTerms(true)} />
              )}
            </div>
          ) : (
            <div className="mt-2 text-center mb-12 px-4">
              <h2 className="text-2xl md: font-bold mb-4">
                Sign in to continue
              </h2>
              <p className="text-gray-600 mb-4">
                Please sign in to continue to quiz and contribute to our
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

export default Quiz;
