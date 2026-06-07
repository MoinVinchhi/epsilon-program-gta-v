import React, { useEffect } from 'react';
import { useAuth } from '../../creatContext';
import { useNavigate, Link } from 'react-router-dom';
import { useTheme } from '../../usetheamContext';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa'; // Import icons

function MembershipPage() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const { theme } = useTheme();

  useEffect(() => {
    const storedAuth = localStorage.getItem('auth');
    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, [setAuth]);

  // Define theme-based classes
  const containerBgColor = theme === 'blue' ? 'bg-blue-800' : 'bg-gray-800'; // Adjusted background colors
  const textPrimary = theme === 'blue' ? 'text-blue-200' : 'text-gray-200'; // Adjusted text colors
  const textSecondary = theme === 'blue' ? 'text-blue-300' : 'text-gray-300';
  const highlight = theme === 'blue' ? 'text-blue-400' : 'text-gray-400'; // Adjusted highlight color
  const overlay = theme === 'blue' ? 'bg-blue-900 bg-opacity-70' : 'bg-gray-900 bg-opacity-70'; // Adjusted overlay color
  const buttonBgColorBasic = theme === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700';
  // const buttonBgColorPremium = theme === 'blue' ? 'bg-blue-700 hover:bg-blue-800' : 'bg-gray-700 hover:bg-gray-800';
  // const buttonBgColorElite = theme === 'blue' ? 'bg-blue-800 hover:bg-blue-900' : 'bg-gray-800 hover:bg-gray-900';

  return (
    <div className={`mx-auto px-4 py-8 md:px-8 md:py-7 lg:px-12 lg:py-16 ${overlay}`}>
      <div className="text-center mb-12">
        {auth.isLoggedIn ? (
          <>
            <h1 className={`text-4xl font-bold mb-4 text-white transition-transform duration-500 ease-in-out transform hover:scale-105`}>
              Join the Epsilon Program
            </h1>
            <h2 className={`text-3xl font-semibold mb-4 ${textSecondary}`}>
              Welcome, {auth.username ? auth.username : ''}
            </h2>
            <p className={`${textSecondary} shadow-md`}>
              Choose your membership level and start your journey to happiness and freedom from thoughts!
            </p>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-4 text-white">Join the Epsilon Program</h1>
            <h2 className="text-3xl font-semibold mb-4">Become a Member</h2>
            <p className="text-white">
              Please sign in to access membership options and start your journey to happiness and freedom from thoughts!
            </p>
            <button
              className="mb-12 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg mt-4 transition-transform duration-300 ease-in-out transform hover:scale-105"
              onClick={() => navigate(`/Login`)}
            >
              Sign In
            </button>
          </>
        )}
      </div>

      <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-8 md:gap-10 lg:gap-12 mb-12">
        {/* Basic Membership */}
        <div className={`${containerBgColor} ${textPrimary} bg-opacity-80 p-6 md:p-8 lg:p-10 shadow-xl rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out w-full md:w-1/3 lg:w-1/4 hover:shadow-blue-700`}>
          <h3 className={`font-semibold text-center mb-4 ${textPrimary}`}>Epsilon Enthusiast</h3>
          <div className="flex items-center justify-center mb-4">
            <h2 className={`text-4xl font-bold ${highlight}`}>$10</h2>
            <span className="ml-2 text-white">per month</span>
          </div>
          <p className={`font-semibold mb-4 ${highlight}`}>Entry-level membership</p>
          <ul className={`list-disc list-inside mb-4 ${textSecondary}`}>
            <li><FaCheckCircle className="inline text-green-400" /> Basic access to Epsilon Program resources.</li>
            <li><FaCheckCircle className="inline text-green-400" /> Access to online forums and community discussions.</li>
            <li><FaCheckCircle className="inline text-green-400" /> Subscription to Epsilon Program newsletter.</li>
            <li><FaTimesCircle className="inline text-red-500" /> Limited access to events (e.g., online webinars).</li>
          </ul>
          <Link to={`/MembershipLayout/${1}`}>
            <button
              disabled={!auth.isLoggedIn}
              className={`w-full py-2 px-4 text-white rounded-lg ${buttonBgColorBasic} ${auth.isLoggedIn ? 'focus:ring-4 focus:ring-blue-300' : 'text-gray-500 cursor-not-allowed'} transition-transform duration-300 ease-in-out transform hover:scale-105`}
            >
              Read More Basic
            </button>
          </Link>
        </div>

        {/* Premium Membership */}
        <div className={`${containerBgColor} ${textPrimary} bg-opacity-80 p-6 md:p-8 lg:p-10 shadow-xl rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out w-full md:w-1/3 lg:w-1/4 hover:shadow-blue-700`}>
          <h3 className={`font-semibold text-center mb-4 ${textPrimary}`}>Epsilon Evangelist</h3>
          <div className="flex items-center justify-center mb-4">
            <h2 className={`text-4xl font-bold ${highlight}`}>$20</h2>
            <span className="ml-2 text-white">per month</span>
          </div>
          <p className={`font-semibold mb-4 ${highlight}`}>Epsilon Visionary</p>
          <ul className={`list-disc list-inside mb-4 ${textSecondary}`}>
            <li><FaCheckCircle className="inline text-green-400" /> Full access to Epsilon Program resources.</li>
            <li><FaCheckCircle className="inline text-green-400" /> Discounts on events and merchandise.</li>
            <li><FaCheckCircle className="inline text-green-400" /> Personalized coaching sessions with Epsilon Program leaders.</li>
            <li><FaCheckCircle className="inline text-green-400" /> Exclusive access to Epsilon Program's inner circle (e.g., private Facebook group).</li>
          </ul>
          <Link to={`/MembershipLayout/${2}`}>
            <button
              disabled={!auth.isLoggedIn}
              className={`w-full py-2 px-4 text-white rounded-lg ${buttonBgColorBasic} ${auth.isLoggedIn ? 'focus:ring-4 focus:ring-blue-300' : 'text-gray-500 cursor-not-allowed'} transition-transform duration-300 ease-in-out transform hover:scale-105`}
            >
              Read More Premium
            </button>
          </Link>
        </div>

        {/* Elite Membership */}
        <div className={`${containerBgColor} ${textPrimary} bg-opacity-80 p-6 md:p-8 lg:p-10 shadow-xl rounded-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 ease-in-out w-full md:w-1/3 lg:w-1/4 hover:shadow-blue-700`}>
          <h3 className={`font-semibold text-center mb-4 ${textPrimary}`}>Elite Membership</h3>
          <div className="flex items-center justify-center mb-4">
            <h2 className={`text-4xl font-bold ${highlight}`}>$30</h2>
            <span className="ml-2 text-white">per month</span>
          </div>
          <p className={`font-semibold mb-4 ${highlight}`}>Elite membership</p>
          <ul className={`list-disc list-inside mb-4 ${textSecondary}`}>
            <li><FaCheckCircle className="inline text-green-400" /> Subscription to Epsilon Program newsletter.</li>
            <li><FaCheckCircle className="inline text-green-400" /> Personalized spiritual guidance and mentorship.</li>
            <li><FaCheckCircle className="inline text-green-400" /> Invitation to an annual retreat at a secluded location.</li>
            <li><FaCheckCircle className="inline text-green-400" /> VIP access to exclusive events (e.g., private meetings with Epsilon Program leaders).</li>
          </ul>
          <Link to={`/MembershipLayout/${3}`}>
            <button
              disabled={!auth.isLoggedIn}
              className={`w-full py-2 px-4 text-white rounded-lg ${buttonBgColorBasic} ${auth.isLoggedIn ? 'focus:ring-4 focus:ring-blue-300' : 'text-gray-500 cursor-not-allowed'} transition-transform duration-300 ease-in-out transform hover:scale-105`}
            >
              Read More Elite
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MembershipPage;
