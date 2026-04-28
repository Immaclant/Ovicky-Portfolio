import React from "react";
import { Typewriter } from "react-simple-typewriter";

const words = [
  "Publishing groundbreaking research",
  "Mentoring the next generation",
  "Advancing academic excellence",
  "Bridging theory and practice",
];

function Typing() {
  return (
    <div className="text-xl md:text-2xl text-muted-foreground font-light mb-10 h-16 fade-up fade-up-delay-2">
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
