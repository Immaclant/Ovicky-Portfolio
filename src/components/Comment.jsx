import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { commentsData } from "../data/commentsData";

function Comment() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev === commentsData.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrentIndex((prev) => (prev === 0 ? commentsData.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 5500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const current = commentsData[currentIndex];

  return (
    <section className="bg-dark-2 py-24">
      <div className="mx-auto max-w-4xl px-6 lg:px-12 text-center">

        {/* Eyebrow */}
        <p className="section-eyebrow justify-center">Testimonials</p>
        <h2 className="font-serif font-bold text-cream mb-16" style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)" }}>
          What Others Say
        </h2>

        {/* Carousel */}
        <div className="relative min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-4"
            >
              {/* Giant quote */}
              <div className="font-serif text-[5rem] text-gold/30 leading-none mb-2 select-none">
                &ldquo;
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-5">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <span key={i} className="text-gold text-sm">★</span>
                ))}
              </div>

              {/* Quote text */}
              <p className="font-serif italic text-cream text-lg md:text-xl leading-relaxed max-w-2xl mb-8 font-light">
                "{current.text}"
              </p>

              {/* Author */}
              <div>
                <p className="font-semibold text-gold text-sm tracking-wide">{current.name}</p>
                <p className="text-xs text-cream-dim mt-1 font-light tracking-wide">{current.workplace}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-4">
          <button
            onClick={prevSlide}
            className="w-10 h-10 border border-cream-faint text-cream-dim hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center text-lg"
            aria-label="Previous testimonial"
          >
            ←
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {commentsData.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-400 ${
                  i === currentIndex ? "w-6 bg-gold" : "w-1.5 bg-cream-faint hover:bg-cream-dim"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 border border-cream-faint text-cream-dim hover:border-gold hover:text-gold transition-all duration-300 flex items-center justify-center text-lg"
            aria-label="Next testimonial"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}

export default Comment;
