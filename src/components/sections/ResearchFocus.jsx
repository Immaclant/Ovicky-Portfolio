import { motion } from "framer-motion";
import { FiHeart, FiUsers, FiBook, FiGlobe, FiTarget } from "react-icons/fi";
import { FaBrain } from "react-icons/fa";
import { Section, Container, SectionHeader } from "../ui/Section";
import { Card } from "../ui/Card";

const researchAreas = [
  {
    icon: FaBrain,
    title: "Educational Psychology",
    description: "Investigating cognitive and affective factors influencing learning outcomes, motivation, and academic adjustment across diverse populations.",
    topics: ["Motivation", "Self-Efficacy", "Academic Adjustment", "Learning Strategies"],
  },
  {
    icon: FiHeart,
    title: "Positive Psychology & Wellbeing",
    description: "Examining psychological well-being, resilience, and positive psychological interventions in educational and organizational contexts.",
    topics: ["Resilience", "Well-being", "Positive Interventions", "Mental Health"],
  },
  {
    icon: FiUsers,
    title: "Social Psychology in Education",
    description: "Studying social influences on student behavior, including peer pressure, family dynamics, and cultural factors.",
    topics: ["Peer Influence", "Family Dynamics", "Cultural Values", "Social Support"],
  },
  {
    icon: FiBook,
    title: "Entrepreneurship Education",
    description: "Developing and evaluating psychological training programs to foster entrepreneurial motivation and organizational success.",
    topics: ["Goal Setting", "Relational Intelligence", "Entrepreneurial Intention", "Business Success"],
  },
  {
    icon: FiGlobe,
    title: "Digital Technology & Learning",
    description: "Exploring the impact of digital technologies, social media, and AI on student engagement, anxiety, and academic performance.",
    topics: ["Social Media", "Digital Learning", "AI in Education", "Cyberbullying"],
  },
  {
    icon: FiTarget,
    title: "Inclusive Education",
    description: "Researching inclusive practices, teacher competence, and psychological support for students with diverse learning needs.",
    topics: ["Inclusive Practices", "Teacher Competence", "Special Needs", "Disability Inclusion"],
  },
];

export function ResearchFocus() {
  return (
    <Section size="lg" background="default" id="research">
      <Container>
        <SectionHeader
          title="Research Focus Areas"
          subtitle="Specializations"
          description="Interdisciplinary research at the intersection of psychology, education, and human development"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {researchAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.6 }}
            >
              <Card className="h-full group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <area.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100">{area.title}</h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">{area.description}</p>
                <div className="flex flex-wrap gap-2">
                  {area.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 text-xs rounded-full bg-slate-800/50 text-slate-400 border border-slate-700/50 hover:border-primary/50 hover:text-slate-200 transition-all"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}