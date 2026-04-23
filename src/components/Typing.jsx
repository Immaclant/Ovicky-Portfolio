import React from "react";
import { Typewriter } from "react-simple-typewriter";

const words = [
  "My name is Victor Fehintola",
  "I can help with all sorts of projects",
  "I am a professional research writer",
];

function Typing() {
  return (
    <div className="text-xl font-semibold">
      <Typewriter
        words={words}
        loop={true}
        cursor
        typeSpeed={70}
        deleteSpeed={50}
        delaySpeed={1000}
      />
    </div>
  );
}

export default Typing;
