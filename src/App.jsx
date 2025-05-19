import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Initial welcome message
    const welcomeMessage = "Welcome to Voice Accessor. Say 'start' to begin.";
    window.speechSynthesis.speak(new SpeechSynthesisUtterance(welcomeMessage));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-6 p-4">
      <h1 className="text-3xl font-bold text-blue-800">Voice Accessor</h1>
      <button className="bg-blue-500 text-white text-2xl px-8 py-4 rounded-xl shadow-lg flex items-center gap-2">
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.47 6 6.93V21h2v-3.07c3.39-.46 6-3.4 6-6.93h-2z" />
        </svg>
        Start Listening
      </button>
      <div className="grid grid-cols-2 gap-4">
        <button className="bg-green-500 text-white text-xl px-6 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4l-8 8h16l-8-8z" />
          </svg>
          Up
        </button>
        <button className="bg-green-500 text-white text-xl px-6 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 20l8-8H4l8 8z" />
          </svg>
          Down
        </button>
        <button className="bg-red-500 text-white text-xl px-6 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 6h12v12H6z" />
          </svg>
          Stop
        </button>
        <button className="bg-yellow-500 text-white text-xl px-6 py-3 rounded-lg flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          Play
        </button>
      </div>
    </div>
  );
}




/*voice part */



import { useState, useEffect } from 'react';

function App() {
  const [isListening, setIsListening] = useState(false);

  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = language;
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
      handleCommand(command);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      speak('Sorry, I could not understand. Please try again.');
    };

    recognition.start();
    setIsListening(true);
  };

  const stopListening = () => {
    setIsListening(false);
    // Note: recognition.stop() is called when needed
  };

const handleCommand = (command) => {
  const customCommands = JSON.parse(localStorage.getItem('customCommands')) || {};
  if (command.includes(customCommands.next || 'next')) {
    window.scrollBy(0, 100);
    speak('Scrolling down');
  } else if (command.includes(customCommands.up || 'up')) {
    window.scrollBy(0, -100);
    speak('Scrolling up');
  } else {
    speak('Command not recognized.');
  }
};

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    speak('Welcome to Voice Accessor. Say start to begin listening.');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center space-y-6 p-4">
      <h1 className="text-3xl font-bold text-blue-800">Voice Accessor</h1>
      <button
        onClick={isListening ? stopListening : startListening}
        className={`text-white text-2xl px-8 py-4 rounded-xl shadow-lg flex items-center gap-2 ${
          isListening ? 'bg-red-500' : 'bg-blue-500'
        }`}
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
          <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.47 6 6.93V21h2v-3.07c3.39-.46 6-3.4 6-6.93h-2z" />
        </svg>
        {isListening ? 'Stop Listening' : 'Start Listening'}
      </button>
      {/* Rest of the UI remains the same */}
    </div>
  );
}

export default App;




import { useState } from 'react';

function SettingsModal({ onSave }) {
  const [customCommands, setCustomCommands] = useState(
    JSON.parse(localStorage.getItem('customCommands')) || {
      next: 'next',
      up: 'up',
      down: 'down',
      stop: 'stop',
      play: 'play',
    }
  );

  const handleSave = () => {
    localStorage.setItem('customCommands', JSON.stringify(customCommands));
    onSave(customCommands);
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Customize Commands</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={customCommands.next}
            onChange={(e) => setCustomCommands({ ...customCommands, next: e.target.value })}
            className="border p-2 w-full"
            placeholder="Command for Next"
          />
          {/* Add inputs for other commands */}
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}





/* Multilanguage support*/
const [language, setLanguage] = useState('en-US');

return (
  <div>
    <select
      value={language}
      onChange={(e) => setLanguage(e.target.value)}
      className="mb-4 p-2 border rounded"
    >
      <option value="en-US">English</option>
      <option value="hi-IN">Hindi</option>
      <option value="te-IN">Telugu</option>
    </select>
    {/* Rest of the UI */}
  </div>
);





<button className={`... ${isListening ? 'border-4 border-yellow-400' : ''}`}></button>