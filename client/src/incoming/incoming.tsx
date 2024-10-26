
import React, { useState } from 'react';
import { Phone, PhoneOff, ChevronUp } from 'lucide-react';

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
    <<div class="call-screen">
         <div class="name">+1 (437) 887 2659</div>
         <div class="bottom-container">
             <div class="options">
                 <div class="option">
                     <div class="remind">
                         <img src="assets/alarm-clock.png" class="icon3">
                     </div>
                     <span>Remind Me</span>
                 </div>
                 <div class="option">
                     <div class="remind">
                         <img src="assets/speech-bubble.png" class="icon3">
                     </div>
                     <span>Message</span>
                 </div>
             </div>
             <div class="options">
                 <div class="option">
                     <div class="button decline" onclick="alert('Decline Call')">
                         <img src="assets/decline.png" class="icon2">
                     </div>
                     <span>Decline</span>
                 </div>
                 <div class="option">
                     <div class="button accept" onclick="alert('Accept Call')">
                         <img src="assets/phone-call.png" class="icon">
                     </div>
                     <span>Accept</span>
                 </div>
             </div>
         </div>
     
     </div>
    );
  }
