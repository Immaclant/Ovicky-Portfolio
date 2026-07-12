import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    text: "Dr. Victor's research on educational psychology has been instrumental in shaping our understanding of student motivation in African contexts. His work bridges theory and practice beautifully.",
    author: "Prof. Adebayo Olayiwola",
    role: "Professor of Educational Psychology",
    institution: "University of Ibadan",
  },
  {
    id: 2,
    text: "A dedicated mentor and exceptional scholar. Dr. Victor's supervision has guided numerous graduate students to successful completions and publications in high-impact journals.",
    author: "Dr. Grace Adebayo",
    role: "Senior Lecturer",
    institution: "Federal University of Technology, Akure",
  },
  {
    id: 3,
    text: "His research on positive psychology interventions has directly influenced our department's approach to student wellbeing programs. Practical, evidence-based, and impactful.",
    author: "Prof. Kwame Asante",
    role: "Dean, Faculty of Education",
    institution: "University of Ghana",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () =>
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  const prevSlide = () =>
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [current]);

  const t = testimonials[current];

  return (
    <section className="section bg-manila border-y-4 border-double border-ink" id="testimonials">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <span className="folder-tab">Peer Review</span>
          <h2 className="font-serif font-black text-ink tracking-tight uppercase border-b-2 border-ink pb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Academic Endorsements
          </h2>
        </div>

        <div className="relative min-h-[300px] border-2 border-ink bg-manila-dim p-8 md:p-12">
          {/* Decorative pin holes */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-ink/10 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5)]" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col h-full justify-center"
            >
              <div className="font-serif text-[4rem] text-stamp leading-none mb-4">
                &ldquo;
              </div>

              <p className="font-serif italic text-ink text-xl md:text-2xl leading-relaxed mb-8 font-bold">
                {t.text}
              </p>

              <div className="border-t-2 border-dashed border-ink pt-6 mt-auto">
                <p className="font-bold text-ink text-sm uppercase tracking-widest">{t.author}</p>
                <div className="font-mono text-xs text-ink-light mt-2 flex flex-col gap-1">
                  <span>ROLE: {t.role}</span>
                  <span>INST: {t.institution}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-6">
          <div className="font-mono text-sm font-bold text-ink-light">
            PAGE 0{current + 1} / 0{testimonials.length}
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              className="btn-typewriter !py-2 !px-4"
              aria-label="Previous testimonial"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="btn-typewriter !py-2 !px-4"
              aria-label="Next testimonial"
            >
              →
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}