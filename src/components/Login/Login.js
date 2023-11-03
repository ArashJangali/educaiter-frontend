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
  const [forgotPass, setForgotPass] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResetPassModal,setShowResetPassModal] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const userData = { email, password };
  
    try {
      const response = await axios.post('/login', userData, { withCredentials: true });
  
      if (response && response.status === 200 && response.data && response.data.user) {
        setUser(response.data.user);
        navigate('/user-profile');
      } else {
        console.error('Invalid response format:', response);
        setShowModal(true);
        setError('Unexpected server response');
      }
      
    } catch (error) {
      console.error('Error during login:', error);
      setShowModal(true);
      setError(error.response ? error.response.data.error : 'An error occurred');
    }
  };
  

 

  const forgotPassword = async (event) => {
    event.preventDefault();
    try {
const response = await axios.post('/reset-password', {
  email: email
, withCredentials:true})

if (response.status === 200) {
  setShowResetPassModal(true)
}

    } catch(error) {
      setShowModal(true);
      setError("An error occurred during login.");
    }
  }

  const handleCloseModal = async () => {
    setShowModal(false)

  }


  return (
    !forgotPass ? (
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
        <p onClick={() => setForgotPass(true)} className="forgot-password">Forgot Password?</p>
      </form>
      <p>
        Don't have an account? <Link to="/signup">Sign up</Link>
      </p>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{error}</p>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
    ) : (
      <div className="login">
      <h1>Password Reset</h1>
      <p className="reset-paragraph">Enter your user account's email and we will send you a password reset link.</p>
      <form onSubmit={forgotPassword}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>

      {showResetPassModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Email sent</p>
            <button onClick={() => setShowResetPassModal(false)}>Close</button>
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
    )
  )
  
}
