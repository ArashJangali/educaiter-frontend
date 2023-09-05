
import React, {useState, useEffect} from 'react'
import './Cancel.css'
import { useNavigate } from 'react-router-dom';
import cancel from '../../assets/cancel.png'
import axios from '../Api/axiosInstance'

import './Cancel.css'

function Cancel() {
    const navigate = useNavigate()
  return (
    <div className='cancel'>
      <div className="img-container">
        <img src={cancel} />
      </div>
      <h2>Something Went Wrong!</h2>
      <button onClick={() => navigate('/')}>Go To Homepage</button>
    </div>
  )
}

export default Cancel