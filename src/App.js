// App.js
import React, { useState, useRef, useEffect } from 'react';
import { verbs } from './verbs'; // Import the verbs array
import './App.css'; // Import the CSS file

function VerbGenerator() {

  // Toggle Screen
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'm') {
        event.preventDefault(); // Prevent default browser behavior

        if (document.fullscreenElement) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen();
          } else if (document.documentElement.msRequestFullscreen) {
            document.documentElement.msRequestFullscreen();
          }
        }
        setIsFullScreen(!isFullScreen);
      }
    };

    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, [isFullScreen]);

  // Animation on Heading
  const [heading, setHeading] = useState('');
  const fullHeading = 'Vocabulary From "The Hindu"';
  const index = useRef(0);
  const isAnimating = useRef(false); 

  useEffect(() => {
    const animateHeading = () => {
      if (index.current < fullHeading.length) {
        setHeading(fullHeading.substring(0, index.current + 1));
        index.current++;
        setTimeout(animateHeading, 50); // Adjust animation speed
      } else {
        isAnimating.current = false;
      }
    };

    const interval = setInterval(() => {
      if (!isAnimating.current) {
        isAnimating.current = true;
        setHeading('');
        index.current = 0;
        setTimeout(animateHeading, 1000);
      }
    }, 30000); // 1/2 minute

    if (!isAnimating.current) {
      isAnimating.current = true;
      setTimeout(animateHeading, 1000);
    }

    return () => clearInterval(interval);
  }, []);

  // Generate a new vocab

  const getRandomVerb = () => {
    const randomIndex = Math.floor(Math.random() * verbs.length);
    return verbs[randomIndex];
  };

  const [verb, setVerb] = useState(getRandomVerb());
  
  const handleGenerateClick = () => {
    setVerb(getRandomVerb());
  };

  // Pronunciation of word
  
  const utteranceRef = useRef(null);

  const handlePronunciation = () => {
    if (window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(verb.word);
      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    } else {
      console.error("Text-to-speech not supported in this browser.");
    }
  };


  return (
    <div className="container">
      {/* <h1>Vocabulary From "The Hindu"</h1> */}
      <h1 className="heading-animation">{heading}</h1>

      <div className="card">
        <h2>{verb.word}{' '}<span>({verb.gujarati})</span>{''}
          <span>
            <button title='Pronunciation' className='handlePronunciation' onClick={handlePronunciation}>
              <span className="material-icons">&#128362;</span>
            </button>
          </span>
        </h2>
        {/* <span><strong>Gujarati Meaning:</strong> {verb.gujarati}</span> */}
        <p>
          <strong>Type of word :</strong>{' '}
          <span>{verb.partOfSpeech}</span>
        </p>
        <p>
          <strong>Meaning :</strong>{' '}
          <span>{verb.meaning}</span>
        </p>
        <p>
          <strong>Example ({verb.word}) :</strong>{' '}
          <span>{verb.wordExample.english}</span>{' '}
          <span>({verb.wordExample.gujarati})</span>
        </p>
        <p>
          <strong>Synonyms :</strong>{' '}
          {verb.synonyms.map((synonym) => (
            <span key={synonym.word}>
              {synonym.word} ({synonym.gujarati}),{' '}
            </span>
          ))}
        </p>
        <p>
          <strong>Antonyms :</strong>{' '}
          {verb.antonyms.map((antonym) => (
            <span key={antonym.word}>
              {antonym.word} ({antonym.gujarati}),{' '}
            </span>
          ))}
        </p>

      </div>

      <button className="generate-button" onClick={handleGenerateClick} title='to generate next vocabulary'>
        Generate Vocab
      </button>
    </div>
  );
}

export default VerbGenerator;