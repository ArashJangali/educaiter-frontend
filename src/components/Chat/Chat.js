import React, { useState, useEffect, useContext } from "react";
import Carousel from "./Carousel";
import UserContext from "../../contexts/UserContext";
import Typewriter from "typewriter-effect";
import { Link, useNavigate } from "react-router-dom";
import Select from "react-select";
import axios from "../Api/axiosInstance";
import AOS from "aos";
import "aos/dist/aos.css";
import "./Chat.css";
import "../../index.css";
const Avatar = require("cartoon-avatar");




const Chat = () => {
  const { user, setUser } = useContext(UserContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [colorMode, setColorMode] = useState(false);
  const [role, setRole] = useState({});
  const [avatarUrl, setAvatarUrl] = useState(
    "https://sp-ao.shortpixel.ai/client/to_auto,q_lossy,ret_img,w_1539,h_1069/https://h-o-m-e.org/wp-content/uploads/2022/04/Blank-Profile-Picture-1.jpg"
  );
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [summaryOfConvos, setSummaryOfConvos] = useState();
  const [showModal, setShowModal] = useState(false);
  const [selectedConvo, setSelectedConvo] = useState(null);
  const userId = user?._id;
  const [currentConvoId, setCurrentConvoId] = useState('');
  const [apiLimitReached, setApiLimitReached] = useState(false);
  const [noAccess, setNoAccess] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleColorMode = () => {
    setColorMode(!colorMode);
  };

  const roles = [
    { value: "Code Maestro", label: "Code Maestro" }, 
    { value: "Web Wizard", label: "Web Wizard" },
    { value: "App Artisan", label: "App Artisan" }, 
    { value: "Data Detective", label: "Data Detective" }, 
    { value: "AI Architect", label: "AI Architect" }, 
    // { value: "Cloud Commander", label: "Cloud Commander" }, 
    // { value: "Cyber Sentinel", label: "Cyber Sentinel" },
    // { value: "Math Magician", label: "Math Magician" }, 
    // { value: "Blockchain Baron", label: "Blockchain Baron" }, 
    // { value: "Quantum Quester", label: "Quantum Quester" }, 
    // { value: "AR/VR Voyager", label: "AR/VR Voyager" }, 
    // { value: "IoT Innovator", label: "IoT Innovator" }, 
  ];

  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const [previousChat, setPreviousChat] = useState([]);
  const [currentTitle, setCurrentTitle] = useState(null);
  const [avatarState, setAvatarState] = useState(false);

  const handleNewAvatar = () => {
    const newAvatarUrl = Avatar.generate_avatar();
    setAvatarUrl(newAvatarUrl);
  };

  const createNewSearch = () => {
    setMessage(null);
    setValue("");
    setCurrentTitle(null);
  };


  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(`/api/chat/chat-history/${userId}`, {
        withCredentials: true,
        params: {
          sidebarSearch: sidebarSearch,
        },
      });
     
      setChatHistory(response.data?.history || response.data?.receivedContent);
      setSummaryOfConvos(response.data?.summaryOfConvos || response.data?.receivedContent);
      
    } catch (error) {
      console.error(error)
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
    }
  };

  const sidebarSearchClicked = () => {
    fetchChatHistory();
  };

  const handleImgSubmit = async (event) => {
    const imageFile = event.target.files[0];

    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/chat/analyze-image`,
        formData
      );
      const data = response.data;
      setValue(data.text);
      await getMessages(
        `This is text extracted from an image. Can you explain what you see: ${data.text}`
      );
    } catch (error) {
      console.error(error);
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
    }
  };


  const [hasIntroduced, setHasIntroduced] = useState(false);
 
  const handleRoleSelected = (selectedRole) => {
    setRole(selectedRole);
  }

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value,
        userId: user._id,
        convoId: currentConvoId,
        role: role,
        hasIntroduced: hasIntroduced,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    console.log("Sending request with data: ", options);
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/api/chat/completions`, options)
      .then(response => {
        if(!response.ok){
          return response.text().then(text => {
            throw new Error(text);
          });
        }
        return response.json();
      })
      .then(data => {
        const { data: responseData, convoId } = data;
  
        if (!hasIntroduced) {
          setHasIntroduced(true);
        }
  
        setMessage(responseData.choices[0].message);
        setCurrentConvoId(convoId);
      })
    } catch (error) {
      console.error(error);
      const errorMessage = JSON.parse(error.message).message;
      if (errorMessage === "Usage limit reached. Please upgrade.") {
          setApiLimitReached(true);
      } else if (
          errorMessage === "Please select a subscription plan to access this resource." ||
          errorMessage === "Your subscription has expired. Please renew to continue."
      ) {
          setErrorMessage(errorMessage);
          setNoAccess(true)
      }
    }
  };


useEffect(() => {
  if (!currentTitle && message && value) {
    setCurrentTitle(value);
  }
  if (currentTitle && value && message) {
    // Check if the previousChat already contains the current message and value
    const alreadyExists = previousChat.some(chat => chat.content === value || chat.content === message.content);
    if (!alreadyExists) {
      setPreviousChat((prevChat) => [
        ...prevChat,
        {
          title: currentTitle,
          role: "Me",
          content: value,
          timestamp: Date.now(),
        },
        {
          title: currentTitle,
          role: role.value,
          content: message.content,
          timestamp: Date.now(),
        },
      ]);
    }
  }
}, [message, currentTitle, value]);

