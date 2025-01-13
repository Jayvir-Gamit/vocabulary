// App.js
import React, { useState, useRef } from 'react';
import { verbs } from './verbs'; // Import the verbs array
import './App.css'; // Import the CSS file

function VerbGenerator() {

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
      <h1>Vocabulary From "The Hindu"</h1>

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
          <strong>Type of word:</strong>{' '}
          <span>{verb.typeofWord}</span>
        </p>
        <p>
          <strong>Meaning:</strong>{' '}
          <span>{verb.meaning}</span>
        </p>
        <p>
          <strong>Example ({verb.word}):</strong>{' '}
          <span>{verb.wordExample.english}</span>{' '}
          <span>({verb.wordExample.gujarati})</span>
        </p>
        <p>
          <strong>Synonyms:</strong>{' '}
          {verb.synonyms.map((synonym) => (
            <span key={synonym.word}>
              {synonym.word} ({synonym.gujarati}),{' '}
            </span>
          ))}
        </p>
        <p>
          <strong>Antonyms:</strong>{' '}
          {verb.antonyms.map((antonym) => (
            <span key={antonym.word}>
              {antonym.word} ({antonym.gujarati}),{' '}
            </span>
          ))}
        </p>

      </div>

      <button className="generate-button" onClick={handleGenerateClick}>
        Generate Vocab
      </button>
    </div>
  );
}

export default VerbGenerator;