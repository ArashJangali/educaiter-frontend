import React, { useState, CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/react";
import "./ChooseOpponent.css";

function ChooseOpponent() {

    const loaderStyles = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;

  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#36d7b7");
  const [friend, setFriend] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);


 

    const handleRandomOpponent = () => {
        setModalContent('randomOpponent');
        setIsModalOpen(true);
      };
    
      const handleFriendOpponent = () => {
        setModalContent('friend');
        setIsModalOpen(true);
      };
    
      const handleLeaderboardOpponent = () => {
        setModalContent('leaderboard');
        setIsModalOpen(true);
      };


  return (
    <div className="parent">
      {isModalOpen && (
        <div className="modal">
          {modalContent === "randomOpponent" && (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
              <p>Finding your opponent...</p>
              <GridLoader
                color={color}
                loading={loading}
                css={loaderStyles}
                size={15}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              {/* Maybe a spinner */}
            </div>
          )}
          {modalContent === "friend" && (
            <div>
              <h3>Invite a Friend</h3>
              {/* <input type="text" placeholder="Search a friend" />
              <button>Invite a Friend</button> */}
            </div>
          )}
          {modalContent === "leaderboard" && (
            <div>
              <h3>Select Opponent from Leaderboard</h3>
              {/* Interface to select an opponent from the leaderboard */}
            </div>
          )}
        </div>
      )}

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
          onClick={() => navigate("/puzzles")}
        >
          <img
            src="/icons/back.svg"
            style={{ width: "24px", height: "24px" }}
            alt="back icon"
          />
        </button>
        <h1>Choose Opponent</h1>
      </div>

      <div className="select-opponent">
        <div className="random-opponent">
          <div>
            <h3>Random Opponent</h3>
            <button onClick={handleRandomOpponent}>Select</button>
          </div>

          <img
            src="/icons/random-person.svg"
            style={{ width: "94px", height: "94px", color: "white" }}
          />
        </div>

        <div className="friend-opponent">
          <div>
            <h3>Play a Friend</h3>
            <button onClick={handleFriendOpponent}>Select</button>
          </div>
          <img
            src="/icons/friends.svg"
            style={{ width: "74px", height: "74px" }}
          />
        </div>

        <div className="leaderboard-opponent">
          <div>
            <h3>From Leaderboard</h3>
            <button onClick={handleLeaderboardOpponent}>Select</button>
          </div>
          <img
            src="/icons/leaderboard-opponent.svg"
            style={{ width: "74px", height: "74px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default ChooseOpponent;
