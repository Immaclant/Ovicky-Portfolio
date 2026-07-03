"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Section, Container, SectionHeader } from "../ui/Section";
import { Card } from "../ui/Card";
import { Button } from "../ui/Button";

const testimonials = [
  {
    id: 1,
    text: "Dr. Victor's research on educational psychology has been instrumental in shaping our understanding of student motivation in African contexts. His work bridges theory and practice beautifully.",
    author: "Prof. Adebayo Olayiwola",
    role: "Professor of Educational Psychology",
    institution: "University of Ibadan",
    rating: 5,
    avatar: null,
  },
  {
    id: 2,
    text: "A dedicated mentor and exceptional scholar. Dr. Victor's supervision has guided numerous graduate students to successful completions and publications in high-impact journals.",
    author: "Dr. Grace Adebayo",
    role: "Senior Lecturer",
    institution: "Federal University of Technology, Akure",
    rating: 5,
    avatar: null,
  },
  {
    id: 3,
    text: "His research on positive psychology interventions has directly influenced our department's approach to student wellbeing programs. Practical, evidence-based, and impactful.",
    author: "Prof. Kwame Asante",
    role: "Dean, Faculty of Education",
    institution: "University of Ghana",
    rating: 5,
    avatar: null,
  },
  {
    id: 4,
    text: "Dr. Victor brings a rare combination of rigorous methodology and genuine concern for human development. His work on entrepreneurship education is transforming lives.",
    author: "Dr. Fatima Bello",
    role: "Research Fellow",
    institution: "African Population and Health Research Center",
    rating: 5,
    avatar: null,
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    const id = setInterval(
      () => setCurrent((prev) => (prev + 1) % testimonials.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <Section size="lg" background="muted" id="testimonials">
      <Container>
        <SectionHeader
          title="Trusted by Colleagues & Students"
          subtitle="Testimonials"
          description="What peers, students, and collaborators say about working with Dr. Victor"
        />

        <div className="relative">
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ x: `-${current * 100}%` }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="h-full">
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FiStar key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <motion.p
                      className="text-lg md:text-xl text-slate-300 leading-relaxed mb-6 italic"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      "{testimonial.text}"
                    </motion.p>
                    <div className="border-t border-slate-800/50 pt-4">
                      <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-slate-100">{testimonial.author}</div>
                          <div className="text-sm text-slate-400">{testimonial.role}</div>
                          <div className="text-xs text-slate-500">{testimonial.institution}</div>
                        </div>
                      </motion.div>
                    </div>
                  </Card>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="ghost"
              size="sm"
              className="w-12 h-12 p-0"
              onClick={prev}
              aria-label="Previous testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronLeft className="w-5 h-5" />
            </Button>

            <div className="flex gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    current === index ? "bg-primary w-8" : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  onClick={() => setCurrent(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-selected={current === index}
                  role="tab"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="w-12 h-12 p-0"
              onClick={next}
              aria-label="Next testimonial"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}