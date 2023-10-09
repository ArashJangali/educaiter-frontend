import React, { useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./BattleConfig.css";
import UserContext from "../../../contexts/UserContext";

function BattleConfig() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setUser } = useContext(UserContext);

  const friend = location.state?.friend;
  console.log(friend)

  return (
    <div className="parent">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <button
          style={{
            background: "transparent",
            border: "none",
            boxShadow: "none",
          }}
          onClick={() => navigate("/setup/battle")}
        >
          <img
            src="/icons/back.svg"
            style={{ width: "24px", height: "24px" }}
            alt="back icon"
          />
        </button>
        <h1>Game Setup</h1>
      </div>
{friend ? 

<div className="select-setup">
        <div className="random-setup">
          <div>
            <h3>You Set Up</h3>
            <button onClick={() => navigate('/battle')}>Select</button>
          </div>

          <img
            src={user?.picture}
            alt={`${user.name}'s profile`}
            style={{ width: "74px", height: "74px", borderRadius: '50px'}}
          />
        </div>

        <div className="custom">
          <div>
            <h3>Friend Sets Up</h3>
            <button>Select</button>
          </div>
          <img
            src="/icons/gear.png"
            style={{ width: "54px", height: "54px" }}
          />
        </div>



      </div> : 
      
      <div className="select-setup">
        <div className="random-setup">
          <div>
            <h3>Quick Game</h3>
            <button onClick={() => navigate('/battle')}>Select</button>
          </div>

          <img
            src="/icons/dice.png"
            style={{ width: "74px", height: "74px"}}
          />
        </div>

        <div className="custom">
          <div>
            <h3>Custom</h3>
            <button>Select</button>
          </div>
          <img
            src="/icons/gear.png"
            style={{ width: "54px", height: "54px" }}
          />
        </div>



      </div>}
      
    </div>
  );
}

export default BattleConfig;
