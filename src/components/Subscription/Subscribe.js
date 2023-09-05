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
      .catch((error) => console.error("Error:", error));
  }, []);

  const [selectedTier, setSelectedTier] = useState(null);
  
  const handleTierSelection = (tier) => {
    setSelectedTier(tier);
    setFormVisible(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  
    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
  
    axios
      .post(
        "/subscribe",
        {
          paymentMethodId: paymentMethod.id,
          tierId: selectedTier.id,
          priceId: selectedTier.priceId,
          email,
          name,
          country,
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true
        }
      )
      .then(response => {
        const subscription = response.data;
    
        if (subscription.error) {
          setErrorMessage(subscription.error);
          setShowErrorModal(true);
          setLoading(false);
          return;
        }
    
        if (subscription) {
          // The subscription was created successfully
          setShowVerificationModal(true)
        } else {
          // Handle the scenario when subscription is null or undefined
          console.error("Subscription not created");
          setLoading(false);
        }
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  };

  function handleVerificationModalClose() {
    setShowVerificationModal(false)
    navigate("/user-profile")
  }


  return (
    <div className="subscription-page">
      {!isFormVisible ? (
        <div className="tier-list">
          {tiers.map((tier) => (
            <div key={tier.id} className="tier-card">
              <h2>{tier.name}</h2>
              <p>{tier.description}</p>
              <p className="price">Price: ${tier.price}</p>
              {tier.id !== user?.tierId ? (
              <button onClick={() => handleTierSelection(tier)}>Select</button>
              ) : (
                <button type="button" disabled>Current Tier</button>
              )
            }
            </div>
          ))}
        </div>
      ) : (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <label>Card information</label>
            <CardElement  />
            <label>Email</label>
            <input
              type="text"
              placeholder={user?.email}
              value={user?.email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={true}
            />
            <label>Name on card</label>
            <input
              type="text"
              placeholder="Name on card"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label>Country/Region</label>
            <input
              type="text"
              placeholder="Country of residence"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
            <label>button</label>
            <button type="submit" disabled={!stripe}>
              Subscribe
            </button>
          </form>
          {error && <div>{error}</div>}

          <div className="payment-security">
            <h2>Secure Payments</h2>
            <p>
              We value your privacy and use industry-standard practices to
              protect your information. For more details, see our{" "}
              <a href="/privacy-policy">Privacy Policy</a>.
            </p>
          </div>
        </div>
      )}
      {showVerificationModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Subscription Successful! 🎉</h3>
            <p>Thank you for subscribing to our platform! We're excited to have you on board. Get ready to explore all the amazing features and personalized learning paths we have to offer.</p>
            <button onClick={handleVerificationModalClose}>
            Close
            </button>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="error-modal">
          <div className="error-modal-content">
            {errorMessage}
            <button onClick={() => setShowErrorModal(false)}>
            Close
            </button>
          </div>
        </div>
      )}
    </div>
  );

}
