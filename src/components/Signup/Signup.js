import React, { useState } from "react";
import axios from "../Api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import "./Signup.css";
import { FaGoogle, FaFacebook, FaGithub } from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userData = { name, email, password };
  
    try {
      const response = await axios.post("/signup", userData, { withCredentials: true });
      
      if (response.status === 200) {
        setShowVerificationModal(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setShowModal(true);
        setError(error.response.data.error); // or display the error message in a more user-friendly way
      } else {
        setShowModal(true);
        setError(error.response.data.error);
      }
    }
  };
  

  const handleVerificationModalClose = () => {
    setShowVerificationModal(false);
   
  }

  const handleCloseModal = async () => {
    setShowModal(false)
  }


  return (
    <div className="signup">
      <p>Sign up and step into the future of learning!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
        <button type="submit">Sign up</button>

        {/* <p className="or">OR</p> */}
        {/* <div className="oauth">
          <FaGoogle className="oauth-buttons" />
          <FaFacebook className="oauth-buttons" />
          <FaGithub className="oauth-buttons" />
        </div> */}
      </form>
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>

      {showVerificationModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Please check your email to verify your account.</p>
            <button onClick={handleVerificationModalClose}>Close</button>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{error}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
