import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import AOS from "aos";
import Lottie from "lottie-react";
import bronzeTier from "../../assets/bronze-tier.json";
import silverTier from "../../assets/silver-tier.json";
import goldTier from "../../assets/gold-tier.json";
import "aos/dist/aos.css";
import "./Pricing.css";

export default function Pricing({hideFooter}) {
  const [isToggled, setIsToggled] = useState(true);

    const navigate = useNavigate()

    const handleToggle = () => {
      setIsToggled(prevState => !prevState)
    }
  

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1>Choose Your Plan</h1>

        <p>Select the one that fits your needs. Cancel anytime.</p>
        <div className="toggle-container">
        <span className="toggle-text">Billed Monthly</span>
          <div className="toggle-slider">
            <input
              type="checkbox"
              className="slider-input"
              id="slider-toggle"
              checked={isToggled}
              onChange={handleToggle}
            />
            <label htmlFor="slider-toggle" className="slider-label"></label>
          </div>
          <span className="toggle-text">Billed Annually</span>
        </div>
      </div>
      <div className="pricing-cards-container">
        <div
          data-aos="flip-left"
          data-aos-duration="1400"
          className="pricing-card bronze"
        >
          <div className="card-top">
            <Lottie
              data-aos="fade-right"
              data-aos-duration="2200"
              className="plan-icon-animation"
              animationData={bronzeTier}
              loop={true}
              style={{ width: "55%", marginBottom: "-3em", marginTop: "-8em" }}
            />
            <h3 className="plan-name">Bronze</h3>
            <span className="no-cards-badge">No Card Required</span>
              
            <div className="span-container">
              {" "}
              <span className="plan-price">$0</span>
              <span className="plan-duration"> / Month</span>
            </div>

            <p className="plan-description">Dabbler</p>
          </div>
          <ul className="plan-features">
          <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>{isToggled ? '500 Credits' : '500 Credits'}</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to specialized tutor bots</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Performance dashboard</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to AI-generated puzzles</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to AI-generated flashcards</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Deep insights based on your past performance</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Quiz duels against bots and friends</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to rankings, badges, and leaderboards.</span>
              </li>
          </ul>
          <button onClick={() => navigate('/signup')} className="plan-btn">Get Started</button>
        </div>
        <div
          data-aos="fade-up"
          data-aos-duration="2000"
          className="pricing-card silver"
        >
          <div className="card-top">
          
            <Lottie
              data-aos="fade-down"
              data-aos-duration="2200"
              className="plan-icon-animation"
              animationData={silverTier}
              loop={true}
              style={{ width: "55%", marginBottom: "-3em", marginTop: "-8em" }}
            />
            {isToggled && <span className="most-popular-badge">Most Popular</span>}
            <h3 className="plan-name">Silver</h3>
            <div className="span-container">
              <span className="plan-price">{`$${isToggled ? 9.99 : 14.99}`}</span>
              <span className="plan-duration"> / Month</span>
            </div>
            
            {isToggled && <span className="discount-label">33% off</span>}
            <p className="plan-description">Most Bang For Your Buck</p>
          </div>
          <ul className="plan-features">
          <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>{isToggled ? '6000 Credits' : '6000 Credits'}</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to specialized tutor bots</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Performance dashboard</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to AI-generated puzzles</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to AI-generated flashcards</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Deep insights based on your past performance</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Quiz duels against bots and friends</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to rankings, badges, and leaderboards.</span>
              </li>
          </ul>
          <button onClick={() => navigate('/signup')} className="plan-btn">Get Started</button>
        </div>
        <div
          data-aos="flip-right"
          data-aos-duration="1400"
          className="pricing-card gold"
        >
          <div className="card-top">
            <Lottie
              data-aos="fade-left"
              data-aos-duration="2200"
              className="plan-icon-animation"
              animationData={goldTier}
              loop={true}
              style={{ width: "55%", marginBottom: "-3em", marginTop: "-8em" }}
            />
            <h3 className="plan-name">Gold</h3>
            {isToggled && (
                <span className="most-popular-badge">Best Value</span>
              )}
            <div className="span-container">
              <span className="plan-price">{`$${isToggled ? 14.99 : 19.99}`}</span>
              <span className="plan-duration"> / Month</span>
            </div>
            {isToggled && <span className="discount-label">25% off</span>}
            <p className="plan-description">You're Not Joking Around</p>
          </div>
          <ul className="plan-features">
          <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>{isToggled ? '12000 Credits' : '12000 Credits'}</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to specialized tutor bots</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Performance dashboard</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to AI-generated puzzles</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to AI-generated flashcards</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Deep insights based on your past performance</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Quiz duels against bots and friends</span>
              </li>
              <li>
                <img
                  src="/icons/check.svg"
                  alt="check-icon"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>Access to rankings, badges, and leaderboards.</span>
              </li>
          </ul>
          <button onClick={() => navigate('/signup')} className="plan-btn">Get Started</button>
        </div>
      </div>
     {!hideFooter && <Footer />} 
    </div>
  );
}
