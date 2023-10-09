
import UserContext from "../../contexts/UserContext";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "../Api/axiosInstance";
import './AddPuzzle.css'

function AddPuzzle() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctOption, setCorrectOption] = useState(null);
  const [explanation, setExplanation] = useState("");
  const [area, setArea] = useState("");
  const [level, setLevel] = useState("");
  const [concept, setConcept] = useState("");

  const handleOptionChange = (index, value) => {
    setOptions(prevOptions => {
      const newOptions = [...prevOptions];
      newOptions[index] = value;
      return newOptions;
    });
  };

  const handleSubmit = async () => {
    try {
      // Construct puzzle data
      const puzzleData = {
        question,
        options,
        correctOption,
        explanation,
        area,
        level,
        concept
      };
      
      // Submit puzzle data to your API
      const response = await axios.post('/mcqs/add', puzzleData);
      
      // Navigate to another page if necessary
    } catch (error) {
      console.error('Error adding puzzle:', error);
    }
  };


  return (
    <div className="parent" >
 
      <form onSubmit={handleSubmit}>
        <div>
          <label>Area: </label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          />
        </div>
        <div>
          <label>Level: </label>
          <input
            type="text"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
        </div>
        <div>
            <label>Concept: </label>
            <input 
                type="text"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
            />
        </div>
        <div>
          <label>Question: </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <div>
          <label>Options: </label>
          {options.map((option, index) => (
            <div key={index}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              <input
                type="radio"
                name="correctOption"
                value={index}
                onChange={() => setCorrectOption(index)}
              />
            </div>
          ))}
        </div>
        <div>
          <label>Explanation: </label>
          <input
            type="text"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>
        <button type="submit">Add Puzzle</button>
      </form>
    </div>
  );
}

export default AddPuzzle;
