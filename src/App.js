import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import UserProfile from "./components/UserProfile/UserProfile";
import Chat from "./components/Chat/Chat";
import { UserProvider } from "./contexts/UserContext";
import Login from "./components/Login/Login"
import Signup from "./components/Signup/Signup";
import UserLoader from "./components/UserLoader/UserLoader";
import Assessment from "./components/Assessment/Assessment";
import Dashboard from "./components/Dashboard/Dashboard";
import Recommendation from "./components/Recommendation/Recommendation"
import Subscription from './components/Subscription/Subscription'
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import Success from "./components/Subscription/Success";
import Cancel from "./components/Subscription/Cancel";
import Puzzles from "./components/Puzzles/Puzzles";
import SetupStrategy from './components/Puzzles/StrategyRoom/SetupStrategy';
import StrategyRoom from './components/Puzzles/StrategyRoom/StrategyRoom'
import SetupBattle from './components/Puzzles/Battlefield/SetupBattle'
import Battlefield from './components/Puzzles/Battlefield/Battlefield'
import AddPuzzle from './components/Puzzles/AddPuzzle'
import ChooseOpponent from "./components/Puzzles/Battlefield/ChooseOpponent";
import BattleConfig from "./components/Puzzles/Battlefield/BattleConfig";
import AOS from 'aos';
import 'aos/dist/aos.css';



const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);



export default function App() {

    useEffect(() => {
        AOS.init({})
    }, [])

    
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  return (
      <UserProvider value={{ user, setUser, token, setToken }}>
          <Router>
              <Navbar />
              
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/user-profile" element={<UserLoader><UserProfile /></UserLoader>} />
                  <Route path="/chat" element={<UserLoader><Chat /></UserLoader>} />
                  <Route path="/assessment" element={<UserLoader><Assessment /></UserLoader>} />
                  <Route path="/dashboard" element={<UserLoader><Dashboard /></UserLoader>} />
                  <Route path="/insight" element={<UserLoader><Recommendation /></UserLoader>} />
                  <Route path="/puzzles" element={<UserLoader><Puzzles /></UserLoader>} />
                  <Route path="/setup/strategy" element={<UserLoader><SetupStrategy /></UserLoader>} />
                  <Route path="/strategy" element={<UserLoader><StrategyRoom /></UserLoader>} />
                  <Route path="/setup/battle" element={<UserLoader><ChooseOpponent /></UserLoader>} />
                  <Route path="/battle/config" element={<UserLoader><BattleConfig /></UserLoader>} />
                  <Route path="/battle" element={<UserLoader><Battlefield /></UserLoader>} />
                  <Route path="/addpuzzle" element={<UserLoader><AddPuzzle /></UserLoader>} />
                  <Route path="/subscription" element={ 
                      <Elements stripe={stripePromise}>
                          <UserLoader><Subscription /></UserLoader>
                      </Elements>} />
                  <Route path="/success" element={<UserLoader><Success /></UserLoader>} />
                  <Route path="/cancel" element={<UserLoader><Cancel /></UserLoader>} />
              </Routes>
          </Router>
      </UserProvider>
  );
}
