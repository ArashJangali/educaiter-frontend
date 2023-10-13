import React from "react";
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

    const navigate = useNavigate()

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1>Choose Your Plan</h1>

        <p>Select the one that fits your needs. Cancel anytime.</p>
      </div>
      <div className="pricing-cards-container">
        <div
          data-aos="flip-left"
          data-aos-duration="1400"
          className="pricing-card"
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
              <span>Access to basic chatbots.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Basic performance dashboard.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Limited access to AI-generated puzzles.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>General flashcards on fundamentals.</span>
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
            <h3 className="plan-name">Silver</h3>
            <div className="span-container">
              <span className="plan-price">$9.99</span>
              <span className="plan-duration"> / Month</span>
            </div>
            <p className="plan-description">Most Bang For Your Buck</p>
          </div>
          <ul className="plan-features">
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Access to specialized bots.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Personalized Learning Map.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Insights based on your past performance.</span>
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
          className="pricing-card"
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
            <div className="span-container">
              <span className="plan-price">$14.99</span>
              <span className="plan-duration"> / Month</span>
            </div>
            <p className="plan-description">You're Not Joking Around</p>
          </div>
          <ul className="plan-features">
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Exclusive chat with expert-level bots</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>In-depth performance review.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Unlimited challenges against bots or friends.</span>
            </li>
            <li>
              <img
                src="/icons/check.svg"
                alt="check-icon"
                style={{ width: "16px", height: "16px" }}
              />
              <span>Flashcards based on areas you need to improve.</span>
            </li>
          </ul>
          <button onClick={() => navigate('/signup')} className="plan-btn">Get Started</button>
        </div>
      </div>
     {!hideFooter && <Footer />} 
    </div>
  );
}
