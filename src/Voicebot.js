import React, { useEffect, useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const Voicebot = () => {
  const [isListening, setIsListening] = useState(false);
  const {
    transcript,
    browserSupportsSpeechRecognition,
    resetTranscript, // Add this function to reset transcript
  } = useSpeechRecognition();

  const intents = [
    {
      "name": "Greetings",
      "utterances": [
        {
          "utterance": "Hi",
          "response": "Hello! How can I assist you today?"
        },
        {
          "utterance": "Hello",
          "response": "Hi there! How can I help you?"
        },
        {
          "utterance": "Hey there",
          "response": "Hi! How can I assist you today?"
        },
        {
          "utterance": "Good morning",
          "response": "Good morning! How can I help you?"
        },
        {
          "utterance": "Good afternoon",
          "response": "Good afternoon! How can I assist you?"
        },
        {
          "utterance": "Good evening",
          "response": "Good evening! How can I help you?"
        }
      ]
    },
    {
      name: "Landing Page",
      utterances: [
        {
          "utterance": "Go to landing page",
          "response": "Okay, I am taking you to the landing page.",
          "route": "landing-page"
        },
        {
          "utterance": "take me to landing page",
          "response": "Okay, I am taking you to the landing page.",
          "route": "landing-page"
        },
        {
          "utterance": "move to landing page",
          "response": "Okay, I am taking you to the landing page.",
          "route": "landing-page"
        },
        {
          "utterance": "roll back to landing page",
          "response": "Okay, I am taking you to the landing page.",
          "route": "landing-page"
        },
        {
          "utterance": "move to landing page",
          "response": "Okay, I am taking you to the landing page.",
          "route": "landing-page"
        },
        {
          "utterance": "what is today's quote",
          "response": "Determination is the power that sees us through all our frustration and obstacles. It helps in building our willpower which is the very basis of success. ",
          "route": "landing-page"
        },
        {
          "utterance": "Today's Inspirational quote",
          "response": "Determination is the power that sees us through all our frustration and obstacles. It helps in building our willpower which is the very basis of success.",
          "route": "landing-page"
        },
        {
          "utterance": "say me today's quote",
          "response": "Determination is the power that sees us through all our frustration and obstacles. It helps in building our willpower which is the very basis of success.",
          "route": "landing-page"
        }

      ]
    },
    {
      name: "Features",
      utterances: [
        {
          "utterance": "what are platform features",
          "response": "Dashboard, Dynamic time table, Learning Networks, Little Masters, Video Based Dictionary, General Search."
        },
        {
          "utterance": "Features of platform",
          "response": "Dashboard, Dynamic time table, Learning Networks, Little Masters, Video Based Dictionary, General Search."
        },
        {
          "utterance": "What does the platform offers",
          "response": "Dashboard, Dynamic time table, Learning Networks, Little Masters, Video Based Dictionary, General Search."
        },
        {
          "utterance": "Say me the features of platform",
          "response": "Dashboard, Dynamic time table, Learning Networks, Little Masters, Video Based Dictionary, General Search."
        },
        {
          "utterance": "Say me the services of platform",
          "response": "Dashboard, Dynamic time table, Learning Networks, Little Masters, Video Based Dictionary, General Search."
        },
        {
          "utterance": "tell me the services offered by the  platform",
          "response": "Dashboard, Dynamic time table, Learning Networks, Little Masters, Video Based Dictionary, General Search."
        },
        {
          "utterance": "explain platform services",
          "response": "Dashboard, Dynamic time table, Learning Networks, Little Masters, Video Based Dictionary, General Search."
        }
      ]
    },
  ];

  useEffect(() => {
    if (browserSupportsSpeechRecognition && !isListening) {
      SpeechRecognition.startListening();
      setIsListening(true);
    }

    return () => {
      if (isListening) {
        SpeechRecognition.stopListening();
        setIsListening(false);
      }
    };
  }, [browserSupportsSpeechRecognition, isListening]);

  useEffect(() => {
    if (transcript) {
      const matchedIntent = intents.find(intent =>
        intent.utterances.some(utterance =>
          transcript.toLowerCase() === utterance.utterance.toLowerCase()
        )
      );

      if (matchedIntent) {
        speakResponse(matchedIntent.utterances[0].response);
      }

      // Reset transcript after processing
      resetTranscript();
    }
  }, [transcript, intents, resetTranscript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return null;
};

// Function to speak out the response
function speakResponse(response) {
  const speech = new SpeechSynthesisUtterance();
  speech.text = response;
  speech.lang = 'en-US';
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  speechSynthesis.speak(speech);
}

export default Voicebot;
