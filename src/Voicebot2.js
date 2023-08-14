import React, { useEffect, useRef } from 'react';
// import { Navigate } from 'react-router-dom';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Voicebot2 = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const latestTranscript = useRef('');


  // Define the intents array
  const intents = [
    {
      name: 'Greetings',
      utterances: [
        { utterance: 'Hi', response: 'Hello! How can I assist you today?' },
        { utterance: 'Hello', response: 'Hi there! How can I help you?' },
        // ... other utterances for this intent
      ]
    },
    {
      name: 'Landing Page',
      utterances: [
        {
          utterance: 'Go to landing page',
          response: 'Okay, I am taking you to the landing page.',
          route: '/landing' // Use an actual route path
        },
        {
          utterance : 'Landing',
          response: 'Okay, I am taking you to the landing page.',
          route: '/landing' // Use an actual route path
        },
        {
          utterance : 'Land',
          response: 'Okay, I am taking you to the landing page.',
          route: '/landing' // Use an actual route path
        }
        // ... other utterances for this intent
      ]
    },
    {
      name: 'Home  Page',
      utterances: [
        {
          utterance: 'Go to Home page',
          response: 'Okay, I am taking you to the Home page.',
          route: '/' // Use an actual route path
        },
        {
          utterance : 'Home',
          response: 'Okay, I am taking you to the Home page.',
          route: '/' // Use an actual route path
        },
        {
          utterance : 'Home Page',
          response: 'Okay, I am taking you to the Home page.',
          route: '/' // Use an actual route path
        }
        // ... other utterances for this intent
      ]
    },
    {
      name: 'Dashboard',
      utterances: [
        {
          utterance: 'Go to Dashboard',
          response: 'Okay, I am taking you to the Dashboard.',
          route: '/dashboard' // Use an actual route path
        },
        {
          utterance : 'Dash',
          response: 'Okay, I am taking you to the Dashboard.',
          route: '/dashboard' // Use an actual route path
        },
        {
          utterance : 'Dashboard',
          response: 'Okay, I am taking you to the Dashboard.',
          route: '/dashboard' // Use an actual route path
        }
        // ... other utterances for this intent
      ]
    },
    // ... other intents
  ];
  
  

  useEffect(() => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening({ continuous: true, language: 'en-IN' });
    }

    return () => {
      SpeechRecognition.stopListening();
    };
  }, [browserSupportsSpeechRecognition]);

  useEffect(() => {
    if (transcript) {
      latestTranscript.current = transcript;
      console.log(transcript)

      // Check for matching intents and perform actions
      for (const intent of intents) {
        for (const utterance of intent.utterances) {
          if (latestTranscript.current.toLowerCase() === utterance.utterance.toLowerCase()) {
            speakResponse(utterance.response); // Speak the response
            if (utterance.route) {
              routeToPage(utterance.route); // Route to the specified path
            }
            break; // Stop after the first match
          }
        }
      }
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <p>Last Transcript: {latestTranscript.current}</p>
    </div>
  );
};


function speakResponse(response) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = response;
  speech.lang = 'en-US';
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  speechSynthesis.speak(speech);
}

function routeToPage(route) {
  // Implement your routing logic here
  console.log('Routing to', route);
  // For example, using React Router
  // return <Navigate to={route} />;
  setTimeout(()=>{
    window.location.href = route;
  }, 3000)
  

}
export default Voicebot2;
