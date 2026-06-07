import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const initialAuthState = () => {
    const data = localStorage.getItem("auth");
    return data
      ? JSON.parse(data)
      : {
        username: "",
        token: "",
        isLoggedIn: false,
        isAdmin: false,
        membership_id: null,
        userPoints: 0,
        lastAttempt: null,
        email: "",
        image: "",
      };
  };

  const [auth, setAuth] = useState(initialAuthState);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = auth?.token;
  }, [auth.token]);

  const url = import.meta.env.VITE_BACKEND_URL;

  const fetchData = async () => {
    if (auth.email) {
      try {
        const response = await axios.get(
          `${url}/getalluser/${auth.email}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [auth.username]);

  useEffect(() => {
    if (userData?.points) {
      setAuth((prevAuth) => ({ ...prevAuth, userPoints: userData.points }));
    }
    if (userData?.membership_id) {
      setAuth((prevAuth) => ({
        ...prevAuth,
        membership_id: userData.membership_id,
      }));
    }
    if (userData?.lastAttempt) {
      setAuth((prevAuth) => ({
        ...prevAuth,
        lastAttempt: userData.lastAttempt,
      }));
    }
    if (userData?.email) {
      setAuth((prevAuth) => ({ ...prevAuth, email: userData.email }));
    }
    if (userData?.image) {
      // Add this line
      setAuth((prevAuth) => ({ ...prevAuth, image: userData.image }));
    }
  }, [userData]);

  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth, userData, setUserData]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider, AuthContext };
