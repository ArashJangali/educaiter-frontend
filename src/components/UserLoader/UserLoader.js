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
   
        const response = await axios.get("/me", { withCredentials: true });


        if (response.status === 200) {
        
          setUser(response.data);
     
        } else {
          
       
          navigate("/login");
        }
      } catch (error) {
        console.log("An error occurred while fetching user data.", error);
        navigate("/login");
      }
    };

    fetchUserData();
  }, []);

  return children;
}
