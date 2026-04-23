import { useState, useEffect } from "react";
import { commentsData } from "../data/commentsData";

function Comment() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Logic for Navigation
  const nextSlide = () => {
    // If we are at the end, go back to 0, otherwise add 1
    setCurrentIndex((prev) =>
      prev === commentsData.length - 1 ? 0 : prev + 1,
    );
  };

  const prevSlide = () => {
    // If we are at the start, go to the last index, otherwise subtract 1
    setCurrentIndex((prev) =>
      prev === 0 ? commentsData.length - 1 : prev - 1,
    );
  };

  // 2. Logic for Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]); // Restart timer when index changes

  return (
    <div className="bg-gray-900  flex flex-col items-center justify-center p-10 text-gray-100 ">
      <h1 className="py-2 mb-4 font-bold text-2xl md:text-3xl text-amber-400">
        What Others Says
      </h1>
      {/* Outer Container (The Window) */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl">
        {/* Inner Wrapper (The Moving Train) */}
        <div
          className="flex transition-transform duration-900 ease-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {commentsData.map((comment) => (
            <div
              key={comment.id}
              className="w-full shrink-0 p-10 bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
            >
              <div className="mb-4">{"⭐".repeat(comment.rating)}</div>
              <h3 className="text-1xl font-semibold mb-4">"{comment.text}"</h3>
              <p className="font-bold text-blue-400 text-sm">{comment.name}</p>
              <p className="text-sm text-gray-400">{comment.workplace}</p>
            </div>
          ))}
        </div>

        {/* 3. Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 px-2 py-1 rounded-full"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50  rounded-full px-2 py-1"
        >
          →
        </button>
      </div>

      {/* 4. Indicators (Dots) */}
      <div className="flex space-x-2 mt-6">
        {commentsData.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full transition-all ${currentIndex === index ? "bg-white w-4" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Comment;
