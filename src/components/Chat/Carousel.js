import React, { useState } from "react";
import "./Carousel.css";

export default function Carousel({ onRoleSelect }) {
  const avatars = [
    {
      value: "ML Engineer",
      label: "ML Engineer",
      name: "Sofia",
      url: "/Sofia.png",
    },
    {
      value: "Web Developer",
      label: "Web Developer",
      name: "Diego",
      url: "/Diego.png",
    },
    
    {
      value: "Cybersecurity Analyst",
      label: "Cybersecurity Analyst",
      name: "Naomi",
      url: "/Naomi.png",
    },
    {
      value: "Data Analyst",
      label: "Data Analyst",
      name: "Lucas",
      url: "/Lucas.png",
    },
    {
      value: "Cloud Engineer",
      label: "Cloud Engineer",
      name: "Maria",
      url: "/Maria.png",
    },
   
    { value: "Blockchain Developer", label: "Blockchain Developer", name: "Samuel", url: "/Samuel.png"},
    // { value: "Math Magician", label: "Math Magician" },
    // { value: "Blockchain Baron", label: "Blockchain Baron" },
    // { value: "Quantum Quester", label: "Quantum Quester" },
    // { value: "AR/VR Voyager", label: "AR/VR Voyager" },
    // { value: "IoT Innovator", label: "IoT Innovator" },
  ];

  const rotationIncrements = Array.from({ length: avatars.length }, (_, i) => i * (360 / avatars.length));


  const [currentRotation, setCurrentRotation] = useState(0);
  const [hoveredAvatar, setHoveredAvatar] = useState(null);
  const [clickedAvatarIndex, setClickedAvatarIndex] = useState(null)


  const rotateCarousel = (degrees) => {
    if (degrees > 0) {
        setCurrentRotation(getNextIncrement(currentRotation));
    } else {
        setCurrentRotation(getPrevIncrement(currentRotation));
    }
};


const getNextIncrement = (currentRotation) => {
    // Filter increments that are greater than the currentRotation
    const possibleIncrements = rotationIncrements.filter(inc => inc > currentRotation);
    if (possibleIncrements.length) {
        return possibleIncrements[0];
    }
    return rotationIncrements[0];  // return the first increment if we've reached the end
};

const getPrevIncrement = (currentRotation) => {
    // Filter increments that are less than the currentRotation
    const possibleIncrements = rotationIncrements.filter(inc => inc < currentRotation);
    if (possibleIncrements.length) {
        return possibleIncrements[possibleIncrements.length - 1];
    }
    return rotationIncrements[rotationIncrements.length - 1];  // return the last increment if we've reached the beginning
};

  const calculateTransform = (index, totalItems) => {
    let rotation = currentRotation + index * (360 / totalItems);
    return rotation;
  };


const handleAvatarMouseOver = async (index) => {
    setHoveredAvatar(index);
}

const handleAvatarMouseOut = () => {
    setHoveredAvatar(null);
}

const avatarClicked = (avatarRole, index) => {
    setClickedAvatarIndex(index)
    onRoleSelect(avatarRole);
  }

  return (
    <div className="carousel-wrapper">
      <div className="carousel-container">
        {avatars.map((avatar, index) => (
          <div
            key={index}
            className='carousel-item'
            onClick={() => avatarClicked(avatar.value, index)}
            style={{
              transform: `translate(-50%, -50%) rotate(${calculateTransform(
                index,
                avatars.length
              )}deg)`,
            }}
          >
            <img
            title={`${avatar.name} - ${avatar.label}`}
            className={index === clickedAvatarIndex ? 'clicked-img' : ''}
              onMouseOut={handleAvatarMouseOut}
              onMouseOver={() => handleAvatarMouseOver(index)}
              style={{
                transform: `${
                  index === hoveredAvatar ? "scale(1.2)" : "scale(1)"
                } rotate(${-calculateTransform(index, avatars.length)}deg)`,
              }}
              src={avatar.url}
              alt={avatar.name}
            />
            {/* <p
              style={{
                transform: `rotate(${-calculateTransform(
                  index,
                  avatars.length
                )}deg)`,
              }}
            >
              {avatar.name}
            </p> */}
            {/* <p
              style={{
                transform: `rotate(${-calculateTransform(
                  index,
                  avatars.length
                )}deg)`,
              }}
            >
              {avatar.label}
            </p> */}
          </div>
        ))}
      </div>

      <button
        style={{ background: "transparent", color: "white" }}
        className="carousel-prev"
        onClick={() => rotateCarousel(-60)}
      >
        Prev
      </button>
      <button
        style={{ background: "transparent", color: "white" }}
        className="carousel-next"
        onClick={() => rotateCarousel(60)}
      >
        Next
      </button>
    </div>
  );
}
