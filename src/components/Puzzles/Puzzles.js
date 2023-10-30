import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../Api/axiosInstance";
import Select from "react-select";
import UserContext from "../../contexts/UserContext";
import "./Puzzles.css";
import Sidebar from "../Sidebar/Sidebar";

const Puzzles = () => {
    const navigate = useNavigate();

    const handlePuzzleClick = (puzzleType) => {
        navigate(`/setup/${puzzleType}`);
      };
      

  return (
    <div className="puzzle-container">
    <Sidebar />
    <div className="puzzle-parent"><h1>Puzzles</h1>
      {/* <div className="puzzle">
      <img src="/icons/training.svg" className="icon" />
        <div onClick={() => handlePuzzleClick('training')}>
          <h3>Training Ground</h3>
          <p>
            Hone your skills with a vast array of challenges designed to sharpen
            your strategic thinking. A place where warriors train to become
            heroes.
          </p>
        </div>
      </div> */}

      {/* <div className="puzzle">
      <img src="/icons/blitz.svg" className="icon" />
        <div>
          <div onClick={() => handlePuzzleClick('blitz')}>
            <h3>Blitz</h3>
            <p>
              Time is of the essence in this high-speed challenge. Race against
              the clock, solving puzzles at lightning speed to prove your
              mettle.
            </p>
          </div>
        </div>
      </div> */}


      <div className="puzzle">
      
      <img src="/icons/duel.svg" className="icon" />
        <div onClick={() => handlePuzzleClick('battle')}>
          <h3>Battlefield</h3>
          <p>
            Step onto the battlefield where you face off against fellow
            strategists in a duel of wits.
          </p>
        </div>
      </div>

      {/* <div className="puzzle">
      <img src="/icons/day.svg" className="icon" />
        <div onClick={() => handlePuzzleClick('daily')} >
          <h3>Daily Enigmas</h3>
          <p>
            Embark on a daily journey of intellectual conquest with puzzles that
            escalate in complexity as the week progresses.
          </p>
        </div>
      </div> */}

      <div className="puzzle">
      <img src="/icons/strategy.svg" className="icon" />
        <div onClick={() => handlePuzzleClick('strategy')}>
          <h3>Strategy Room</h3>
          <p>
            Take command in your personal strategy room, where you have the
            freedom to customize your training regimen. Handpick puzzles based
            on themes and difficulty levels.
          </p>
        </div>
      </div></div>
     
    </div>
  );
};

export default Puzzles;
