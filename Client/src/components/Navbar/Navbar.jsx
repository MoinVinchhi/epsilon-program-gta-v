import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaRegUser, FaSun, FaMoon, FaBars, FaTimes ,FaCaretDown} from 'react-icons/fa';
import { useAuth } from '../../creatContext';
import { useTheme } from '../../usetheamContext';
import './Navbar.css';
import Swal from 'sweetalert2';
import logo from '../../assets/images/character_ep.jpg'
import { MdOutlineQuiz } from "react-icons/md";
import { GiNewspaper } from "react-icons/gi";
import { FaPersonCircleQuestion } from "react-icons/fa6";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FcDonate } from "react-icons/fc";
import mem from '../../assets/images/member-card.png'
import event from '../../assets/images/event.png'
import story from '../../assets/images/stories.png'
import profile from '../../assets/images/profile.png'
import { FcHome } from "react-icons/fc";
import { MdQuiz } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { HiCurrencyDollar } from "react-icons/hi2";
import { FaUserCircle } from 'react-icons/fa'; 



const Navbar = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  useEffect(() => {
    // console.log('Auth state:', auth);
  }, [auth]);

  const handleDropdownClose = () => {
    setIsDropdownOpen(false);
  };

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the logout action
        setAuth({ user: null, token: '', isLoggedIn: false });
        localStorage.removeItem('auth');
        navigate('/login', { replace: true });
  
        Swal.fire(
          'Logged Out!',
          'You have been logged out.',
          'success'
        );
      }
    });
  };
  
  const headerClass = `sticky h-18 top-0 z-50 p-4 pb-0 pt-16 flex justify-between items-center ${
    theme === 'blue' ? 'bg-blue-primary-bg text-blue-text-light' : 'bg-dark-primary-bg text-dark-text-light'
  }`;

  const buttonClass = `px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 ${
    theme === 'blue'
      ? 'bg-blue-highlight hover:bg-blue-highlight-dark text-white'
      : 'bg-dark-highlight hover:bg-dark-highlight-dark text-white'
  } transition duration-300 ease-in-out`;

  return (
    <header className={headerClass}>
      {/* Logo */}
      
      {/* <a href="/" className="text-lg font-bold truncate relative left-4 bottom-5">Logo</a> */}
      <Link onClick={handleDropdownClose} to="/">
        <img
          src="https://prod.cloud.rockstargames.com/crews/sc/9275/12545759/publish/emblem/emblem_512.png"
          alt="Profile"
          className="w-12 h-12 border-white text-lg font-bold truncate relative left-4 bottom-8"
        />
      </Link>

      {/* Mobile Menu Toggle Button */}
      <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`md:hidden ${buttonClass}`} aria-label="Toggle Menu">
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile Menu */}
      <nav className={`md:hidden fixed inset-0 bg-white dark:bg-gray-800 p-5 ${isMobileMenuOpen ? 'block' : 'hidden'} flex flex-col items-center`}>
        <div className="flex justify-between items-center mb-4 w-full">
          <div className='flex'>
            <div className='ml-12 mt-2 flex'>
              <HiCurrencyDollar size="1.5em"  />
              <span className="ml-2 truncate">
                {auth.points !== undefined && auth.points !== null 
                  ? auth.points.toFixed(2) 
                  : '0.00'}
              </span>
            </div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className={buttonClass} aria-label="Close Menu">
            <FaTimes />
          </button>
        </div>
        <ul className="flex flex-col space-y-4 w-full">
          <li>
            <Link to="/" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          </li>
          {auth.isAdmin ? (
            <>
              <li>
                <Link to='/events' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Events</Link>
              </li>
              <li>
                <Link to='/admin' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Donation Users</Link>
              </li>
              <li>
                <Link to='/allusers' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Show Users</Link>
              </li>
              <li>
                <Link to='/allinquires' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>All Inquires</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'} className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Membership</Link>
              </li>
              <li>
                <Link to="/Blog" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Blog</Link>
              </li>
              <li>
                <Link to="/storyPage" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Stories</Link>
              </li>
              <li>
                <Link to="/Donate" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Donate</Link>
              </li>
              <li>
                <Link to="/Volunteering" className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Donate</Link>
              </li>
              <li>
                <Link to='/Quiz' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Quiz</Link>
              </li>
              <li>
                <Link to='/epsilonMap' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>EpsilonMap</Link>
              </li>
              <li>
                <Link to='/About' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
              </li>
              <li>
                <Link to='/inquiryForm' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>Inquiry Form</Link>
              </li>
              <li>
                <Link to='/News' className="block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 truncate" onClick={() => setIsMobileMenuOpen(false)}>News</Link>
              </li>
            </>
          )}
        </ul>
        {auth.isLoggedIn ? (
          <button onClick={handleLogout} className={`mt-4 ${buttonClass}`}>
            Logout
          </button>
        ) : (
          <div className="mt-4 flex flex-col space-y-2">
            <Link to="/login" className={buttonClass}>
              Log in
            </Link>
            <Link to="/signup" className={buttonClass}>
              Get started
            </Link>
          </div>
        )}
      </nav>

      {/* Desktop Menu */}
      <nav className="hidden relative bottom-8 text-[17px] md:flex items-center space-x-5 flex-wrap  flex-center justify-between">
        {/* {auth.isLoggedIn && ( */}
          {/* <div className="flex  space-x-2 hover:no-underline">
            <FaRegUser size="1.5em" />
            <span className="ml-2 truncate">{auth.username}</span>
          </div> */}
        {/* )} */}
        {auth.isLoggedIn && (
          <div onClick={handleDropdownClose} className="flex items-center space-x-2 hover:no-underline">
            <HiCurrencyDollar size="1.5em" />
            <span className="ml-2 truncate">
            {auth.isAdmin ? 
                (auth.points !== undefined && auth.points !== null 
                  ? auth.points.toFixed(2) 
                  : '0.00') 
                : (auth.userPoints !== undefined && auth.userPoints !== null 
                  ? auth.userPoints.toFixed(2) 
                  : '0.00')}
               
              </span>
          </div>
        )}
        <ul className="flex flex-center items-center justify-between space-x-7">
          <li onClick={handleDropdownClose} className="flex items-center space-x-1">
            <FcHome className='text-[20px]'/>
            <Link to="/" className={`hover:text-blue-300 transition-all duration-300 hover:no-underline ${window.location.pathname === '/' ? 'font-bold text-blue-500 dark:text-blue-300 border-b border-blue-300 pb-1' : ''}`}>Home</Link>
          </li>
          {auth.isAdmin ? (
            <>
              <li className="flex items-center space-x-1 ">
              <img src={event} alt="img" className="w-6 h-6" />

             <Link to='/events' className={`hover:no-underline ${window.location.pathname === '/events' ? 'font-bold text-blue-500 dark:text-blue-300 border-b border-blue-300 pb-1' : ''}`}>Events</Link>
              </li>
              <li className="flex items-center space-x-1 ">
                <Link to='/admin' className={`hover:no-underline ${window.location.pathname === '/admin' ? 'font-bold text-blue-500 dark:text-blue-300 border-b border-blue-300 pb-1' : ''}`}>Donation Users</Link>
              </li>
              <li className="flex items-center space-x-1 ">

                <Link to='/allusers' className={`hover:no-underline ${window.location.pathname === '/allusers' ? 'font-bold text-blue-500 dark:text-blue-300 border-b border-blue-300 pb-1' : ''}`}>Show Users</Link>
              </li>
              <li className="flex items-center space-x-1 ">

                <Link to='/VolunteeringRequests' className={`hover:no-underline ${window.location.pathname === '/VolunteeringRequests' ? 'font-bold text-blue-500 dark:text-blue-300 border-b border-blue-300 pb-1 ' : ''}`}>Volunteer Requests</Link>
              </li>
              <li className="flex items-center space-x-1 ">

                <Link to='/allinquires' className={`hover:no-underline ${window.location.pathname === '/allinquires' ? 'font-bold text-blue-500 dark:text-blue-300 border-b border-blue-300 pb-1' : ''}`}>All Inquires</Link>
              </li>
              
              <li className="flex items-center space-x-1 ">
              <GiNewspaper/>
                <Link to='/AddNews' className={`hover:no-underline ${window.location.pathname === '/allinquires' ? 'font-bold text-blue-500 dark:text-blue-300 border-b border-blue-300 pb-1' : ''}`}>Add News</Link>
              </li>
            </>
          ) : (
            <>
              {/* <li className="flex items-center space-x-2 ">
              <img src={profile} alt="img" className="w-6 h-6" />
               <Link to="/Profile" className={`hover:no-underline ${window.location.pathname === '/Profile' ? 'font-bold text-blue-500 dark:text-blue-300' : ''}`}>Profile</Link>
              </li> */}
              <div onClick={handleDropdownClose} className='flex gap-6'>

              <li className="flex items-center space-x-2 ">
              <img src={mem} alt="membership" className="w-5 h-5" />
              <Link to={auth.membership_id ? `/epsilon_program_membership/${auth.membership_id}` : '/membership'} className={`hover:no-underline hover:text-blue-300 transition-all duration-300  ${window.location.pathname.includes('/epsilon_program_membership') || window.location.pathname === '/membership' ? 'font-bold text-blue-500 dark:text-blue-300 border-b border-blue-300 pb-1' : ''}`}>Membership</Link>
              </li>

              <li className="flex items-center space-x-2 ">
              <img src={event} alt="img" className="w-5 h-5" />
              <Link to="/Blog" className={`hover:text-blue-300 transition-all duration-300 hover:no-underline ${window.location.pathname === '/Blog' ? 'font-bold text-blue-500 dark:text-blue-300 border-b border-blue-300 pb-1' : ''}`}>Blog</Link>
              </li>

              <li className="flex items-center space-x-2 ">
              <img src={story} alt="img" className="w-5 h-5" />
              <Link to="/storyPage" className={`hover:text-blue-300 transition-all duration-300 hover:no-underline ${window.location.pathname === '/storyPage' ? 'font-bold text-blue-500 dark:text-blue-300 border-b border-blue-300 pb-1' : ''}`}>Stories</Link>
              </li>


              <li className="flex items-center space-x-2 ">
                <FcDonate className='text-[20px]'/>
              <Link to="/Donate" className={`hover:text-blue-300 transition-all duration-300 hover:no-underline ${window.location.pathname === '/Donate' ? 'font-bold text-blue-500 dark:text-blue-300 border-b border-blue-300 pb-1' : ''}`}>Donate</Link>
              </li>

              <li className="flex items-center space-x-2 p-2">
              <Link to="/Volunteering" className={`hover:text-blue-300 transition-all duration-300 hover:no-underline ${window.location.pathname === '/Volunteering' ? 'font-bold text-blue-500 dark:text-blue-300 border-b border-blue-300 pb-1' : ''}`}>Volunteering</Link>
              </li>
            </div>

              
          {/* Dropdown menu */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`relative inline-block p-0 ${isDropdownOpen ? ' dark:text-blue-300' : ''}`}
            >
              More <FaCaretDown className="inline ml-2" />
            </button>
            {isDropdownOpen && (
              <ul className="absolute mt-2 right-0 pl-2 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-48 z-[100]" >

                <li className="flex items-center space-x-2 p-2">
                  <MdQuiz />
                  <Link to='/Quiz' className={`hover:no-underline px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${window.location.pathname === '/Quiz' ? 'font-bold text-blue-500 dark:text-blue-300' : ''} transition-all duration-200 hover:rounded-lg`}
                  onClick={handleDropdownClose}
                  >Quiz</Link>
                </li>

                <li className="flex items-center space-x-2 p-2">
                <FaMapMarkedAlt className=''/>
                  <Link
                    to="/epsilonMap"
                    className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/epsilonMap' ? 'font-bold text-blue-500 dark:text-blue-300' : ''} transition-all duration-200 hover:rounded-lg`}
                    onClick={handleDropdownClose}
                  >
                    EpsilonMap
                  </Link>
                </li>

                <li className="flex items-center space-x-2 p-2 ">
                <FaCircleInfo />
                <Link
                    to="/About"
                    className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/About' ? 'font-bold text-blue-500 dark:text-blue-300' : ''} transition-all duration-200 hover:rounded-lg`}
                    onClick={handleDropdownClose}
                  >
                    About
                  </Link>
                </li>

                <li className="flex items-center space-x-2 p-3">
                <FaPersonCircleQuestion />
                  <Link
                    to="/inquiryForm"
                    className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/inquiryForm' ? 'font-bold text-blue-500 dark:text-blue-300' : ''} transition-all duration-200 hover:rounded-lg`}
                    onClick={handleDropdownClose}
                  >
                    Inquiry Form
                  </Link>
                </li>

                <li className="flex items-center space-x-2 p-2">
                  <GiNewspaper/>
                  <Link
                    to="/News"
                    className={`block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 ${location.pathname === '/News' ? 'font-bold text-blue-500 dark:text-blue-300' : ''} transition-all duration-200 hover:rounded-lg`}
                    onClick={handleDropdownClose}
                  >
                    News
                  </Link>
                </li>

                
              </ul>
            )}
          </div>
          
          {auth.isLoggedIn ? (<>
          {auth.isAdmin ? (<></>):(<>
          <li onClick={handleDropdownClose} className="flex items-center space-x-2 ">
            <Link to="/Profile">
            {auth.image ? (
                  <img
                    src={auth.image}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 p-[2px] border-white hover:scale-105 hover:border-2 transition-all duration-300"
                  />
                ) : (
                  <div className="w-10 h-10 flex items-center justify-center rounded-full border-2 p-[2px] border-white">
          <FaUserCircle className="text-gray-600 text-3xl" /> {/* Default icon */}
                  </div>
            )}
            </Link>
          </li>
          </>)}
          </>):(<></>)}
            </>
          )}
        </ul>
        {auth.isLoggedIn ? (
          <div onClick={handleDropdownClose}>
            <button onClick={handleLogout} className={buttonClass}>
              Logout
            </button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Link to="/login" className={buttonClass}>
              Log in
            </Link>
            <Link to="/signup" className={buttonClass}>
              Get started
            </Link>
          </div>
        )}
      </nav>





      
    </header>
  );
};

export default Navbar;