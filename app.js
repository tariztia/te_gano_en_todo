import React, { useState, useEffect } from 'react';

// Main App component
const App = () => {
  // State for Vale's score and victories
  const [valeScore, setValeScore] = useState(() => {
    const savedScore = localStorage.getItem('valeScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });
  const [valeVictories, setValeVictories] = useState(() => {
    const savedVictories = localStorage.getItem('valeVictories');
    return savedVictories ? JSON.parse(savedVictories) : [];
  });

  // State for Tom's score and victories
  const [tomScore, setTomScore] = useState(() => {
    const savedScore = localStorage.getItem('tomScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });
  const [tomVictories, setTomVictories] = useState(() => {
    const savedVictories = localStorage.getItem('tomVictories');
    return savedVictories ? JSON.parse(savedVictories) : [];
  });

  // Effect to save state to localStorage whenever scores or victories change
  useEffect(() => {
    localStorage.setItem('valeScore', valeScore);
    localStorage.setItem('valeVictories', JSON.stringify(valeVictories));
    localStorage.setItem('tomScore', tomScore);
    localStorage.setItem('tomVictories', JSON.stringify(tomVictories));
  }, [valeScore, valeVictories, tomScore, tomVictories]);

  // Function to add a victory for a specific player
  const addVictory = (player) => {
    const today = new Date();
    // Format date as DD/MM/YY
    const formattedDate = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear().toString().slice(-2)}`;
    const victoryText = prompt(`Enter victory description for ${player} (e.g., "Monopoly"):`);

    if (victoryText) {
      const newVictory = { description: victoryText, date: formattedDate };
      if (player === 'Vale') {
        setValeScore(valeScore + 1);
        setValeVictories([...valeVictories, newVictory]);
      } else if (player === 'Tom') {
        setTomScore(tomScore + 1);
        setTomVictories([...tomVictories, newVictory]);
      }
    }
  };

  // Determine who is winning for the crown icon
  const getWinner = () => {
    if (valeScore > tomScore) {
      return 'Vale';
    } else if (tomScore > valeScore) {
      return 'Tom';
    } else {
      return null; // It's a tie
    }
  };

  const winner = getWinner();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans text-gray-800">
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />

      {/* Main title */}
      <h1 className="text-5xl font-bold mb-10 text-center">Te gano en todo</h1>

      {/* Players container */}
      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-16">

        {/* Vale's Column */}
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg w-full md:w-80 border border-gray-300">
          <div className="flex items-center mb-4">
            <h2 className="text-3xl font-semibold mr-2">Vale: {valeScore}</h2>
            {winner === 'Vale' && (
              // Crown SVG icon
              <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4 5a2 2 0 012-2h8a2 2 0 012 2v2a1 1 0 100 2v1a1 1 0 100 2v1a1 1 0 100 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a1 1 0 100-2v-1a1 1 0 100-2v-1a1 1 0 100-2V7a2 2 0 01-2-2zm3.5 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.5 2a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM7 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd"></path>
              </svg>
            )}
          </div>
          {/* Vale's victories list */}
          <div className="w-full h-64 border border-gray-400 rounded-lg p-2 overflow-y-auto mb-6 bg-gray-50">
            {valeVictories.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">No victories yet</p>
            ) : (
              valeVictories.map((victory, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-200 px-3 py-2 rounded-md mb-2 shadow-sm text-sm">
                  <span>{victory.description}</span>
                  <span className="text-gray-600">{victory.date}</span>
                </div>
              ))
            )}
          </div>
          {/* Add victory button for Vale */}
          <button
            onClick={() => addVictory('Vale')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Agregar victoria
          </button>
        </div>

        {/* Tom's Column */}
        <div className="flex flex-col items-center p-6 bg-white rounded-xl shadow-lg w-full md:w-80 border border-gray-300">
          <div className="flex items-center mb-4">
            <h2 className="text-3xl font-semibold mr-2">Tom: {tomScore}</h2>
            {winner === 'Tom' && (
              // Crown SVG icon
              <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zM4 5a2 2 0 012-2h8a2 2 0 012 2v2a1 1 0 100 2v1a1 1 0 100 2v1a1 1 0 100 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a1 1 0 100-2v-1a1 1 0 100-2v-1a1 1 0 100-2V7a2 2 0 01-2-2zm3.5 3a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM10 6a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.5 2a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM7 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm6 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" clipRule="evenodd"></path>
              </svg>
            )}
          </div>
          {/* Tom's victories list */}
          <div className="w-full h-64 border border-gray-400 rounded-lg p-2 overflow-y-auto mb-6 bg-gray-50">
            {tomVictories.length === 0 ? (
              <p className="text-center text-gray-500 mt-4">No victories yet</p>
            ) : (
              tomVictories.map((victory, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-200 px-3 py-2 rounded-md mb-2 shadow-sm text-sm">
                  <span>{victory.description}</span>
                  <span className="text-gray-600">{victory.date}</span>
                </div>
              ))
            )}
          </div>
          {/* Add victory button for Tom */}
          <button
            onClick={() => addVictory('Tom')}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
          >
            Agregar victoria
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
