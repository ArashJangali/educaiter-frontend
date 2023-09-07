import React, { useState, useEffect, useContext } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "../Api/axiosInstance";
import "./Subscription.css";
import UserContext from "../../contexts/UserContext";
import { Link } from "react-router-dom";

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
  }

  return (
    
    <div className="subscription-page">
  {errorMessage ? (
        <div className="apilimit-modal-container">
          <span className="close-button" onClick={onClose}>
            ×
          </span>
          <div className="apilimit-modal">{errorMessage} <Link to="/subscription">Click here</Link> to retry.</div>
        </div>
      ): (
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
      )}
        </div>
      ) 
          }