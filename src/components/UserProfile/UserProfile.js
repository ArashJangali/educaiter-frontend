import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./UserProfile.css";
import axios from "../Api/axiosInstance";
import UserContext from "../../contexts/UserContext";
const Avatar = require('cartoon-avatar');


// Create/Update/Display User Profile

const UserProfile = () => {
  


  const navigate = useNavigate();
  const { user, setUser} = useContext(UserContext);
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [avatarUrl, setAvatarUrl ] = useState(null)



    const [formData, setFormData] = useState({
        name: user?.name,
        age: "",
        email: user?.email,
        picture: avatarUrl,
        learningStyle: "",
        subjectsOfInterest: "",
        interests: "",
        academicPerformance: "",
        progress: {
          coursesCompleted: 0,
          totalCourses: 0,
        },
    })


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = (e) => {
    setError(null);

    e.preventDefault();

    axios
      .put(`/users/${user._id}`, formData)
      .then((response) => {
        setUser(response.data);
        setEditMode(false);
       
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          setError(error.response.data.message);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      });
  };




  const handleNewAvatar = () => {
    const newAvatarUrl = Avatar.generate_avatar();
    setAvatarUrl(newAvatarUrl);
    setFormData({ ...formData, picture: newAvatarUrl });
  };

 
  if (error) return <div>Something went wrong {error}</div>;
  if (!user) return <div>No user data</div>;

  const deleteAccount = async () => {
    try {
      if (window.confirm('Are you sure you want to delete your account?')) {
        const response = await axios.delete('/deleteaccount', { withCredentials: true })
        if (response.status === 200) {
          navigate('/login')
        }
        
      }
      
    } catch (error) {
      console.error(error);
    }
  }

  return editMode ? (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className='btn-h1'>
        <button className="back-button" onClick={(e) => { e.preventDefault(); setEditMode(false) }}>
          ↩
        </button>
     
      </div>
      
      <div className="upload-img-container">
        <img className="avatar-img" src={formData?.picture || avatarUrl || "https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_1539,h_1069/https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-1.jpg"} />
        <button className="avatar-btn" type="button" onClick={handleNewAvatar}>Generate new avatar</button>
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
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      <input
        type="text"
        name="learningStyle"
        value={formData.learningStyle}
        onChange={handleChange}
        placeholder="Learning Style"
      />
      <input
        type="text"
        name="subjectsOfInterest"
        value={formData.subjectsOfInterest}
        onChange={handleChange}
        placeholder="Subjects of Interest"
      />
      <input
        type="text"
        name="interests"
        value={formData.interests}
        onChange={handleChange}
        placeholder="Interests"
      />
      <input
        type="text"
        name="academicPerformance"
        value={formData.academicPerformance}
        onChange={handleChange}
        placeholder="Academic Performance"
      />
 
      <button className="submit-profile-btn" type="submit">
        Submit
      </button>
      {error && <p>{error}</p>}
    </form>
  ) : (
    <div className="profile-container">
      <h1>Profile</h1>
      <div className="profile-picture">
        <img src={formData?.picture || avatarUrl || user?.picture || "https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_1539,h_1069/https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-1.jpg"} alt={`${user.name}'s profile`} />
      </div>

      <div className="profile-details">
        <p>{user.name}</p>
        <p>
          <strong>💌</strong> {user.email}
        </p>
      </div>

      <button className="edit-profile-btn" onClick={() => setEditMode(true)}>
        Edit Profile
      </button>
      <button style={{backgroundColor: 'red', color: 'white'}} className="edit-profile-btn" onClick={deleteAccount}>
        Delete Account
      </button>
      {error && <p>{error}</p>}
    </div>
  );
  
}


export default UserProfile;
