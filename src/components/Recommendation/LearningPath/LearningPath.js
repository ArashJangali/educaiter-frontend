import React, {useContext, useEffect, useState} from 'react'
import axios from "../../Api/axiosInstance"
import UserContext from '../../../contexts/UserContext'
import Select from 'react-select';

import './LearningPath.css'

function LearningPath() {
  const [learningPath, setLearningPath] = useState([]);
  const {user, setUser} = useContext(UserContext)
  const {token, setToken} = useContext(UserContext)
  const userId = user?._id

  useEffect(() => {
    axios.get(`/recommendation/learningpath/${userId}`)
      .then(res => setLearningPath(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="learning-path">
      {learningPath.slice(0, 1).map((module, i) => (
        <div key={i} className={`module ${module.status}`}>
          <h2 className="module-title">Hmm..your weak area seems to be: {module?.topic}</h2>
          <ul>
          <li>You struggle with level: {module?.level}</li>
         
          <li>Suggested goals: {module?.goals}</li>
          <li>Recommended resources: {module?.references}</li>
          </ul>
          <div className="progress-bar-container">
            <div className="progress-bar" style={{width: `${module.progress}%`}}></div>
          </div>
          {module.status === 'current' && <button className="next-module-btn">Next Module</button>}
        </div>
      ))}
    </div>
  );

}

export default LearningPath;
