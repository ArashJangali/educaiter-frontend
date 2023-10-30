import React, { useEffect, useState, useContext} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../Api/axiosInstance";
import "../../index.css";
import "./Assessment.css";
import Select from "react-select";
import Sidebar from "../Sidebar/Sidebar";
import UserContext from "../../contexts/UserContext";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "lottie-react";
import correctAnimation from "../../assets/correct.json";
import incorrectAnimation from "../../assets/incorrect.json";
import placeholderCharacter from "../../assets/placeholderCharacter.json";
import { CSSTransition } from 'react-transition-group';


const Assessment = () => {
  const [topic, setTopic] = useState(null);
  const [language, setLanguage] = useState(null);
  const [level, setLevel] = useState(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [next, setNext] = useState(false);
  const {user, setUser} = useContext(UserContext)
  const navigate = useNavigate()
  const [result, setResult] = useState("");
  const [correct, setCorrect] = useState(null);
  const userId = user?._id
  const [apiLimitReached, setApiLimitReached] = useState(false);
  const [noAccess, setNoAccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);

 

  // List of topics the user can choose from
  const topics = [
    
      { value: "Software Development", label: "Software Development" },
      { value: "Web Development", label: "Web Development" },
      { value: "Mobile App Development", label: "Mobile App Development" },
      { value: "Data Science & Analytics", label: "Data Science & Analytics" },
      { value: "Machine Learning & AI", label: "Machine Learning & AI" },
      { value: "Game Dev", label: "Game Dev" },
      // { value: "Cloud Computing & DevOps", label: "Cloud Computing & DevOps" },
      // { value: "Cybersecurity", label: "Cybersecurity" },
      // { value: "Mathematics", label: "Mathematics" },
      // { value: "Blockchain & Cryptocurrency", label: "Blockchain & Cryptocurrency" },
      // { value: "Quantum Computing", label: "Quantum Computing" },
      // { value: "Augmented & Virtual Reality (AR/VR)", label: "Augmented & Virtual Reality (AR/VR)" },
      // { value: "Internet of Things (IoT)", label: "Internet of Things (IoT)" },
    ]
    
    const languages = [
      { value: 'JavaScript', label: 'JavaScript' },  // Relevant for Web Development
      { value: 'Python', label: 'Python' },  // Relevant for Web Development, Data Science, Machine Learning & AI
      { value: 'Java', label: 'Java' },  // Relevant for Web Development, Mobile App Development
      { value: 'Swift', label: 'Swift' },  // Relevant for Mobile App Development (iOS)
      { value: 'Kotlin', label: 'Kotlin' },  // Relevant for Mobile App Development (Android)
      { value: 'C++', label: 'C++' },  // Relevant for Software Development, Machine Learning
      { value: 'C%23', label: 'C#' },  // Relevant for Software Development, Mobile App Development, AR/VR
      { value: 'R', label: 'R' },  // Relevant for Data Science & Analytics
      { value: 'SQL', label: 'SQL' },  // Relevant for Data Science & Analytics, Web Development
      { value: 'Go', label: 'Go' },  // Relevant for Software Development, Cloud Computing & DevOps
      { value: 'Ruby', label: 'Ruby' },  // Relevant for Web Development
      { value: 'PHP', label: 'PHP' },  // Relevant for Web Development
      { value: 'TypeScript', label: 'TypeScript' },  // Relevant for Web Development
      { value: 'MATLAB', label: 'MATLAB' },  // Relevant for Data Science, Machine Learning & AI
      { value: 'Scala', label: 'Scala' },  // Relevant for Data Science, Machine Learning
      { value: 'Rust', label: 'Rust' },  // Relevant for Software Development
  ];

//   level

const levels = [
    { value: "Foundational", label: "Foundational" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
    // { value: "Doctorate", label: "Doctorate" },
    // { value: "Researcher", label: "Researcher" },
    { value: "Expert", label: "Expert" },
    { value: "Master", label: "Master" },
    // { value: "Master", label: "Master" },
    // { value: "Visionary", label: "Visionary" },
  ];

  useEffect(() => {
    
    if (topic && level && language) {
        setResult('')
      // Get a question from the server
      axios
        .get(`/assessment/generateQuestion/${language}/${topic}/${level}`, {
          withCredentials: true
          })
        .then((response) => {
          setQuestion(response.data.question);
          setLanguage(null)
          setLevel(null)
          setTopic(null)
        })
        .catch((error) => {
          console.error("Error fetching question:", error);
          if (
            error.response?.data.message ===
            "No credits left. Please upgrade."
          ) {
            setApiLimitReached(true);
          }
          else if (
            error.response?.data.message ===
            "Please select a subscription plan to access this resource." || 
            error.response?.data?.message === "Your subscription has expired. Please renew to continue."
          ) {
            setErrorMessage(error.response?.data.message);
            setNoAccess(true)
          }
        })
    }
  }, [topic, level, language]);

  const submitAnswer = () => {
    // Evaluate the answer on the server
    axios
      .post(`/assessment/evaluateAnswer/${language}/${topic}/${level}`, { answer, question, userId }, {
        withCredentials: true
      })
      .then((response) => {
        const correct = response.data.correct;

        if (correct) {
            setCorrect(true)
            setResult("correct");
          } else {
            setResult("incorrect");
          }
          setAnswer("");
      })
      .catch((error) => {
        console.error("Error evaluating answer:", error);
        if (
          error.response?.data.message ===
          "No credits left. Please upgrade."
        ) {
          setApiLimitReached(true);
        } else if (
          error.response?.data.message ===
          "Please select a subscription plan to access this resource." || 
          error.response?.data?.message === "Your subscription has expired. Please renew to continue."
        ) {
          setErrorMessage(error.response?.data.message);
          setNoAccess(true)
        }
      });
  };
  
  const handleTopicChange = (selectedOption) => {
    setTopic(selectedOption.value);
  };

  const handleLevelChange = (selectedOption) => {
    setLevel(selectedOption.value);
  };

  const handleLanguageChange = (selectedOption) => {
    setLanguage(selectedOption.value)
    console.log(selectedOption)
  }


  function onClose() {
    setApiLimitReached(false)
    setNoAccess(false)
    setErrorMessage(null);
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'blue' : 'black',
      padding: 2,
    }),
    menu: (provided, state) => ({
      ...provided,
      background: 'transparent',
    }),
    control: (provided) => ({
      ...provided,
      background: 'transparent',
      color: 'white',
      width: 150,
      border: '2px solid #646c7a',
      boxShadow: 'none',
      bottom: '5px',
  }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition, color: 'white' };
    }
  }

  return (
    <div className="assessment">
    <Sidebar />
      {apiLimitReached || noAccess ? (
        <div className="apilimit-modal-container">
          <span className="close-button" onClick={onClose}>
            ×
          </span>
          <div className="apilimit-modal">
          {apiLimitReached && "Subscription limit reached. Please "}

          {noAccess && errorMessage === "Please select a subscription plan to access this resource." && 
          "Please select a subscription plan to access this resource. "}

          {noAccess && errorMessage === "Your subscription has expired. Please renew to continue." &&
          "Your subscription has expired. Please renew to continue. "}

         
          <Link to="/subscription">Click here</Link> to manage your subscription.
          </div>
        </div>
      ) : (
        <div className="assessment-container">
          <h1 className="assessment-title"></h1>
          <div className="topic-selection">
            <Select styles={customStyles}
                    options={languages}
                    onChange={handleLanguageChange}
                    placeholder='Language'
           />
            <Select
              styles={customStyles}
              options={topics}
              onChange={handleTopicChange}
              placeholder="Topic"
            />
            <Select
              styles={customStyles}
              options={levels}
              onChange={handleLevelChange}
              placeholder="Level"
            />
      
          </div>
          
          
          {topic && (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
            {(result === 'correct')  && <Lottie
            data-aos="zoom-in"
            data-aos-duration="1100"
            className="lottie-quiz"
            animationData={correctAnimation}
            loop={true}
          />}
{(result === 'incorrect')  && <Lottie
            data-aos="zoom-in"
            data-aos-duration="1100"
            className="lottie-quiz"
            animationData={incorrectAnimation}
            loop={true}
          />}
          {(result === '')  && <Lottie
            data-aos="zoom-in"
            data-aos-duration="10"
            className="lottie-quiz"
            animationData={placeholderCharacter}
            loop={true}
          />}
           <div className="question-section">
              <p className="question">{question}</p>
            </div>
            </div>
           
          )}
        
          {!topic && (
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}><Lottie
            data-aos="fade-up"
            data-aos-duration="1500"
            className="lottie-quiz"
            animationData={placeholderCharacter}
            loop={true}
          />
            <div className="question-section">
              <p className="question">
                Please select a topic.
              </p>
            </div></div>
            
          )}
          
          <div className="assessment-input-container">
            <input
              className="assessment-answer-input"
              type="text"
              value={answer}
              onChange={(event) => setAnswer(event.target.value)}
              disabled={!question}
            />
            <button
              className="submit-button"
              onClick={submitAnswer}
              disabled={!question}
            >
              →
            </button>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default Assessment;
