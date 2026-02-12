import React, { useState, useRef } from 'react';


export default function ValentineApp() {
  const [showQuestion, setShowQuestion] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showDancingPopup, setShowDancingPopup] = useState(false);
  const [showYesPopup, setShowYesPopup] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noButtonActive, setNoButtonActive] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [dancingNoPosition, setDancingNoPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef(null);
  const dancingNoRef = useRef(null);

  const handleNoClick = () => {
    setNoAttempts(prev => prev + 1);
    setShowPopup(true);
  };

  const handleYesClick = () => {
    // Only allow Yes click after No button starts moving (noButtonActive = true)
    if (noButtonActive) {
      setShowDancingPopup(true);
    }
  };

  const handleDancingYes = () => {
    setShowDancingPopup(false);
    setShowFireworks(true);
    // Show fireworks for 3 seconds, then show the save the date popup
    setTimeout(() => {
      setShowFireworks(false);
      setShowYesPopup(true);
    }, 3000);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setNoButtonActive(true); // Activate movement after popup closes
  };

  const handleReset = () => {
    setShowQuestion(false);
    setShowPopup(false);
    setShowDancingPopup(false);
    setShowYesPopup(false);
    setShowFireworks(false);
    setNoButtonPosition({ x: 0, y: 0 });
    setNoButtonActive(false);
    setNoAttempts(0);
    setDancingNoPosition({ x: 0, y: 0 });
  };

  const moveNoButton = (e) => {
    if (!noButtonActive) return; // Only move if activated after popup
    
    const button = noButtonRef.current;
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Check if mouse is within 12px of the button's edges
    const distanceFromLeft = mouseX - buttonRect.left;
    const distanceFromRight = buttonRect.right - mouseX;
    const distanceFromTop = mouseY - buttonRect.top;
    const distanceFromBottom = buttonRect.bottom - mouseY;

    const isNearButton = (
      distanceFromLeft >= -12 && distanceFromLeft <= buttonRect.width + 12 &&
      distanceFromTop >= -12 && distanceFromTop <= buttonRect.height + 12
    );

    // If mouse is within 12px of the button box, move it
    if (isNearButton) {
      const randomX = Math.random() * 400 - 200; // Random between -200 and 200
      const randomY = Math.random() * 400 - 200;
      setNoButtonPosition({ x: randomX, y: randomY });
    }
  };

  const moveDancingNoButton = (e) => {
    const button = dancingNoRef.current;
    if (!button) return;

    const buttonRect = button.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Check if mouse is within 15px of the button's edges
    const distanceFromLeft = mouseX - buttonRect.left;
    const distanceFromTop = mouseY - buttonRect.top;

    const isNearButton = (
      distanceFromLeft >= -15 && distanceFromLeft <= buttonRect.width + 15 &&
      distanceFromTop >= -15 && distanceFromTop <= buttonRect.height + 15
    );

    // If mouse is within 15px of the button box, move it
    if (isNearButton) {
      const randomX = Math.random() * 200 - 100;
      const randomY = Math.random() * 200 - 100;
      setDancingNoPosition({ x: randomX, y: randomY });
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden" onMouseMove={moveNoButton}>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&family=Dancing+Script:wght@700&display=swap" rel="stylesheet" />
      
      {/* Background - Photo Collage */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-red-50 to-pink-100">
        {/* Photo collage grid */}
        <div className="absolute inset-0 opacity-30 grid grid-cols-4 grid-rows-3 gap-1 p-2">
          <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/taboushi_and_I2.jpg')" }}></div>
          <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/IMG_0592.jpg')" }}></div>
          <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/IMG_5115.JPG')" }}></div>
          <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/IMG_1889.JPG')" }}></div>
          <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/IMG_1977.JPG')" }}></div>
          <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/IMG_2623.JPG')" }}></div>
          <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/IMG_8836.jpg')" }}></div>
          <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/IMG_5108.jpg')" }}></div>
          <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/IMG_8450.JPG')" }}></div>
          <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/taboushi_and_I2.jpg')" }}></div>
          <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/IMG_0592.jpg')" }}></div>
          <div className="bg-cover bg-center rounded-lg" style={{ backgroundImage: "url('/IMG_1977.JPG')" }}></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 bg-white text-red-600 px-4 py-2 rounded-lg shadow-lg hover:bg-pink-50 transition-all text-sm font-semibold"
        >
          Reset
        </button>

        {/* Red Header Container */}
        <div className="bg-red-600 shadow-lg py-8 px-4">
          <div className="max-w-5xl mx-auto flex items-center justify-center gap-8">
            {/* Left Hearts */}
            <div className="flex gap-6">
              <Heart />
              <Heart />
              <Heart />
            </div>

            {/* Taboushi Button */}
            <button 
              onClick={() => setShowQuestion(true)}
              className="text-white text-5xl md:text-7xl text-center px-12 hover:scale-105 transition-transform cursor-pointer" 
              style={{ fontFamily: "'Great Vibes', 'Dancing Script', cursive" }}
            >
              Taboushi
            </button>

            {/* Right Hearts */}
            <div className="flex gap-6">
              <Heart />
              <Heart />
              <Heart />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto p-8 text-center">
          {showQuestion && (
            <div className="mt-12 animate-fade-in">
              <p className="text-4xl md:text-5xl text-red-600 font-semibold mb-8" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Will you be my Valentine? 💕
              </p>
              
              {/* Yes/No Buttons */}
              <div className="flex gap-6 justify-center mt-8">
                <button 
                  onClick={handleYesClick}
                  className="bg-pink-200 hover:bg-pink-300 text-red-700 font-bold text-3xl py-6 px-12 rounded-lg shadow-lg transition-all hover:scale-105 cursor-pointer"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Yes
                </button>
                <button 
                  ref={noButtonRef}
                  onClick={handleNoClick}
                  className={`bg-pink-200 text-red-700 font-bold text-3xl py-6 px-12 rounded-lg shadow-lg transition-all ${!noButtonActive ? 'hover:bg-pink-300 hover:scale-105' : 'pointer-events-none'}`}
                  style={{ 
                    fontFamily: "'Dancing Script', cursive",
                    transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  No
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Popup Modal */}
        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-12 shadow-2xl max-w-md">
              <p className="text-3xl text-red-600 font-semibold mb-8" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Are you sure? 🥺
              </p>
              <button 
                onClick={handlePopupClose}
                className="bg-pink-200 hover:bg-pink-300 text-red-700 font-bold text-4xl py-4 px-16 rounded-lg shadow-lg transition-all hover:scale-105 w-full"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                NOOOOOO
              </button>
            </div>
          </div>
        )}

        {/* Dancing Popup Modal */}
        {showDancingPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onMouseMove={moveDancingNoButton}>
            <div className="bg-white rounded-lg p-12 shadow-2xl max-w-md">
              <p className="text-4xl text-red-600 font-semibold mb-8" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Do you like dancing? 💃
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={handleDancingYes}
                  className="bg-pink-200 hover:bg-pink-300 text-red-700 font-bold text-3xl py-4 px-12 rounded-lg shadow-lg transition-all hover:scale-105 flex-1"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  Yes
                </button>
                <button 
                  ref={dancingNoRef}
                  className="bg-pink-200 text-red-700 font-bold text-3xl py-4 px-12 rounded-lg shadow-lg transition-all pointer-events-none flex-1"
                  style={{ 
                    fontFamily: "'Dancing Script', cursive",
                    transform: `translate(${dancingNoPosition.x}px, ${dancingNoPosition.y}px)`,
                    transition: 'transform 0.3s ease'
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Fireworks Display */}
        {showFireworks && <Fireworks />}

        {/* Yes Popup Modal */}
        {showYesPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-12 shadow-2xl max-w-md">
              <p className="text-4xl text-red-600 font-semibold mb-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Yay! 💕
              </p>
              <p className="text-3xl text-red-500 font-semibold" style={{ fontFamily: "'Dancing Script', cursive" }}>
                Save the Date
              </p>
              <p className="text-5xl text-red-600 font-bold mt-4" style={{ fontFamily: "'Dancing Script', cursive" }}>
                February 20
              </p>
              <button 
                onClick={() => setShowYesPopup(false)}
                className="bg-pink-200 hover:bg-pink-300 text-red-700 font-bold text-2xl py-3 px-12 rounded-lg shadow-lg transition-all hover:scale-105 w-full mt-8"
                style={{ fontFamily: "'Dancing Script', cursive" }}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Heart Component
function Heart() {
  return (
    <svg
      className="w-8 h-8 fill-pink-200 animate-pulse"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

// Fireworks Component
function Fireworks() {
  const fireworks = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 1 + Math.random() * 2
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="absolute"
          style={{
            left: `${fw.left}%`,
            top: '50%',
            animation: `firework ${fw.duration}s ease-out ${fw.delay}s infinite`
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-red-500 rounded-full"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-100px)`,
                animation: `sparkle ${fw.duration}s ease-out ${fw.delay}s infinite`
              }}
            />
          ))}
        </div>
      ))}
      <style>{`
        @keyframes firework {
          0% { transform: translateY(0) scale(0); opacity: 1; }
          50% { transform: translateY(-200px) scale(1); opacity: 1; }
          100% { transform: translateY(-300px) scale(0.5); opacity: 0; }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
