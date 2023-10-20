import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import "./UserProfile.css";
import axios from "../Api/axiosInstance";
import UserContext from "../../contexts/UserContext";
const Avatar = require("cartoon-avatar");

// Create/Update/Display User Profile

const UserProfile = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [changePassClicked, setChangePassClicked] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [oldPass, setOldPass] = useState("");
  const [confirmedPass, setConfirmedPass] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name,
    email: user?.email,
    picture: avatarUrl,
    username: user?.username,
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangePassword = () => {
    if (newPass !== confirmedPass) {
      setError("Passwords do not match!");
      setShowModal(true);
      return;
    }

    axios
      .put(`/users/change-password/${user._id}`, {
        oldPassword: oldPass,
        newPassword: newPass,
      })
      .then((response) => {
        setEditMode(false);
      })
      .catch((error) => {
        setShowModal(true);
        if (error.response) {
          setError(error.response.data.message);
        } else {
          console.log("Error", error.message);
        }
      });
  };

  const handleSubmit = (e) => {
    setError(null);

    e.preventDefault();

    if (changePassClicked) {
      handleChangePassword();
      return;
    }

    axios
      .put(`/users/${user._id}`, formData)
      .then((response) => {
        setUser(response.data);
        setEditMode(false);
      })
      .catch((error) => {
        setShowModal(true);

        if (error.response) {
          setError(error.response.data.message);
          setShowModal(true);
        } else {
          setError(error.response.data.message);
          setShowModal(true);
        }
      });
  };

  const handleNewAvatar = () => {
    const newAvatarUrl = Avatar.generate_avatar();
    setAvatarUrl(newAvatarUrl);
    setFormData({ ...formData, picture: newAvatarUrl });
  };

  const deleteAccount = async () => {
    try {
      if (window.confirm("Are you sure you want to delete your account?")) {
        const response = await axios.delete("/deleteaccount", {
          withCredentials: true,
        });
        if (response.status === 200) {
          navigate("/login");
        }
      }
    } catch (error) {
      setShowModal(true);
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: user?.name,
      email: user?.email,
      picture: avatarUrl,
      username: user?.username,
      password: "",
    });
    setOldPass("");
    setNewPass("");
    setConfirmedPass("");
  };

  const handleBackButton = async (e) => {
    e.preventDefault();
    resetForm();
    setChangePassClicked(null);
    setEditMode(false);
  };

  const handleChangePassClicked = async () => {
    setEditMode(true);
    setChangePassClicked(true);
  };

  const handleCloseModal = async () => {
    setShowModal(false);
    resetForm();
  };

  return editMode ? (
    <div className="user-profile-container">
      <Sidebar />
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="btn-h1">
          <button className="back-button" onClick={handleBackButton}>
            ←
          </button>
        </div>
        {!changePassClicked ? (
          <>
            <div className="upload-img-container">
              <img
                className="avatar-img"
                src={
                  formData?.picture ||
                  avatarUrl ||
                  "https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_1539,h_1069/https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-1.jpg"
                }
              />
              <button
                className="avatar-btn"
                type="button"
                onClick={handleNewAvatar}
              >
                Generate new avatar
              </button>
            </div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={user.email}
              disabled={true}
            />

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={user.name}
              disabled={true}
            />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Username"
            />
          </>
        ) : (
          <>
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
          </>
        )}

        <button className="submit-profile-btn" type="submit">
          Submit
        </button>
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <p>{error}</p>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}
      </form>
    </div>
  ) : (
    <div className="user-profile-container">
      <Sidebar />
      <div className="profile-container">
        <h1>Profile</h1>
        <div className="profile-picture">
          <img
            src={
              formData?.picture ||
              avatarUrl ||
              user?.picture ||
              "https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_1539,h_1069/https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-1.jpg"
            }
            alt={`${user?.name}'s profile`}
          />
        </div>

        <div className="profile-details">
          <p>{user?.name}</p>
          <p>
            <strong>💌</strong> {user?.email}
          </p>
        </div>
        <div className="profile-btn-container">
          {" "}
          <button
            className="edit-profile-btn"
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        </div>

        <div className="profile-btn-container">
          {" "}
          <button
            className="edit-profile-btn"
            onClick={handleChangePassClicked}
          >
            Change Password
          </button>
        </div>

        <div className="profile-btn-container">
          {" "}
          <button className="edit-profile-btn" onClick={deleteAccount}>
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
