import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import aboutAnimation from "../../assets/about.json";
import "./About.css";

export default function About() {
  return (
    <div className="about-container">
      <div className="about-header">
        <h1>About Educaiter</h1>
        <p>
          Embark on a transformative learning journey in the world of
          technology. Whether you're a novice or an expert, Educaiter tailors
          its offerings to suit your needs.
        </p>
      </div>
      <div className="about-body">
        <div className="content"       data-aos="fade-right"
            data-aos-duration="1500">
          <p>
            At Educaiter, we leverage the power of AI to offer an unparalleled
            learning experience. Through our interactive, gamified puzzles,
            learners can immerse themselves in challenging scenarios that test
            and improve their skills.
          </p>
          <p>
            Our unique AI chatbot serves as your dedicated tutor, remembering
            every interaction. It intelligently analyzes your quiz results,
            discussions, and progress to recommend the most suitable learning
            paths forward. With its deep insights, the AI pinpoints areas you
            should focus on, ensuring you spend your time efficiently.
          </p>
          <p>
            Beyond learning, Educaiter offers a myriad of features to keep
            learners engaged. Dive into our competitive arena, challenge AI or
            friends, and see where you stand. Visualize your progress through
            intuitive charts, and let our AI generate flashcards tailored to
            your learning pace.
          </p>
          <p>
            With Educaiter, you're not just learning; you're evolving. Every
            feature, from our personalized learning maps to our evolving
            insights, is designed to ensure you're always moving forward. Start
            your journey with Educaiter today and experience the future of tech
            education.
          </p>
        </div>
        <div className="about-animation">
          <Lottie
            data-aos="fade-up"
            data-aos-duration="1500"
            className="lottie-about"
            animationData={aboutAnimation}
            loop={true}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}
