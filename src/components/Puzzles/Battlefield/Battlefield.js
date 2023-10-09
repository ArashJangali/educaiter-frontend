import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../Api/axiosInstance";
import "./Battlefield.css";
import { motion } from "framer-motion"
import UserContext from "../../../contexts/UserContext";

function Battlefield() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedAreas = location.state?.selectedAreas;
  const selectedLevels = location.state?.selectedLevels;

  const [mcq, setMcq] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [correct, setCorrect] = useState(null);
  const [next, setNext] = useState(false);
  const [hintViewed, setHintViewed] = useState(false);
  const [secondTry, setSecondTry] = useState(false);
  const [loading, setLoading] = useState(true);
  const [optionSelected, setOptionSelected] = useState(false);
  const [retryClicked, setRetryClicked] = useState(0);
  const {user, setUser} = useContext(UserContext)
  const userId = user?._id

 
  useEffect(() => {
    const fetchMCQ = async () => {
      try {
        const response = await axios.get(
          `./mcqs/fetch/${selectedAreas}/${selectedLevels}?userId=${userId}`,
          {
            withCredentials: true
          }
        );
        setMcq(response?.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching MCQs", error);
        setLoading(false);
      }
    };

    fetchMCQ();
  }, [currentQuestionIndex]);

  let question,
    concept,
    level,
    options,
    hint,
    explanation,
    correctOption,
    _id,
    mcqId;

  if (mcq && mcq[currentQuestionIndex]) {
    ({
      question,
      concept,
      level,
      options,
      hint,
      explanation,
      correctOption,
      _id,
    } = mcq[currentQuestionIndex]);
    mcqId = _id;
  }
  

  const handleOptionClick = async (index, isCorrect) => {
    setOptionSelected(true);
    setSelectedOption({ index, isCorrect });
    if (isCorrect) {
      setCorrect(true);
      setCorrectAnswers((prev) => prev + 1);


      try {
        await axios.post("/mcqs/mcq-answer", { userId, mcqId, isCorrect });
      } catch (error) {
        console.error('Error submitting answer', error);
      }


    } else {
      setCorrect(false);
    }
  };

  const handleRetryClick = () => {
    setOptionSelected(false)
    setSecondTry(true);
    setCorrect(null);
    setSelectedOption(null)
    setRetryClicked(prev => prev + 1)
  };

  const handleNextClick = () => {
    if (currentQuestionIndex < mcq.length - 1) { 
        setCurrentQuestionIndex(prev => prev + 1);
      }
    setOptionSelected(false);
    setNext((prev) => !prev)
    setHintViewed(false)
    setCorrect(null)
    setSelectedOption(null)
    setShowExplanation(false)
    setSecondTry(false)
    setRetryClicked(0)
  }

  const performanceIcons = {
    Excellent: "/icons/excellent.svg",
    Good: "/icons/good.svg",
    NeedsImprovement: "/icons/improve.svg"
  };

  let performanceLevel;

  if (!hintViewed && !secondTry && correct) {
    performanceLevel = "Excellent";
  } else if ((hintViewed && retryClicked === 0 && correct) || (!hintViewed && retryClicked === 1 && correct)) {
    performanceLevel = "Good";
  } else if (retryClicked > 1 && correct) {
    performanceLevel = "NeedsImprovement";
  }


  if (loading) {
    return <div>Loading...</div>;
  }

  if (mcq.length === 0 || mcq[currentQuestionIndex] === undefined) {
    return <div>No questions available</div>;
  }

  


  


  return (
    <div className="strategy-room">
      <div className="header">Strategy Room</div>
      <motion.div initial={{ opacity:0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="question-section">
        <div className="question">
          Question {currentQuestionIndex + 1}: {question}
        </div>

        <div className="options">
          {options.map((option, index) => (
            <button
              key={index}
              disabled={optionSelected} 
              className={`option ${
                selectedOption?.index === index
                  ? selectedOption?.isCorrect
                    ? "correct"
                    : "incorrect"
                  : ""
              }`}
              onClick={() => handleOptionClick(index, index === correctOption)}
            >
              {option}
            </button>
          ))}
        </div>
<div className="middle-section">
        <div className="hint-section">
          {showHint && <div>Hint: {hint}</div>}
        </div>

        <div className="explanation-section">
          {showExplanation && <div>{explanation}</div>}
        </div>

        { correctAnswers !== 0 && <div className="score-section"> {Array(correctAnswers).fill().map((_, index) => (
            <img key={index} src="/icons/correct.svg" style={{ width: '21px', height: '21px'}}/>
        ))}</div>}

        <div className="performance">{performanceLevel && <img src={performanceIcons[performanceLevel]} alt={performanceLevel} style={{ width: '40px', height: '40px'}}  />}</div>

        <div className="concept-level-container">
            <div className="concept">Concept: {concept}</div>
            <div className="level">Level: {level}</div>
        </div>
</div>
        <div className="navigation-buttons">
          <button onClick={() => navigate("/setup/strategy")}><img src="/icons/exit.svg" style={{ width: '24px', height: '24px'}} /></button>
          {correct === null && (
            <button onClick={() => { setShowHint((prev) => !prev); setHintViewed(true) }}><img src="/icons/hint.svg" style={{ width: '24px', height: '24px' }} /></button>)}
          {correct !== null && (
            <button onClick={() => setShowExplanation((prev) => !prev)}>
            <img src="/icons/explanation.svg" style={{ width: '24px', height: '24px' }} />
            </button>
          )}
          {(correct === false) && <button onClick={handleRetryClick}><img src="/icons/retry.svg" style={{ width: '24px', height: '24px'}} /></button>}
          {correct !== null && (
            <button
              onClick={handleNextClick}><img src="/icons/next.svg" style={{ width: '24px', height: '24px'}} /></button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default Battlefield;
