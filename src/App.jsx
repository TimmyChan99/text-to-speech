import './App.css'
import React, { useState, useRef } from 'react';

function App() {
  const textRef = useRef();
 const [text, setText] = useState('');
  const [highlightedWord, setHighlightedWord] = useState('');
  const words = text.split(' ');
  const [rate, setRate] = useState(1);

  const textHandler = async (e) => {
    e.preventDefault();
    setText(textRef.current.value);
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'fr';
    utterance.rate = rate;
    utterance.onboundary = (event) => {
      setHighlightedWord(() => words[event.charIndex]);
    };

    synth.speak(utterance);
  }

  return (
   <div className='container'>
   <h1 className='title'>Text to speech</h1>
   <form
   className='form'
   onSubmit={(e) => textHandler(e)}>
    <textarea 
    className='textarea'
    ref={textRef} />
    <button type="submit">Submit</button>
   </form>
     <div className='text'>
       {words.map((word, index) => (
         <span key={index} className={word === highlightedWord ? 'highlighted' : ''}>
           {word} {' '}
         </span>
       ))}
     </div>
     <select
      className='select'
     onChange={(e) => setRate(e.target.value)}>
        <option value="0.5">0.5</option>
        <option value="1">1</option>
        <option value="1.5">1.5</option>
        <option value="2">2</option>
        <option value="2.5">2.5</option>
        <option value="3">3</option>
      </select>
   </div>
  );
}

export default App
