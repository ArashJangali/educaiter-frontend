import React, { Suspense, useCallback, useMemo, useRef } from "react";

import { useNavigate } from "react-router-dom";
import "./Home.css";




export default function Home() {
  const navigate = useNavigate()

  function handleButtonClick() {
    navigate('/signup')
  }


  return (
    <div className="home">
      <header className="home-header">
        <h1>
          Welcome to educ<span STYLE="text-decoration:underline">AI</span>ter
        </h1>
        <p>Your personalized learning platform</p>
      </header>
      <main className="home-main">
       
        <section className="home-main-intro">
          <h2>Transform Your Learning Experience with educAIter</h2>
          <p>Experience personalized learning like never before.</p>
          <p>
            Understand your strengths, work on your weaknesses, and achieve your
            learning goals faster and more effectively.
          </p>
        
        </section>
        <section className="home-main-features">
          {/* <img className="feature-img" src={featureImg} /> */}
          <h3>Unique Features</h3>

          <div className="feature-card">
            <h4>AI-Powered Learning Experience:</h4>
            <p>
              <strong>Interactive Chat: </strong>
              <br />
              Engage with an AI tutor that adapts to your learning style. Choose
              from various avatars specialized in different subjects and
              customize their visual appearance.
            </p>
            <br />
            <p>
              <strong>Image Analysis: </strong>
              <br />
              Utilize Computer Vision to upload images of your homework or other
              visual materials for analysis and assistance in real-time.
            </p>
          </div>

          <div className="feature-card">
            <h4>Personalized Assessments and Quizzes:</h4>
            <p>
              <strong>Adaptive Quizzes: </strong>
              <br />
              Select your subject and difficulty level, and the AI will generate
              tailored quiz questions, providing immediate feedback and
              corrections.
            </p>
            <br />
            <p>
              <strong>Performance Tracking: </strong>
              <br />
              Your chat conversations and quiz results form the basis for
              ongoing assessment, ensuring a learning path that grows with you.
            </p>
          </div>

          <div className="feature-card">
            <h4>Strengths and Weaknesses Analysis:</h4>
            <p>
              <strong>Data Visualization: </strong>
              <br />
              Through intuitive graphs and charts, track your performance across
              various subjects to understand where you excel and where you need
              improvement.
            </p>
            <br />
            <p>
              <strong>Personalized Insights: </strong>
              <br />
              Gain valuable insights into your learning journey, backed by
              data-driven analysis of your strengths and weaknesses.
            </p>
          </div>
          <div className="feature-card">
            <h4>Intelligent Recommender System:</h4>
            <p>
              <strong>Focused Learning: </strong>
              <br />
              Based on your performance and areas of strength or weakness, the
              AI recommends specific areas to focus on.
            </p>
            <br />
            <p>
              <strong>Guided Path: </strong>
              <br />
              Receive personalized suggestions and resources, guiding you on the
              most efficient path towards achieving your learning goals.
            </p>
          </div>
        </section>

        <section className="home-main-cta">
          <h3>Ready to Revolutionize Your Learning?</h3>
          <button onClick={handleButtonClick}>Start Your Free Trial </button>
        </section>
      </main>
      <footer className="home-footer">Copyright © 2023 educAIter</footer>
    </div>
  );
}
