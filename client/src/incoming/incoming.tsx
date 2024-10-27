import React, { useState } from "react";
import "./incoming.css";

function App() {
  const [isAnswering, setIsAnswering] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const handleAnswer = () => {
    setIsAnswering(true);
    setTimeout(() => setShowControls(false), 300);
  };

  const handleDecline = () => {
    setIsDeclining(true);
    setTimeout(() => setShowControls(false), 300);
  };

  return (
    <div className="call-screen">
      <div className="name">+1 (437) 887 2659</div>
      <div className="bottom-container">
        <div className="options">
          <div className="option">
            <div className="remind">
              <img src="alarm-clock.png" className="icon3" />
            </div>
            <span>Remind Me</span>
          </div>
          <div className="option">
            <div className="remind">
              <img src="speech-bubble.png" className="icon3" />
            </div>
            <span>Message</span>
          </div>
        </div>
        <div className="options">
          <div className="option">
            <div className="button decline" onClick={handleDecline}>
              <img src="decline.png" className="icon2" />
            </div>
            <span>Decline</span>
          </div>
          <div className="option">
            <div className="button accept" onClick={handleAnswer}>
              <img src="phone-call.png" className="icon" />
            </div>
            <span>Accept</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
