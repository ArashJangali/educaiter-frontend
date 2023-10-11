import React, { useState, useContext } from "react";
import axios from "../Api/axiosInstance";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./ResetPassword.css";

export default function ResetPassword() {
  const navigate = useNavigate();

  const [newPass, setNewPass] = useState('');
  const [oldPass, setOldPass] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [showResetPassModal, setShowResetPassModal] = useState(false);

  const { token } = useParams();
  console.log(token)

  const passChange = async (event) => {
    event.preventDefault();

    if (newPass !== confirmedPass) {
        console.error("Passwords do not match!");
        return;
      }


    try {
      const response = await axios.post("/passwordChange", {
        token: token,
        newPass: newPass,
        withCredentials: true,
      });

      if (response.status === 200) {
        setShowResetPassModal(true);
      }
    } catch (error) {
      console.log("An error occurred during login.", error);
    }
  };

  const handleVerificationModalClose = () => {
    setShowResetPassModal(false);
    navigate('/login')
   
  }

  return (
    <div className="reset-password">
      <h1>New Password</h1>
      {/* <p>
        Must be 8 characters.
      </p> */}
      <form onSubmit={passChange}>
        <input
          type="password"
          placeholder="Old Password"
          value={oldPass}
          onChange={(e) => setOldPass(e.target.value)}
        />
         <input
          type="password"
          placeholder="New Password"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
        />
         <input
          type="password"
          placeholder="Confirm New Password"
          value={confirmedPass}
          onChange={(e) => setConfirmedPass(e.target.value)}
        />
        <button type="submit">Reset Password</button>
      </form>

      {showResetPassModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Password Changed!</p>
            <button onClick={handleVerificationModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
