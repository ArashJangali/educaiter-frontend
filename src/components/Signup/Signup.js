import React, { useState, useContext } from "react";
import axios from "../Api/axiosInstance";
import UserContext from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
} from "firebase/auth";
import firebase from "../../config/firebaseConfig";
import "./Signup.css";
import { FaGoogle, FaGithub } from "react-icons/fa";

const auth = getAuth(firebase);

export default function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useContext(UserContext)

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
        navigate("/subscription");
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
      },{withCredentials:true});
      if (response.status === 200) {
        const user = response.data.user;
        console.log(user)
        setUser(user);
        navigate("/subscription");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
      setShowModal(true);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const userData = { name, email, password };

    try {
      const response = await axios.post("/signup", userData, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setShowVerificationModal(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setShowModal(true);
        setError(error.response.data.error);
      } else {
        setShowModal(true);
        setError(error.response.data.error);
      }
    }
  };

  const handleVerificationModalClose = () => {
    setShowVerificationModal(false);
  };

  const handleCloseModal = async () => {
    setShowModal(false);
  };

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
      </form>
      <p className="or">OR</p>
      <div className="oauth">
        <FaGoogle onClick={handleGoogleSignUp} className="oauth-buttons" />
        <FaGithub onClick={handleGithubSignUp} className="oauth-buttons" />
      </div>
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
