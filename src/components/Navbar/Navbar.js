import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import "./Navbar.css";
import axios from "../Api/axiosInstance";

export default function Navbar({ loggedOut, setLoggedOut }) {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [scrolledMid, setScrolledMid] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;

    const offsetMid = window.scrollY;

    if (offset > 60 ) { 
      setScrolled(true);
  } else {
      setScrolled(false);
  }

  if (offsetMid > 300) {
    setScrolledMid(true)
  } else {
    setScrolledMid(false);
}

  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  })

  let navbarClasses=['navbar'];
  
  if (scrolled) {
    navbarClasses.push('scrolled');
}



let signUpButtonClass=['nav-signup-btn']

if (scrolledMid) {
  signUpButtonClass.push('scrolled')
}

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setUser(null);
        setLoggedOut(true)
        navigate("/");
      }
    } catch (error) {
      console.log("An error occurred during logout.", error);
    }
  };

  return (
    <nav className={`loggedOut ? 'navbar-loggedout' : ${navbarClasses.join(" ")}`}>
      <img className="navbar-img" src="/logo.png" />
      <div className="navbar-middle">
        {user ? (
          <div className="navbar-user">
            <img
              src={user?.picture || "https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_1539,h_1069/https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-1.jpg"}
              alt={`${user.name}'s profile`}
              className="navbar-user-img"
            />
            <div className="navbar-dropdown">
              <div className="dropdown-links">
              <Link to="/recommendation">Recommendation</Link>
                
                <Link to="/assessment">Assessment</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/subscription">Subscribe</Link>
                <Link to="/user-profile">Profile</Link>
          
                <Link to="/chat">Chat</Link>
                <Link className="nav-logout-btn" onClick={handleLogout}>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="navbar-links">
        
          {/* <Link className="nav-login-btn" to="/contact">
              Contact
            </Link>
          <Link className="nav-login-btn" to="/subscription">
              Pricing
            </Link> */}
            <Link onClick={() => setLoggedOut(false)} className="nav-login-btn" to="/login">
              Log in
            </Link>
            <Link onClick={() => setLoggedOut(false)} className={`${signUpButtonClass.join(" ")}`} to="/signup">
            Create an account
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
