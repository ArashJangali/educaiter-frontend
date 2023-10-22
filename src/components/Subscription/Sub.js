import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "../Api/axiosInstance";
import "./Subscription.css";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";
import AOS from "aos";
import Lottie from "lottie-react";
import bronzeTier from "../../assets/bronze-tier.json";
import silverTier from "../../assets/silver-tier.json";
import goldTier from "../../assets/gold-tier.json";
import Sidebar from "../Sidebar/Sidebar";
import "aos/dist/aos.css";
import "../Pricing/Pricing.css";

export default function Subscription() {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [tiers, setTiers] = useState([]);
  const [isToggled, setIsToggled] = useState(true);
  const [isFormVisible, setFormVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const { user, setUser } = useContext(UserContext);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cancelMessage, setCancelMessage] = useState("");
  const userId = user?._id;



  useEffect(() => {
    axios
      .get("/pricing")
      .then((response) => setTiers(response.data))
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("An error occurred while creating the subscription. ");
        setShowErrorModal(true);
      });
  }, []);

  const [selectedTier, setSelectedTier] = useState(null);

  const checkout = (tierName) => {
    if (!tierName || !userId) {
      setErrorMessage("Please select a tier.");
      setShowErrorModal(true);
      return;
    }

    const tierObject = tiers.find(
      (tier) => tier.name.toLowerCase() === tierName.toLowerCase()
    );

    if (!tierObject) {
      setErrorMessage("Selected tier not found.");
      setShowErrorModal(true);
      return;
    }

    axios
      .post("/create-checkout-session", {
        tier: tierObject,
        customerId: userId,
        withCredentials: true,
      })
      .then((res) => {
        window.location = res.data.session.url;
      })
      .catch((e) => {
        console.error(e);
        if (e.response && e.response.status === 403) {
          setErrorMessage("Access forbidden");
          setShowErrorModal(true);
        } else if (e.response && e.response.status === 500) {
          setErrorMessage("An error occurred while creating the subscription");
          setShowErrorModal(true);
        }
      });

    setSelectedTier(tierObject);
  };

  function onClose() {
    setShowErrorModal(false);
    setErrorMessage(null);
    setCancelMessage(null);
  }

  const handleSubCancel = async () => {
    try {
      if (
        window.confirm("Are you sure you want to cancel your subscription?")
      ) {
        const response = await axios.delete("/deletedSubscription", {
          withCredentials: true,
        });
        setCancelMessage("Error cancelling subscription");
        setShowErrorModal(true);
        setTimeout(() => {
          setCancelMessage("");
          setShowErrorModal(false);
          navigate("/user-profile");
        }, 3000);
      }
    } catch (error) {
      console.error(error);
      setCancelMessage("An error occurred while cancelling the subscription");
      setShowErrorModal(true);
    }
  };

  const handleToggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const isCurrentPlan = (tierName) => {
    return user?.planType === tierName;
  };

  return (
    <div className="parent-pricing-container">
      <Sidebar />
      <div className="pricing-container sub">
        {(errorMessage || cancelMessage) && (
          <div className="apilimit-modal-container">
            {errorMessage && (
              <span className="close-button" onClick={onClose}>
                ×
              </span>
            )}
            {errorMessage && (
              <div className="apilimit-modal">
                {errorMessage} <Link to="/subscription">Click here</Link> to
                retry.
              </div>
            )}
            {cancelMessage && (
              <div className="apilimit-modal">{cancelMessage}</div>
            )}
          </div>
        )}
        <div className="pricing-header sub">
          <p>Select the plan that fits your needs. Cancel anytime.</p>

          <div className="toggle-container">
            <span className="toggle-text">Billed Monthly</span>
            <div className="toggle-slider">
              <input
                type="checkbox"
                className="slider-input"
                id="slider-toggle"
                checked={isToggled}
                onChange={handleToggle}
              />
              <label htmlFor="slider-toggle" className="slider-label"></label>
            </div>
            <span className="toggle-text">Billed Annually</span>
          </div>
        </div>
        <div className="pricing-cards-container sub">
          <div
            data-aos="flip-left"
            data-aos-duration="1400"
            className="pricing-card sub bronze"
          >
            <div className="card-top sub">
              <Lottie
                data-aos="fade-right"
                data-aos-duration="2200"
                className="plan-icon-animation"
                animationData={bronzeTier}
                loop={true}
                style={{
                  width: "55%",
                  marginBottom: "-3em",
                  marginTop: "-6.5em",
                }}
              />
              <h3 className="plan-name">Bronze</h3>
              <div className="span-container">
                {" "}
                <span className="plan-price">$0</span>
                <span className="plan-duration"> / Month</span>
              </div>

              <p className="plan-description">Dabbler</p>
            </div>
            <ul className="plan-features">
            <li> 
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>{isToggled ? '500 Credits' : '500 Credits'}</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to specialized tutor bots</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Performance dashboard</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to AI-generated puzzles</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to AI-generated flashcards</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Deep insights based on your past performance</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Quiz duels against bots and friends</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to rankings, badges, and leaderboards.</span>
              </li>
            </ul>
            <button className="bronze-btn" disabled style={{color: 'transparent', background: 'transparent', boxShadow: 'none'}}>Bronze Subscription</button>
          </div>
          <div
            data-aos="fade-up"
            data-aos-duration="2000"
            className="pricing-card sub silver"
          >
            <div className="card-top sub">
              <Lottie
                data-aos="fade-down"
                data-aos-duration="2200"
                className="plan-icon-animation"
                animationData={silverTier}
                loop={true}
                style={{
                  width: "55%",
                  marginBottom: "-3em",
                  marginTop: "-6.5em",
                }}
              />
              {isToggled && (
                <span className="most-popular-badge">Most Popular</span>
              )}
              <h3 className="plan-name">Silver</h3>
              <div className="span-container">
                <span className="plan-price">{`$${
                  isToggled ? 9.99 : 14.99
                }`}</span>
                <span className="plan-duration"> / Month</span>
              </div>
              {isToggled && <span className="discount-label">33% off</span>}
              <p className="plan-description">Most Bang For Your Buck</p>
            </div>
            <ul className="plan-features">
            <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>{isToggled ? '6000 Credits' : '6000 Credits'}</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to specialized tutor bots</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Performance dashboard</span>
                
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to AI-generated puzzles</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to AI-generated flashcards</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Deep insights based on your past performance</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Quiz duels against bots and friends</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to rankings, badges, and leaderboards.</span>
              </li>
            </ul>

            {isCurrentPlan(isToggled ? "Silver Annual" : "Silver Monthly") ? (
              <button className="plan-btn" onClick={handleSubCancel}>Cancel Subscription</button>
            ) : (
              <button
                onClick={() =>
                  checkout(isToggled ? "Silver Annual" : "Silver Monthly")
                }
                className="plan-btn"
              >
                Upgrade to Silver
              </button>
            )}
          </div>
          <div
            data-aos="flip-right"
            data-aos-duration="1400"
            className="pricing-card sub gold"
          >
            <div className="card-top sub">
              <Lottie
                data-aos="fade-left"
                data-aos-duration="2200"
                className="plan-icon-animation"
                animationData={goldTier}
                loop={true}
                style={{
                  width: "55%",
                  marginBottom: "-3em",
                  marginTop: "-6.5em",
                }}
              />
              <h3 className="plan-name">Gold</h3>
              {isToggled && (
                <span className="most-popular-badge">Best Value</span>
              )}
              <div className="span-container">
                <span className="plan-price">{`$${
                  isToggled ? 14.99 : 19.99
                }`}</span>
                <span className="plan-duration"> / Month</span>
              </div>
              {isToggled && <span className="discount-label">25% off</span>}
              <p className="plan-description">You're Not Joking Around</p>
            </div>
            <ul className="plan-features">
            <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>{isToggled ? '12000 Credits' : '12000 Credits'}</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to specialized tutor bots</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Performance dashboard</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to AI-generated puzzles</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to AI-generated flashcards</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Deep insights based on your past performance</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Quiz duels against bots and friends</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to rankings, badges, and leaderboards</span>
              </li>
              
            </ul>
            {isCurrentPlan(isToggled ? "Gold Annual" : "Gold Monthly") ? (
              <button className="plan-btn" onClick={handleSubCancel}>Cancel Subscription</button>
            ) : (
              <button
                onClick={() =>
                  checkout(isToggled ? "Gold Annual" : "Gold Monthly")
                }
                className="plan-btn"
              >
                Upgrade to Gold
              </button>
            )}
          </div>
        </div>
      
      </div>
    </div>
  );
}
