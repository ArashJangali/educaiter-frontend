import React, { useEffect, useState, useContext } from "react";
import Typewriter from "typewriter-effect";
import UserContext from "../../contexts/UserContext";
import axios from "../Api/axiosInstance";
import "./Recommendation.css";
import Flashcard from "./InteractiveLearning/Flashcard";
import { useNavigate, Link } from "react-router-dom";
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './DatePickerStyles.css';
import Select from "react-select";


export default function Recommendation() {
  const { user, setUser } = useContext(UserContext);
  const userId = user?._id;
  const [recommendation, setRecommendation] = useState("");
  const [incorrectAssessments, setIncorrectAssessments] = useState([]);
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [subject, setSubject] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [showFlashcards, setShowFlashcards] = useState(false);
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [apiLimitReached, setApiLimitReached] = useState(false);
  const [noAccess, setNoAccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);


  const topics = [
    { value: "Software Development", label: "Software Development" },
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile App Development", label: "Mobile App Development" },
    { value: "Data Science & Analytics", label: "Data Science & Analytics" },
    { value: "Machine Learning & AI", label: "Machine Learning & AI" },
    { value: "Cloud Computing & DevOps", label: "Cloud Computing & DevOps" },
    { value: "Cybersecurity", label: "Cybersecurity" },
    { value: "Mathematics", label: "Mathematics" },
    { value: "Blockchain & Cryptocurrency", label: "Blockchain & Cryptocurrency" },
    { value: "Quantum Computing", label: "Quantum Computing" },
    { value: "Augmented & Virtual Reality (AR/VR)", label: "Augmented & Virtual Reality (AR/VR)" },
    { value: "Internet of Things (IoT)", label: "Internet of Things (IoT)" },
  ];


  useEffect(() => {
    async function fetchRecommendation() {
      try {

        const formattedStartDate = `${startDate.getFullYear()}-${String(startDate.getMonth() + 1).padStart(2, '0')}-${String(startDate.getDate()).padStart(2, '0')}`;
        const formattedEndDate = `${endDate.getFullYear()}-${String(endDate.getMonth() + 1).padStart(2, '0')}-${String(endDate.getDate()).padStart(2, '0')}`;

        const response = await axios.get(
          `/recommendation/get-recommendation/${userId}`,
          {
            withCredentials: true,
            params: {
              subject: subject,
              startDate: formattedStartDate,
              endDate: formattedEndDate,
            },
          }
        );
        setIncorrectAssessments(response.data?.data.incorrectAssessments);

        setRecommendation(response.data.data.recommendations);
      } catch (error) {
        console.error(error);
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
      }

    }
    if(subject) {
      fetchRecommendation();
    }
  }, [userId, subject, startDate, endDate]);

  const handleSubjectButton = async (subjectName) => {
    setSubject(subjectName);
    setSelectedSubject(subjectName);
  };
 
  const handleTopicChange = async (subject) => {
    setSubject(subject.value);
    setSelectedSubject(subject.value);
   
  };

  const startFlashcards = async () => {
    setShowFlashcards(true)
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
      color: state.isSelected ? 'red' : 'white',
      padding: 20,
    }),
    menu: (provided, state) => ({
      ...provided,
      background: '#282c64',
      zIndex: 9999,
      overflow: 'auto',
    }),
    menuPortal: (provided) => ({ ...provided, zIndex: 9999 }),
    control: (provided) => ({
      ...provided,
      background: '#282c34',
      color: 'white',
      width: 200,
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
    <div className="recommendation-container">
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
      ): (
        <>
       
      
      <div className="date-picker-container">
      <ReactDatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <ReactDatePicker selected={endDate} onChange={(date) => setEndDate(date)} />
      <Select
           styles={customStyles}
           options={topics}
           onChange={handleTopicChange}
           placeholder="Topic"
           menuPortalTarget={document.body}
          menuPosition={'fixed'} 
         />
      </div>
     
      <div className="guide">
      
        <div className="incorrect-recommendation">
       
          <h4>
          
            <Typewriter
              options={{
                strings: ["Areas for Improvement"],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
          </h4>
          
          {subject ? (
            incorrectAssessments?.map((incorrectAssessment, index) => {
              const date = new Date(incorrectAssessment.timestamp);
              const formattedDate = `${date.getFullYear()}-${String(
                date.getMonth() + 1
              ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

              return (
                <div key={index}>
                  <div>
                    <Typewriter
                      options={{
                        strings: [
                          `Difficulty Level: ${incorrectAssessment.level}`,
                        ],
                        autoStart: true,
                        loop: false,
                        deleteSpeed: 9999999,
                        delay: 20,
                      }}
                    />
                  </div>
                  <div>
                    <Typewriter
                      options={{
                        strings: [
                          `Question Topic: ${incorrectAssessment.question}`,
                        ],
                        autoStart: true,
                        loop: false,
                        deleteSpeed: 9999999,
                        delay: 20,
                      }}
                    />
                  </div>
                  <div>
                    <Typewriter
                      options={{
                        strings: [`Assessment Date: ${formattedDate}`],
                        autoStart: true,
                        loop: false,
                        deleteSpeed: 9999999,
                        delay: 20,
                      }}
                    />
                  </div>
                  <br />
                </div>
              );
            })
          ) : (
            <div>Select a subject and date range to retrieve the latest 10 evaluations.</div>
          )}
        </div>
        <div className="recommendation">
          <h4>
            <Typewriter
              options={{
                strings: ["Personalized Recommendation"],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
          </h4>

          {recommendation ? (
            <div>
              <Typewriter
                options={{
                  strings: [`${recommendation}`],
                  autoStart: true,
                  loop: false,
                  deleteSpeed: 9999999,
                  delay: 10,
                  stopBlinkinOnComplete: true,
                }}
              />
            </div>
          ) : (
            <div>Suggestions will appear once a subject and a date are selected.</div>
          )}
        </div>
      </div>
      <button className="review-button" onClick={startFlashcards}>
        Want a quick review? Try these flashcards!
      </button>
      {showFlashcards && (
        <div className="flashcard-overlay">
        <span className="close material-symbols-outlined" onClick={() => setShowFlashcards(false)}>Close</span>
          <Flashcard
            showFlashcards={showFlashcards}
            setShowFlashcards={setShowFlashcards}
            userId={userId}
            recommendation={recommendation}
            apiLimitReached={apiLimitReached}
            noAccess={noAccess}
            errorMessage={errorMessage}
          />
        </div>
      )}
      </>
      )}
    </div>
  );
}
