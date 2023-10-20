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

  const checkout = (tier) => {
    if (!tier || !userId) {
      setErrorMessage("Please select a tier.");
      setShowErrorModal(true);
      return;
    }

    axios
      .post("/create-checkout-session", {
        tier: tier,
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

    setSelectedTier(tier);
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

  return (

  
    <div className="pricing-container">
      {(errorMessage || cancelMessage ) && (
        <div className="apilimit-modal-container">
          {errorMessage && <span className="close-button" onClick={onClose}>
            ×
          </span>}
          {errorMessage && <div className="apilimit-modal">{errorMessage} <Link to="/subscription">Click here</Link> to retry.</div>}
          {cancelMessage && <div className="apilimit-modal">{cancelMessage}</div>}
        </div>
      )}
      <div className="pricing-header">
        <h1>Choose Your Plan</h1>

        <p>Select the one that fits your needs. Cancel anytime.</p>
        <button></button>
      </div>
      <div className="pricing-cards-container">
        <div
          data-aos="flip-left"
          data-aos-duration="1400"
          className="pricing-card"
        >
          <div className="card-top">
            <Lottie
              data-aos="fade-right"
              data-aos-duration="2200"
              className="plan-icon-animation"
              animationData={bronzeTier}
              loop={true}
              style={{ width: "55%", marginBottom: "-3em", marginTop: "-8em" }}
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
              <span>Access to basic chatbots.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Basic performance dashboard.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Limited access to AI-generated puzzles.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>General flashcards on fundamentals.</span>
            </li>
          </ul>
          <button onClick={() => checkout('bronze')} className="plan-btn">
            Get Started
          </button>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className="pricing-card silver"
        >
          <div className="card-top">
            <Lottie
              data-aos="fade-down"
              data-aos-duration="2200"
              className="plan-icon-animation"
              animationData={silverTier}
              loop={true}
              style={{ width: "55%", marginBottom: "-3em", marginTop: "-8em" }}
            />
            <h3 className="plan-name">Silver</h3>
            <div className="span-container">
              <span className="plan-price">$9.99</span>
              <span className="plan-duration"> / Month</span>
            </div>
            <p className="plan-description">Most Bang For Your Buck</p>
          </div>
          <ul className="plan-features">
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Access to specialized bots.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Personalized Learning Map.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Insights based on your past performance.</span>
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
          <button onClick={() => checkout('silver')} className="plan-btn">
            Get Started
          </button>
        </div>
        <div
          data-aos="flip-right"
          data-aos-duration="1400"
          className="pricing-card"
        >
          <div className="card-top">
            <Lottie
              data-aos="fade-left"
              data-aos-duration="2200"
              className="plan-icon-animation"
              animationData={goldTier}
              loop={true}
              style={{ width: "55%", marginBottom: "-3em", marginTop: "-8em" }}
            />
            <h3 className="plan-name">Gold</h3>
            <div className="span-container">
              <span className="plan-price">$14.99</span>
              <span className="plan-duration"> / Month</span>
            </div>
            <p className="plan-description">You're Not Joking Around</p>
          </div>
          <ul className="plan-features">
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Exclusive chat with expert-level bots</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>In-depth performance review.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Unlimited challenges against bots or friends.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Flashcards based on areas you need to improve.</span>
            </li>
          </ul>
          <button onClick={() => checkout('gold')} className="plan-btn">
            Get Started
          </button>
        </div>
      </div>
      {user?.planType !== 'unsubscribed' && <button className="unsub" onClick={handleSubCancel}>Cancel Subscription</button> }
    </div>
  );
}
