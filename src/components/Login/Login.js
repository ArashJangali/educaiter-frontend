import React, { useState, useContext } from "react";
import axios from "../Api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import "./Login.css";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

export default function Login() {

    const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = { email, password };


    try {
        const response = await axios.post('/login', userData, { withCredentials: true })
        
        if (response.status === 200) {
            setUser(response.data.user)
            navigate('/user-profile');
          }
       
    } catch(error) {
        console.log("An error occurred during login.", error);
    }

  };

  return (
    <div className="login">
      <p>Log in to your account</p>
      <form onSubmit={handleSubmit}>
        {/* <div className="oauth">
          <FaGoogle className="oauth-buttons" />
          <FaFacebook className="oauth-buttons" />
          <FaGithub className="oauth-buttons" />
        </div> */}
        {/* <p className="or">OR</p> */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
        <p className="forgot-password">Forgot Password?</p>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
}
