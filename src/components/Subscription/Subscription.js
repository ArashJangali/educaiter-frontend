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
  const { user, setUser} = useContext(UserContext);
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cancelMessage, setCancelMessage] = useState(''); 
  const userId = user?._id

  useEffect(() => {
    axios
      .get("/pricing")
      .then((response) => setTiers(response.data))
      .catch((error) => {
        console.error("Error:", error)
        setErrorMessage('An error occurred while creating the subscription. ');
        setShowErrorModal(true)
      }
      );
  }, []);

  const [selectedTier, setSelectedTier] = useState(null);

  const checkout = (tier) => {

    if (!tier || !userId) {
      setErrorMessage('Please select a tier.');
      setShowErrorModal(true);
      return;
    }

    
    axios.post('/create-checkout-session', {
      tier: tier,
      customerId: userId,
      withCredentials: true
    })
    .then((res) => {
      window.location = res.data.session.url
    })
    .catch((e) => {
      console.error(e)
      if (e.response && e.response.status === 403) {
        setErrorMessage('Access forbidden');
        setShowErrorModal(true)
      } else if (e.response && e.response.status === 500) {
        setErrorMessage('An error occurred while creating the subscription');
        setShowErrorModal(true)
      }
    })
    
    setSelectedTier(tier);

  };


  function onClose() {
    setShowErrorModal(false)
    setErrorMessage(null);
    setCancelMessage(null);
  }

  const handleSubCancel = async () => {
    try {
      if (window.confirm('Are you sure you want to cancel your subscription?')) {
        const response = await axios.delete('/deletedSubscription', { withCredentials: true })
        setCancelMessage('Error cancelling subscription');
        setShowErrorModal(true)
        setTimeout(() => {
          setCancelMessage('');
          setShowErrorModal(false);
          navigate('/user-profile');
        }, 3000)
      }
      
    } catch(error){
      console.error(error)
      setCancelMessage('An error occurred while cancelling the subscription');
      setShowErrorModal(true)
    }
  }


  return (
    
    <div className="subscription-page">
  {(errorMessage || cancelMessage ) ? (
        <div className="apilimit-modal-container">
          {errorMessage && <span className="close-button" onClick={onClose}>
            ×
          </span>}
          {errorMessage && <div className="apilimit-modal">{errorMessage} <Link to="/subscription">Click here</Link> to retry.</div>}
          {cancelMessage && <div className="apilimit-modal">{cancelMessage}</div>}
        </div>
      ): (
        <>
        <div className="tier-list">
          {tiers.map((tier) => (
            <div key={tier.id} className={tier?.name.toLowerCase() === user?.planType ? 'current-plan' : 'tier-card'}>
              <h2>{tier.name}</h2>
              <p>{tier.description}</p>
              <p className="price">Price: ${tier.price}</p>
              {tier?.name.toLowerCase() !== user?.planType ? (
              <button onClick={() => checkout(tier)}>Select</button>
              ) : (
                <button type="button" disabled>Current Tier</button>
              )
            }
            </div>
          ))}
         
        </div>
        {user?.planType !== 'unsubscribed' && <button className="unsub" onClick={handleSubCancel}>Cancel Subscription</button> }
        </>
      )}
        </div>
      ) 
          }