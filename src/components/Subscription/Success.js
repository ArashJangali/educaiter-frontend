import React, {useState, useEffect} from 'react'
import './Success.css'
import { useNavigate } from 'react-router-dom';
import success from '../../assets/success.png'
import axios from '../Api/axiosInstance'
import { Link } from "react-router-dom";
import AOS from "aos";
import Lottie from "lottie-react";
import subSuccessAnimation from "../../assets/subSuccess.json";
import "aos/dist/aos.css";

export default function Success() {
  const navigate = useNavigate()

  const [userId, setUserId] = useState('')
  const [sessionId, setSessionId] = useState('')
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function getSessionId(){
      try {
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/me`)
          if(response) {
            setSessionId(response.data.sessionId)
            setUserId(response.data._id)
          }
      } catch(error){
        console.error(error)
        setErrorMessage('Error retrieving user info.');
        setShowErrorModal(true)
      }
    }
    getSessionId()
  }, [userId, sessionId])

  const handlePaymentSuccess= () => {
    axios.post(`${process.env.REACT_APP_BASE_URL}/api/payment-success`, {
      userId: userId,
      sessionId: sessionId
    })
    .then((res) => {

      navigate('/user-profile')
    })
    .catch(e => {
      console.error(e)
      setErrorMessage('An error occurred');
      setShowErrorModal(true)
    })
  }

  function onClose() {
    setShowErrorModal(false)
    setErrorMessage(null);
  }


  return (
    <div className='success'>
    {errorMessage ? (
        <div className="apilimit-modal-container">
          <span className="close-button" onClick={onClose}>
            ×
          </span>
          <div className="apilimit-modal">
          {errorMessage}
          <Link to="/subscription">Click here </Link> to retry.
          </div>
        </div>
      ): (
        <>
  
      <h2>Payment Successful!</h2>
      <Lottie
              data-aos="zoom-in"
              data-aos-duration="2200"
              className="sub-success-animation"
              animationData={subSuccessAnimation}
              loop={true}
              style={{ width: "15%", height: '55%', marginBottom: "-2em", marginTop: "-3em" }}
            />
      <button className='sub-success-btn' onClick={() => handlePaymentSuccess()}>Continue</button>
      </>
      )}
    </div>
  )
}
