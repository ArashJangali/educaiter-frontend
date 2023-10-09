import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SetupStrategy.css";

function SetupStrategy() {
  const [selectedAreas, setSelectedAreas] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  const navigate = useNavigate();

  const areas = [
    { value: "Software Development", label: "Software Development" },
    { value: "Web Development", label: "Web Development" },
    { value: "Mobile App Development", label: "Mobile App Development" },
    { value: "Data Science & Analytics", label: "Data Science & Analytics" },
    { value: "Machine Learning & AI", label: "Machine Learning & AI" },
    // { value: "Cloud Computing & DevOps", label: "Cloud Computing & DevOps" },
    // { value: "Cybersecurity", label: "Cybersecurity" },
    // { value: "Mathematics", label: "Mathematics" },
    // {
    //   value: "Blockchain & Cryptocurrency",
    //   label: "Blockchain & Cryptocurrency",
    // },
    // { value: "Quantum Computing", label: "Quantum Computing" },
    // {
    //   value: "Augmented & Virtual Reality (AR/VR)",
    //   label: "Augmented & Virtual Reality (AR/VR)",
    // },
    // { value: "Internet of Things (IoT)", label: "Internet of Things (IoT)" },
  ];

  const levels = [
    { value: "Foundational", label: "Foundational" },
    { value: "Undergraduate", label: "Undergraduate" },
    { value: "Postgraduate", label: "Postgraduate" },
    // { value: "Doctorate", label: "Doctorate" },
    // { value: "Researcher", label: "Researcher" },
    { value: "Expert", label: "Expert" },
    // { value: "Master", label: "Master" },
    // { value: "Visionary", label: "Visionary" },
  ];

  return (
    <div className="parent">
    <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
    <button style={{background: 'transparent', border: 'none', boxShadow: 'none'}} onClick={() => navigate('/puzzles')}><img src='/icons/back.svg' style={{ width: '24px', height: '24px'}}/></button>
      <h1>Strategy Room</h1>
      </div>
    
      <img src="/icons/strategy.svg" className="icon" alt="Strategy Icon" />
      <div className="select-container">
        <div className="mission">
          <h3>Field</h3>
          <div className="scrollable-checkbox">
            {areas.map((area, index) => (
              <div key={area.value} className="checkbox-container">
                <input
                  type="checkbox"
                  id={`area-${index}`}
                  value={area.value}
                  className="hidden-checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAreas((prev) => [...prev, e.target.value]);
                    } else {
                      setSelectedAreas((prev) =>
                        prev.filter((item) => item !== e.target.value)
                      );
                    }
                  }}
                />
                <label htmlFor={`area-${index}`} className="label-checkbox">
                  {area.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="expertise">
          <h3>Expertise</h3>
          <div className="scrollable-checkbox">
            {levels.map((level, index) => (
              <div key={level.value} className="checkbox-container">
                <input
                  type="checkbox"
                  id={`level-${index}`}
                  value={level.value}
                  className="hidden-checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedLevels((prev) => [...prev, e.target.value]);
                    } else {
                      setSelectedLevels((prev) =>
                        prev.filter((item) => item !== e.target.value)
                      );
                    }
                  }}
                />
                <label htmlFor={`level-${index}`} className="label-checkbox">
                  {level.label}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        className="select-button"
        onClick={() => {
          navigate("/strategy", { state: { selectedAreas, selectedLevels } });
        }}
      >
        Generate
      </button>
    </div>
  );
}

export default SetupStrategy;
