import { motion } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";

const timelineData = [
  {
    year: "2024 – Present",
    title: "Senior Lecturer & Researcher",
    institution: "Federal College of Education (Special), Oyo, Nigeria",
    desc: "Lecturing in Counselling Psychology and Special Education, supervising graduate theses, and leading research on positive psychology interventions.",
  },
  {
    year: "2018 – 2024",
    title: "Lecturer I & Researcher",
    institution: "Federal College of Education (Special), Oyo, Nigeria",
    desc: "Delivered lecture modules in educational psychology and research methodologies. Published several peer-reviewed articles on adolescent behavior and substance abuse.",
  },
  {
    year: "2015 – 2018",
    title: "PhD in Counselling Psychology",
    institution: "University of Ibadan, Nigeria",
    desc: "Doctoral research on goal-setting, relational intelligence training models, and their efficacy in fostering academic and entrepreneurial motivation.",
  },
  {
    year: "2011 – 2014",
    title: "Master of Education (M.Ed.) in Counselling Psychology",
    institution: "University of Ibadan, Nigeria",
    desc: "Graduated with honours, focusing on student psychological adjustment, counseling methods, and socio-emotional crises.",
  },
];

const stats = [
  { number: "15+", label: "Years of Research" },
  { number: "80+", label: "Publications" },
  { number: "10+", label: "Years of Teaching" },
];

const affiliations = [
  "Counselling Association of Nigeria (CASSON)",
  "Positive Psychology Association of Nigeria (PoPAN)",
  "Teachers Registration Council of Nigeria (TRCN)",
];

function AboutBio() {
  return (
    <section className="bg-dark relative">
      {/* Giant decorative quote mark */}
      <div
        className="absolute top-0 left-8 font-serif text-[18rem] text-gold/[0.035] leading-none pointer-events-none select-none hidden lg:block"
        aria-hidden="true"
      >
        "
      </div>

      {/* ── BIO GRID ── */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 lg:gap-24 items-start">

        {/* Left — sticky */}
        <div className="lg:sticky lg:top-24">
          <p className="section-eyebrow">Biography</p>
          <h2 className="font-serif font-bold text-cream leading-snug mb-5" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}>
            Vision, Voice &amp; Vocation
          </h2>
          <div className="w-14 h-0.5 bg-gold mb-8" />

          {/* Stats */}
          <div className="space-y-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5 }}
              >
                <div className="font-serif font-black text-gold leading-none" style={{ fontSize: "clamp(2.4rem, 4vw, 3.2rem)" }}>
                  {s.number}
                </div>
                <div className="text-[0.72rem] text-cream-dim uppercase tracking-[0.12em] mt-1 font-semibold">
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Affiliations */}
          <div className="mt-10 pt-8 border-t border-cream-faint">
            <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gold font-bold mb-4">Professional Affiliations</p>
            <ul className="space-y-2">
              {affiliations.map((aff) => (
                <li key={aff} className="flex items-start gap-2 text-sm text-cream-dim font-light leading-relaxed">
                  <span className="w-1 h-1 rounded-full bg-gold mt-2 flex-shrink-0" />
                  {aff}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right — body text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="drop-cap text-cream-dim font-light leading-[1.95] text-[1.02rem]">
            Dr. Fehintola Victor A. is a dedicated researcher, writer, and lecturer specialising in Counselling Psychology and Special Education. Based at the Faculty of Education, Federal College of Education (Special), Oyo, Nigeria, his career is driven by a passion for exploring the socio-emotional development of adolescents, fostering resilience in educational settings, and pioneering positive psychological interventions.
          </p>
          <p className="text-cream-dim font-light leading-[1.95] text-[1.02rem]">
            Over the last decade, Dr. Fehintola has investigated critical psychological issues such as compassion fatigue among teachers, career decision-making self-efficacy, substance abuse prevention, and the impact of digital triggers on student anxiety. His empirical work draws on large-scale survey methodologies, experimental designs, and psychometric tools.
          </p>
          <p className="text-cream-dim font-light leading-[1.95] text-[1.02rem]">
            Beyond the lecture hall, he has contributed meaningfully to community advocacy — championing inclusive education policies, facilitating counseling workshops for secondary school students, and mentoring early-career researchers who go on to make their own mark in Nigerian academia and beyond.
          </p>
          <blockquote className="border-l-2 border-gold pl-5 italic text-cream text-base font-light leading-relaxed mt-8">
            "Academic success is inseparable from psychological well-being. By equipping educators and students with emotional intelligence, goal-setting capabilities, and relational resilience, we can nurture inclusive classrooms where every individual can thrive."
          </blockquote>
        </motion.div>
      </div>

      {/* ── CAREER TIMELINE ── */}
      <div className="bg-dark-2 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-12">
            <p className="section-eyebrow">Milestones</p>
            <h2 className="font-serif font-bold text-cream leading-tight" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)" }}>
              Education &amp; Career Roadmap
            </h2>
          </div>

          <div className="relative border-l border-cream-faint max-w-3xl pl-8 space-y-10">
            {timelineData.map((item, index) => (
              <motion.div
                key={item.year}
                className="relative"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {/* Bullet */}
                <div className="absolute -left-[2.65rem] top-1 flex h-6 w-6 items-center justify-center rounded-full bg-dark border-2 border-gold text-gold">
                  <FiBriefcase className="w-3 h-3" />
                </div>
                {/* Card */}
                <div className="expertise-card rounded-sm">
                  <span className="text-xs font-bold text-gold tracking-wide">{item.year}</span>
                  <h3 className="font-serif font-bold text-cream text-lg mt-1">{item.title}</h3>
                  <h4 className="text-xs text-cream-dim mt-0.5 font-medium">{item.institution}</h4>
                  <p className="text-cream-dim text-sm mt-3 leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutBio;
