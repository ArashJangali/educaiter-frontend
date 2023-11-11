import React, { useState, useContext } from "react";
import axios from "../Api/axiosInstance";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import firebase from "../../config/firebaseConfig";
import "./Login.css";
import { FaGoogle, FaGithub } from "react-icons/fa";

const auth = getAuth(firebase);

export default function Login() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const [forgotPass, setForgotPass] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResetPassModal, setShowResetPassModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post("/social-auth", {
        token: idToken,
      }, {withCredentials: true});
      if (response.status === 200) {
        const user = response.data.user;
        console.log(user)
        setUser(user);
        navigate("/user-profile");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setShowModal(true);
    }
  };

  const handleGithubSignUp = async () => {
    const provider = new GithubAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post("/social-auth", {
        token: idToken,
      }, {withCredentials: true});
      if (response.status === 200) {
        const user = response.data.user;
        console.log(user)
        setUser(user);
        navigate("/user-profile");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setShowModal(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = { email, password };

    try {
      const response = await axios.post("/login", userData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(response.data.user);
        navigate("/user-profile");
      }
    } catch (error) {
      setShowModal(true);
      setError(error.response.data.error);
    }
  };

  const forgotPassword = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("/reset-password", {
        email: email,
        withCredentials: true,
      });

      if (response.status === 200) {
        setShowResetPassModal(true);
      }
    } catch (error) {
      setShowModal(true);
      setError("An error occurred during login.");
    }
  };

  const handleCloseModal = async () => {
    setShowModal(false);
  };

  return !forgotPass ? (
    <div className="login">
      <p>Log in to your account</p>

      <div className="oauth">
        <FaGoogle onClick={handleGoogleSignUp} className="oauth-buttons" />
        <FaGithub onClick={handleGithubSignUp} className="oauth-buttons" />
      </div>
      <p className="or">OR</p>

      <form onSubmit={handleSubmit}>
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
        <p onClick={() => setForgotPass(true)} className="forgot-password">
          Forgot Password?
        </p>
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
      <p className="reset-paragraph">
        Enter your user account's email and we will send you a password reset
        link.
      </p>
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
  );
}
