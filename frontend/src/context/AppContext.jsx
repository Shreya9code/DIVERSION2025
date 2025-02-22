import { createContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "Rs.";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || false);
  const [userData, setUserData] = useState(false);

  // ✅ Fetch doctors list with improved error handling
  const getDoctorsData = async () => {
    try {
      console.log("Fetching from:", `${backendUrl}/api/doctor/list`);
      const { data } = await axios.get(`${backendUrl}/api/doctor/list`);
      console.log("Doctors data received:", data);
      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("❌ API Call Failed:", error);
  
      if (error.response) {
        console.error("Server Response Error:", error.response.status, error.response.data);
        toast.error(`Error ${error.response.status}: ${error.response.data.message}`);
      } else if (error.request) {
        console.error("❌ No response from server. Possible network issue or incorrect backend URL.");
        toast.error("No response from the server. Check if backend is running.");
      } else {
        console.error("❌ Unexpected Error:", error.message);
        toast.error(error.message);
      }
    }
  };  

  // ✅ Fetch user profile with better token management
  const loadUserProfileData = async () => {
    if (!token) return;

    try {
      const apiUrl = `${backendUrl}/api/user/get-profile`;
      console.log("Fetching user profile from:", apiUrl);

      const { data } = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);

      if (error.response) {
        toast.error(`Error ${error.response.status}: ${error.response.data.message}`);
      } else if (error.request) {
        toast.error("No response from the server. Check if backend is running.");
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (!backendUrl) {
      console.error("❌ ERROR: VITE_BACKEND_URL is not defined! Check your .env file.");
      toast.error("Backend URL is missing. Please check the .env file.");
      return;
    }

    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData({
        name: "",
        email: "",
        phone: "",
        image: "",
        address: { line1: "", line2: "" },
        gender: "",
        dob: "",
      });
    }
  }, [token]);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbol,
    token,
    setToken,
    backendUrl,
    userData,
    setUserData,
    loadUserProfileData,
  };

  return <AppContext.Provider value={value}>{props.children}</AppContext.Provider>;
};

export default AppContextProvider;
