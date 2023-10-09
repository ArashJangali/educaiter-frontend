import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AOS from "aos";
import "./Home.css";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import Marquee from "react-fast-marquee";
import signUpAnimation from '../../assets/sign.json'

const HomePage = () => {
  const [openedFAQIndex, setOpenedFAQIndex] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    {
      question: "What is Educaiter?",
      answer:
        "Educaiter is an AI-powered platform that offers personalized learning experiences.",
    },
    {
      question: "Is it free to sign up?",
      answer:
        "Yes, it is completely free to sign up. We also offer limited features for free users.",
    },
    {
      question:
        "Can I use Educaiter without providing credit card information?",
      answer:
        "Absolutely! You can sign up and use our limited features without needing to provide any credit card details.",
    },
    {
      question: "What features are available for free users?",
      answer:
        "Free users can access a range of basic features, while some advanced AI-driven features are reserved for our premium users.",
    },
    {
      question: "What's your refund policy after 7 days?",
      answer:
        "If you're not satisfied with any premium features or plans you've purchased, you can request a full refund within 7 days of your purchase.",
    },
    {
      question: "Can I switch plans after signing up?",
      answer:
        "Of course! You can upgrade or downgrade your plan anytime through your account settings.",
    },
    {
      question: "How does the AI personalization work?",
      answer:
        "Our platform uses AI algorithms to understand your learning patterns and preferences, tailoring content to match your needs.",
    },
    {
      question: "What measures are in place for data safety?",
      answer:
        "Your data's integrity and security are paramount to us. We neither share it with third parties nor use it for ad targeting. Your security is our foremost commitment!",
    },
    {
      question: "How do you handle user privacy?",
      answer:
        "We respect user privacy and never sell or share personal information with third parties. For more details, please see our Privacy Policy.",
    },
    {
      question: "How can I get in touch for support?",
      answer:
        'You can reach out to our support team via the "Contact Us" section.',
    },
  ];

  const StarIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="gold"
      width="24"
      height="24"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  );

  

  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <video autoPlay loop muted playsInline>
          <source
            src="https://educaiter-hero.s3.amazonaws.com/educaiterHeroSection.mp4"
            type="video/mp4"
          />
        </video>
        <div className="hero-content">
          <button className="cta-signup" onClick={() => navigate("/signup")}>
            Start For Free
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <h2 className="about-headline">
          Empower Your Learning Journey with AI
        </h2>
        <p className="about-subheadline">
          Dive deep into the world of tech with Educaiter, your AI-driven
          companion.
        </p>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="features-grid">
          <div className="feature-row top-row">
            <div className="feature-column left-column">
              <div
                className="feature-item big"
                data-aos="fade-right"
                data-aos-duration="800"
              >
                <video autoPlay loop muted playsInline>
                  <source
                    src="https://educaiter-hero.s3.amazonaws.com/companion.mp4"
                    type="video/mp4"
                  />
                </video>
                <div>
                  <h3>AI Companion</h3>
                  <p>Chat with a tutor that recalls every talk.</p>
                </div>
              </div>
              <div className="feature-subgrid">
                <div
                  className="feature-item small"
                  data-aos="fade-right"
                  data-aos-duration="700"
                >
                  <video autoPlay loop muted playsInline>
                    <source
                      src="https://educaiter-hero.s3.amazonaws.com/puzzle.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div>
                    <h3>Solve AI-generated Puzzles</h3>
                    <p>
                      Solve ever-changing puzzles for an edge in the gaming
                      arena.
                    </p>
                  </div>
                </div>
                <div
                  className="feature-item small"
                  data-aos="fade-left"
                  data-aos-duration="700"
                >
                  <video autoPlay loop muted playsInline>
                    <source
                      src="https://educaiter-hero.s3.amazonaws.com/competition.mp4"
                      type="video/mp4"
                    />
                  </video>
                  <div>
                    <h3>Competitive Arena</h3>
                    <p>
                      Dive into challenges across various levels and areas.
                      Battle AI or friends
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="feature-column right-column">
              <div
                className="feature-item mid"
                data-aos="fade-left"
                data-aos-duration="800"
              >
                <video autoPlay loop muted playsInline>
                  <source
                    src="https://educaiter-hero.s3.amazonaws.com/learningmap.mp4"
                    type="video/mp4"
                  />
                </video>
                <div>
                  <h3>Personalized Learning Map</h3>
                  <p>
                    Navigate your growth with a tailored roadmap charting each
                    step to mastery.
                  </p>
                </div>
              </div>
              <div
                className="feature-item big"
                data-aos="zoom-in-right"
                data-aos-duration="900"
              >
                <video autoPlay loop muted playsInline>
                  <source
                    src="https://educaiter-hero.s3.amazonaws.com/insight.mp4"
                    type="video/mp4"
                  />
                </video>
                <div>
                  <h3>Evolving Insights</h3>
                  <p>Discover areas to focus and excel.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-row bottom-row">
            <div className="feature-column left-column">
              <div
                className="feature-item small"
                data-aos="zoom-in-left"
                data-aos-duration="900"
              >
                <video autoPlay loop muted playsInline>
                  <source
                    src="https://educaiter-hero.s3.amazonaws.com/progress.mp4"
                    type="video/mp4"
                  />
                </video>
                <div>
                  <h3>Progress Tracking</h3>
                  <p>Visualize growth with intuitive charts.</p>
                </div>
              </div>
            </div>
            <div className="feature-column center-column">
              <div
                className="feature-item mid"
                data-aos="flip-left"
                data-aos-duration="1000"
              >
                <video autoPlay loop muted playsInline>
                  <source
                    src="https://educaiter-hero.s3.amazonaws.com/ranking.mp4"
                    type="video/mp4"
                  />
                </video>
                <div>
                  <h3>Rise in Ranks</h3>
                  <p>
                    Ascend the leaderboard, collect badges, and amplify your
                    skills.
                  </p>
                </div>
              </div>
            </div>
            <div className="feature-column right-column">
              <div
                className="feature-item small"
                data-aos="flip-right"
                data-aos-duration="1000"
              >
                <video autoPlay loop muted playsInline>
                  <source
                    src="https://educaiter-hero.s3.amazonaws.com/flashcard.mp4"
                    type="video/mp4"
                  />
                </video>
                <div>
                  <h3>AI-Generated Flashcards</h3>
                  <p>
                    Revise and reinforce with cards tailored to your learning
                    pace.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works / Demo Video Section */}
      {/* <section className="how-it-works">
        <h2>How Educaiter Works</h2>
        <iframe title="demoVideo" src="" frameborder="0"></iframe>
      </section> */}

      {/* Testimonials Section */}
      <section className="review">
        <h2>What Our Users Think</h2>

        <Marquee
          speed={55}
          pauseOnHover={true}
          className="marquee"
          autoFill={true}
        >
          <div className="item">
            <div className="reviewer">
              <h3>Jordan A</h3>
              <img src="/Jordan.png" />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <div className="content">
              <p>
                With Educaiter, learning isn't just informative, it's
                interactive and competitive. The AI-driven puzzles have
                transformed study sessions into thrilling challenges.
              </p>
            </div>
          </div>

          <div className="item">
            <div className="reviewer">
              <h3>Carlos V</h3>
              <img src="/Carlos.png" />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <div className="content">
              <p>
                It's like Educaiter's AI knows me personally. It recalls our
                past interactions, making every session feel like a continuation
                of the last.
              </p>
            </div>
          </div>

          <div className="item">
            <div className="reviewer">
              <h3>Elena M</h3>
              <img src="/Elena.png" />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <div className="content">
              <p>
                The insights Educaiter provides are so intuitive. It’s as if the
                platform knows where I need to focus before even I do.
              </p>
            </div>
          </div>

          <div className="item">
            <div className="reviewer">
              <h3>Aditya S</h3>
              <img src="/Aditya.png" />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
            </div>
            <div className="content">
              <p>
                Educaiter brings a freshness to learning. The AI tailors
                everything to my needs, making it fun and ensuring I'm always on
                the right track.
              </p>
            </div>
          </div>
        </Marquee>
      </section>

      {/* FAQ */}
      <section className="faq" data-aos="fade-up">
        <div className="faq-div">
          <h2>Frequently Asked Questions</h2>
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <h4
                className="faq-question"
                onClick={() => {
                  setOpenedFAQIndex(openedFAQIndex === index ? null : index);
                }}
              >
                {faq.question}
              </h4>
              {openedFAQIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </section>
      <section className="cta">
        <div className="cta-div">
          <div
            data-aos="fade-right"
            data-aos-duration="1500"
            className="cta-content"
          >
            <h3>Unlock the Power of AI-Led Learning</h3>
            <p>
              Stay ahead in a fast-paced world. Learn faster, smarter, better.
              With AI by your side, expertise is within reach. Join us and seize
              your potential.
            </p>
            <button className="cta-signup" onClick={() => navigate("/signup")}>
              Start For Free
            </button>
          </div>
          <Lottie
            data-aos="fade-left"
            data-aos-duration="1500"
            className="cta-div-animation"
            animationData={signUpAnimation}
            loop={true}
          />
        </div>
      </section>
      {/* Footer */}
      <footer>
        
        <div className="footer-content">
          <div><h3>Educaiter</h3><p>About Us</p><p>Blog</p></div>
          <div><h3>Help & Support</h3><p>Contact Us</p></div>
          <div><h3>Socials</h3><p>X</p></div>
          <div><h3>Legal</h3><p>Terms of service</p><p>Privacy policy</p><p>Cookies policy</p></div>
        </div>
        <p className="paragraph">Copyright © 2023 Educaiter</p>
      </footer>
    </div>
  );
};

export default HomePage;
