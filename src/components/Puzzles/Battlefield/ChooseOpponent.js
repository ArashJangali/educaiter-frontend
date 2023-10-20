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
     const handleCloseModal = () => {
      setModalContent('');
        setIsModalOpen(false);
     }

  return (
    <div className="parent">
      {isModalOpen && (
        <div className="modal">
          {modalContent === "randomOpponent" && (
            
            <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
            <button style={{background: 'transparent', color: color}} onClick={handleCloseModal}>❌</button>
              <h3>Finding your opponent...</h3>
              <p style={{background: 'transparent', color: color}}>This feature is not available yet. Coming soon. 😊</p>
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
            <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
            <button style={{background: 'transparent', color: color}} onClick={handleCloseModal}>❌</button>
              <h3>Invite a Friend</h3>
              <p style={{background: 'transparent', color: color}}>This feature is not available yet. Coming soon. 😊</p>
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
          {modalContent === "leaderboard" && (
            <div style={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
            <button style={{background: 'transparent', color: color}} onClick={handleCloseModal}>❌</button>
              <h3>Select Opponent from Leaderboard</h3>
              <p style={{background: 'transparent', color: color}}>This feature is not available yet. Coming soon. 😊</p>
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
            style={{ width: "24px", height: "24px", marginTop: '50px' }}
            alt="back icon"
          />
        </button>
        <h1 style={{marginTop: '70px' }}>Choose Opponent</h1>
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
