import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../Api/axiosInstance";
import UserContext from "../../contexts/UserContext";

export default function UserLoader({ children }) {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // make a request to an authenticated endpoint that verifies the JWT and returns user's data
        const response = await axios.get("/me", { withCredentials: true });

        
        // If token is valid, the server should return the user data
        if (response.status === 200) {
          console.log('userloader', response.data)
          setUser(response.data);
     
        } else {
          
          // If the server returns a status code other than 200, the token is not valid
          navigate("/login");
        }
      } catch (error) {
        console.log("An error occurred while fetching user data.", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, [setUser, navigate]);

  return children;
}
