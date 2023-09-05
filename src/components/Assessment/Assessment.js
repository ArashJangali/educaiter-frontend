import React, { useEffect, useState, useContext} from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../Api/axiosInstance";
import "../../index.css";
import "./Assessment.css";
import Select from "react-select";
import UserContext from "../../contexts/UserContext";
import { CSSTransition } from 'react-transition-group';


const Assessment = () => {
  const [topic, setTopic] = useState(null);
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
    { value: "Computer Science", label: "Computer Science" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Design", label: "Design" },
    { value: "Digital Marketing", label: "Digital Marketing" },
    { value: "Law", label: "Law" },
    { value: "Finance", label: "Finance" },
    { value: "Entrepreneurship", label: "Entrepreneurship" },
    { value: "Accounting", label: "Accounting" },
    { value: "Life Science", label: "Life Science" },
    { value: "Physical Science", label: "Physical Science" },
    { value: "Philosophy", label: "Philosophy" },
    { value: "Psychology", label: "Psychology" },
  ];

//   level

const levels = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  useEffect(() => {
    
    if (topic && level) {
        setResult('')
      // Get a question from the server
      axios
        .get(`/assessment/generateQuestion/${topic}/${level}`, {
          withCredentials: true
          })
        .then((response) => {
          setQuestion(response.data.question);
        })
        .catch((error) => {
          console.error("Error fetching question:", error);
          if (
            error.response?.data.message ===
            "Usage limit reached. Please upgrade."
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
  }, [topic, level]);

  const submitAnswer = () => {
    // Evaluate the answer on the server
    axios
      .post(`/assessment/evaluateAnswer/${topic}/${level}`, { answer, question, userId }, {
        withCredentials: true
      })
      .then((response) => {
        const correct = response.data.correct;

        if (correct) {
            setCorrect(true)
            setResult("Correct!");
          } else {
            setResult("Incorrect. Try again!");
          }
          setAnswer("");
      })
      .catch((error) => {
        console.error("Error evaluating answer:", error);
        if (
          error.response?.data.message ===
          "Usage limit reached. Please upgrade."
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



  function onClose() {
    setApiLimitReached(false)
    setNoAccess(false)
    setErrorMessage(null);
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px dotted pink',
      color: state.isSelected ? 'red' : 'white',
      padding: 2,
    }),
    menu: (provided, state) => ({
      ...provided,
      background: '#282c34',
    }),
    control: (provided) => ({
      ...provided,
      background: '#282c34',
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
        <>
          <h1 className="assessment-title"></h1>
          <div className="topic-selection">
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
            <div className="question-section">
              <p className="question">{question}</p>
            </div>
          )}
          <div className={`result ${correct ? "correct" : "incorrect"}`}>
            {result}
          </div>
          {!topic && (
            <div className="question-section">
              <p className="question">
                Please select a topic to begin the assessment.
              </p>
            </div>
          )}
          <div className="input-container">
            <input
              className="answer-input"
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
              Submit Answer
            </button>
          </div>
        </>
      )}
    </div>
  );
  
};

export default Assessment;
