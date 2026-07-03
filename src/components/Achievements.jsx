import { motion } from "framer-motion";

const expertiseAreas = [
  {
    num: "01",
    title: "Counselling Psychology",
    desc: "Researching socio-emotional crises, resilience, and psychological well-being in educational and clinical settings across Nigeria.",
  },
  {
    num: "02",
    title: "Special Education",
    desc: "Advancing inclusive classroom practices and policies for learners with special needs, championing equitable educational outcomes.",
  },
  {
    num: "03",
    title: "Research Methodology",
    desc: "Designing rigorous empirical studies using psychometric tools, large-scale surveys, and experimental frameworks.",
  },
  {
    num: "04",
    title: "Community Advocacy",
    desc: "Facilitating counselling workshops, promoting mental health literacy, and mentoring early-career researchers across Oyo State.",
  },
];

function Achievements() {
  return (
    <section className="bg-dark py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-end justify-between mb-2">
          <div>
            <p className="section-eyebrow">What I Do</p>
            <h2 className="font-serif font-bold text-cream" style={{ fontSize: "clamp(1.8rem, 3vw, 2.2rem)" }}>
              Areas of Focus
            </h2>
          </div>
        </div>

        {/* Expertise Grid */}
        <div
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          style={{ border: "1px solid rgba(245,240,232,0.06)" }}
        >
          {expertiseAreas.map((area, i) => (
            <motion.div
              key={area.num}
              className="expertise-card"
              style={{
                borderRight: i < expertiseAreas.length - 1 ? "1px solid rgba(245,240,232,0.06)" : "none",
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <div className="text-[0.7rem] font-bold text-gold tracking-[0.2em] mb-5 opacity-70">
                {area.num}
              </div>
              <h3 className="font-serif font-bold text-cream text-[1.15rem] mb-3">
                {area.title}
              </h3>
              <p className="text-sm text-cream-dim font-light leading-[1.75]">
                {area.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Achievements;
