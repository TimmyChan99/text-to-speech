import './App.css'
import React, { useState, useRef } from 'react';

function App() {
  const textRef = useRef();
 const [text, setText] = useState('test');
  const [highlightedWord, setHighlightedWord] = useState('');
  const words = text.split(' ');

  const textHandler = (e) => {
    e.preventDefault();
    setText(textRef.current.value);
    console.log(text);
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr';
    utterance.onboundary = (event) => {
      setHighlightedWord(event.char);
    };

    synth.speak(utterance);
    console.log(highlightedWord);
  }

  return (
   <>
   <form onSubmit={(e) => textHandler(e)}>
    <textarea ref={textRef} />
    <button type="submit">Submit</button>
   </form>
     <div>
       {words.map((word, index) => (
         <span key={index} className={word === highlightedWord ? 'highlighted' : ''}>
           {word} {' '}
         </span>
       ))}
     </div>
   </>
  );
}

export default App
