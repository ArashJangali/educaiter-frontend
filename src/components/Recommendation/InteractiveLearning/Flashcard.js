import React, { useState, useContext, useEffect } from "react";
import Typewriter from "typewriter-effect";
import UserContext from "../../../contexts/UserContext";
import axios from "../../Api/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import "./Flashcard.css";

export default function Flashcard({
  showFlashcards,
  setShowFlashcards,
  userId,
  recommendation,

}) {

  
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [apiLimitReached, setApiLimitReached] = useState(false);
  const [noAccess, setNoAccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);



 
  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const response = await axios.get(
          `/recommendation/get-flashcards/${userId}`,
          {
            withCredentials: true,
            params: {
              recommendation: recommendation,
            },
          }
        );
        setFlashcards(response.data?.flashcards);
      } catch (error) {
        console.error(error);
        if (
          error.response?.data.message ===
          "Usage limit reached. Please upgrade."
        ) {
          setApiLimitReached(true);
        } else if (
          error.response?.data.message ===
          "Please select a subscription plan to access this resource." || 
          error.response?.data?.message === "Your subscription has expired. Please renew to continue."
        ) {
          setErrorMessage(error.response?.data.message);
          setNoAccess(true)
        }
      }
    }

    fetchFlashcards();
  }, [showFlashcards]);



  const currentFlashcard = flashcards[index];
 
  function onClose() {
    setApiLimitReached(false)
    setNoAccess(false)
    setErrorMessage(null);
  }


  return (
    <div>
      {apiLimitReached || noAccess ? (
        <div className="apilimit-modal-container">
          <span className="close-button" onClick={onClose}>
            ×
          </span>
          <div className="apilimit-modal">
            {apiLimitReached && "Subscription limit reached. Please "}

            {noAccess && errorMessage === "Please select a subscription plan to access this resource." && "Please select a subscription plan to access this resource. "}

            {noAccess && errorMessage === "Your subscription has expired. Please renew to continue." && "Your subscription has expired. Please renew to continue. "}

            <Link to="/subscription">Click here</Link> to manage your subscription.
          </div>
        </div>
      ) : null}
      {(!flashcards || flashcards.length === 0) ?  <div>Loading...</div>
      : (
      <div className="card-container">
      
        <div className={flipped ? "card flipped" : "card"} onClick={() => setFlipped(!flipped)}>
          <div className="side front">{currentFlashcard?.question}</div>
          <div className="side back">{currentFlashcard?.answer}</div>
        </div>
        <div className="card-buttons">
          <button className="next" onClick={() => setIndex((prevIndex) => (prevIndex + 1) % flashcards.length)}>
            ←
          </button>
          <button className="previous" onClick={() => setIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length)}>
            →
          </button>
        </div>
      </div>
      )}
    </div>
  );
}
