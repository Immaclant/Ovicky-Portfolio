import { motion } from "framer-motion";
import { FiBookOpen, FiFileText, FiAward, FiTrendingUp, FiUsers } from "react-icons/fi";
import { FaGraduationCap } from "react-icons/fa";
import { Section, Container, SectionHeader } from "../ui/Section";
import { Card } from "../ui/Card";

const achievements = [
  { icon: FiBookOpen, value: "80+", label: "Peer-Reviewed Publications", desc: "Journal articles, conference papers, and book chapters" },
  { icon: FaGraduationCap, value: "15+", label: "Years Teaching Experience", desc: "Undergraduate and graduate level instruction" },
  { icon: FiFileText, value: "50+", label: "Research Papers", desc: "Published in high-impact journals and conferences" },
  { icon: FiAward, value: "12+", label: "Awards & Honors", desc: "National and international recognition" },
  { icon: FiTrendingUp, value: "500+", label: "Citations", desc: "Google Scholar citation count" },
  { icon: FiUsers, value: "20+", label: "Graduate Students Supervised", desc: "Masters and PhD completions" },
];

export function Achievements() {
  return (
    <Section size="lg" background="muted" id="achievements">
      <Container>
        <SectionHeader
          title="Research & Teaching Excellence"
          subtitle="Achievements"
          description="A track record of scholarly impact and educational leadership spanning over a decade"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <achievement.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-slate-100">{achievement.value}</div>
                    <div className="text-sm text-primary font-medium">{achievement.label}</div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{achievement.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}