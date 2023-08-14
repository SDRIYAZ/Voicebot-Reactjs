import React, { useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Landing from './Landing';
import Voicebot2 from './Voicebot2';
import Dashboard from "./Dashboard";
const App = () => {
  // const {
  //   transcript,
  //   listening,
  //   resetTranscript,
  //   browserSupportsSpeechRecognition
  // } = useSpeechRecognition();

  // const latestTranscript = useRef('');

  // useEffect(() => {
  //   if (browserSupportsSpeechRecognition) {
  //     SpeechRecognition.startListening({ continuous: true ,language : 'en-IN'});
  //   }

  //   return () => {
  //     SpeechRecognition.stopListening();
  //   };
  // }, [browserSupportsSpeechRecognition]);

  // useEffect(() => {
  //   if (transcript) {
  //     latestTranscript.current = transcript;
  //     resetTranscript(); // Clear the current transcript after processing
  //   }
  // }, [transcript, resetTranscript]);

  // if (!browserSupportsSpeechRecognition) {
  //   return <span>Browser doesn't support speech recognition.</span>;
  // }

  return (
    <>
      {/* <Voicebot2 /> */}
      {/* <p>Microphone: {listening ? 'on' : 'off'}</p>
      <p>Last Transcript: {latestTranscript.current}</p> */}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/landing" element={<Landing />} />
          <Route path='/dashboard' element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