console.log(role)

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle);
    setMessage(null);
    setValue("");
  };

  const handleBackToSearchInput = () => {
    setAvatarState(!avatarState);
  };

  const currentChat = previousChat.filter(
    (prevChat) => prevChat.title === currentTitle
  );
  const uniqueTitles = Array.from(
    new Set(previousChat.map((prevChat) => prevChat.title))
  );

  const handleRoleChange = (selectedOption) => {
    setRole(selectedOption);
  };

  const viewFullConversation = (convoObject) => {
    setSelectedConvo(convoObject);
    setShowModal(true);
  };

  const Modal = ({ convoObject, summaryOfConvos, onClose }) => (
    <div className="modal">
      <div className="modal-content">
        <span className="close-button" onClick={onClose}>
          ×
        </span>
        <div className="summary">
          <h3>
            <Typewriter
              options={{
                strings: [`${summaryOfConvos?.title}` || ''],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
          </h3>
          <p>
            <Typewriter
              options={{
                strings: [`Topics We Discussed:` || ''],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
            <br />
            <Typewriter
              options={{
                strings: [`${summaryOfConvos?.topics}` || ''],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
          </p>
          <p>
            <Typewriter
              options={{
                strings: [`Your Interests:` || ''],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
            <br />
            <Typewriter
              options={{
                strings: [`${summaryOfConvos?.interests}` || ''],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
          </p>
          <p>
            <Typewriter
              options={{
                strings: [`Strengths:`],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
            <br />
            <Typewriter
              options={{
                strings: [`${summaryOfConvos?.strengths}` || ''],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
          </p>
          <p>
            <Typewriter
              options={{
                strings: [`Areas for Improvement:`],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
            <br />
            <Typewriter
              options={{
                strings: [`${summaryOfConvos?.improvementAreas}` || ''],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
          </p>
          <p>
            {" "}
            <Typewriter
              options={{
                strings: [`Your Engagement Level:`],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
            <br />
            <Typewriter
              options={{
                strings: [`${summaryOfConvos?.engagementLevel}` || ''],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
          </p>

          <hr />
        </div>
        <div className="scrollable-content">
        <h4>
            <Typewriter
              options={{
                strings: ['Chat History'],
                autoStart: true,
                loop: false,
                deleteSpeed: 9999999,
                delay: 20,
              }}
            />
            </h4>
          {convoObject.convo?.map((message, index) => (
            <div className="modal-message-items" key={index}>
              <Typewriter
                options={{
                  strings: [`${message.role === "user" ? "Me" : "AI"}` || ''],
                  autoStart: true,
                  loop: false,
                  deleteSpeed: 9999999,
                  delay: 20,
                }}
                style={{
                  color: message.role === "user" ? "blue" : "red",
                }}
              />

              <br />
              <Typewriter
                options={{
                  strings: [`- ${message.content}` || summaryOfConvos],
                  autoStart: true,
                  loop: false,
                  deleteSpeed: 9999999,
                  delay: 20,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  function onClose() {
    setApiLimitReached(false)
    setNoAccess(false)
    setErrorMessage(null);
  }

  return (
    <div className="chat">
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
      <section className={`side-bar ${sidebarOpen ? "open" : ""}`}>
    
        {/* list categories */}

        {/* useful links based on the convo the ai fills this section with helpful links */}
        {/* badges, ranks, levels */}
     

       <div className="search-and-avatar">
            <div className="visible-avatar">
              <Select
                options={roles}
                onChange={handleRoleChange}
                placeholder="Role"
              />
              <img
                className="chat-avatar"
                src={avatarUrl}
                onClick={handleNewAvatar}
                alt="Chat Avatar"
              />
            </div>
          
            <div className="sidebar-search-container">
                <input
                  onChange={(e) => setSidebarSearch(e.target.value)}
                  value={sidebarSearch}
                  placeholder="Chat History"
                  type="text"
                  className="sidebar-input"
                />
                <button
                  className="sidebar-search-btn"
                  onClick={sidebarSearchClicked}
                  type="submit"
                >
                  🔎
                </button>
              </div>
              </div>
            <div className="chat-history" >
              {showModal && (
                <Modal
                  convoObject={selectedConvo}
                  summaryOfConvos={summaryOfConvos}
                  onClose={() => setShowModal(false)}
                />
              )}
              
              
              {chatHistory?.map((convoObject, index) => (
                <div
                  key={index}
                  className="chat-history-item"
                  onClick={() => viewFullConversation(convoObject)}
                >
                  <Typewriter
                    options={{
                      strings: [`☞ ${summaryOfConvos.title}` || 'Previous chat'],
                      autoStart: true,
                      loop: false,
                      deleteSpeed: 9999999,
                      delay: 20,
                    }}
                  />
                </div>
              ))}
            </div>
    

      </section>
      <section className='main'>
      
      <div className="message-area" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}><ul className="feed">
          {currentChat?.map((chatMessage) => (
            
            <li
              className={`message ${
                chatMessage.role === "Me" ? "user-message" : "ai-message"
              }`}
              key={chatMessage.timestamp}
            >
              <div data-aos={chatMessage.role === "Me" ? "fade-down-left" : "fade-down-right"} className="chat-bubble">
                <p>{chatMessage.content}</p>
            </div>
            </li>
          ))}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
         
              }}
            />
            <div className="img-label-input-submitbtn">
            {/* <label for="img" className="custom-file-upload">
              Image
            </label> */}
            {/* <input
              id="img"
              type="file"
              name="img"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImgSubmit}
            /> */}

            <div id="submit" onClick={getMessages}>
              Submit
            </div>
            </div>
            
            </div>
          </div>
        </div>
        <Carousel onRoleSelect={handleRoleSelected} />
      </section>
      <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
        ↔
      </button>   
      </>
      )}
      {/* <button className="toggle-colorMode-btn" onClick={toggleColorMode}>
        «»
      </button> */}

  
    </div>
  );
};

export default Chat;
