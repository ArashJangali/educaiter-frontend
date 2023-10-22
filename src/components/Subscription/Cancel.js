
import React, {useState, useEffect} from 'react'
import './Cancel.css'
import { useNavigate } from 'react-router-dom';

import axios from '../Api/axiosInstance'
import AOS from "aos";
import Lottie from "lottie-react";
import cancelAnimation from "../../assets/cancel.json";
import "aos/dist/aos.css";

import './Cancel.css'

function Cancel() {
    const navigate = useNavigate()
  return (
    <div className='cancel'>
     
      <h2>Something Went Wrong!</h2>
      <Lottie
              data-aos="zoom-in"
              data-aos-duration="2200"
              className="cancel-animation"
              animationData={cancelAnimation}
              loop={true}
              style={{ width: "25%", height: '55%', marginBottom: "2em", marginTop: "-9em" }}
            />
      <button onClick={() => navigate('/subscription')}>Try again</button>
    </div>
  )
}

export default Cancel