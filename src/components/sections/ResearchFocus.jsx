import { FiHeart, FiUsers, FiBook, FiGlobe, FiTarget } from "react-icons/fi";
import { FaBrain } from "react-icons/fa";

const researchAreas = [
  {
    icon: FaBrain,
    ref: "PSY-01",
    title: "Educational Psychology",
    description: "Investigating cognitive and affective factors influencing learning outcomes, motivation, and academic adjustment.",
    topics: ["Motivation", "Self-Efficacy", "Academic Adjustment"],
  },
  {
    icon: FiHeart,
    ref: "PSY-02",
    title: "Positive Psychology",
    description: "Examining psychological well-being, resilience, and positive interventions in educational contexts.",
    topics: ["Resilience", "Well-being", "Interventions"],
  },
  {
    icon: FiUsers,
    ref: "SOC-01",
    title: "Social Psychology",
    description: "Studying social influences on student behavior, including peer pressure, family dynamics, and culture.",
    topics: ["Peer Influence", "Family Dynamics", "Culture"],
  },
  {
    icon: FiBook,
    ref: "EDU-01",
    title: "Entrepreneurship Edu",
    description: "Evaluating psychological training programs to foster entrepreneurial motivation and success.",
    topics: ["Goal Setting", "Relational Intelligence"],
  },
  {
    icon: FiGlobe,
    ref: "TECH-01",
    title: "Digital Learning",
    description: "Exploring the impact of digital technologies, social media, and AI on student engagement and anxiety.",
    topics: ["Social Media", "AI in Ed", "Cyberbullying"],
  },
  {
    icon: FiTarget,
    ref: "EDU-02",
    title: "Inclusive Education",
    description: "Researching inclusive practices, teacher competence, and support for students with diverse needs.",
    topics: ["Inclusive Practices", "Special Needs"],
  },
];

export function ResearchFocus() {
  return (
    <section className="section bg-manila" id="research">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <span className="folder-tab">Primary Domains</span>
          <h2 className="font-serif font-black text-ink tracking-tight uppercase border-b-4 border-ink pb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
            Research Focus Areas
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {researchAreas.map((area) => (
            <div key={area.ref} className="index-card interactive flex flex-col p-6 h-full">
              <div className="flex justify-between items-start border-b-2 border-ink pb-3 mb-4">
                <span className="font-mono text-xs font-bold text-ink-light">REF: {area.ref}</span>
                <area.icon className="w-5 h-5 text-ledger" />
              </div>
              
              <h3 className="font-serif font-bold text-ink text-xl uppercase mb-3 leading-tight">
                {area.title}
              </h3>
              
              <p className="text-ink-light text-sm leading-relaxed mb-6 flex-grow">
                {area.description}
              </p>
              
              <div className="mt-auto border-t-2 border-dashed border-ink pt-4">
                <div className="font-mono text-[10px] text-ink-light uppercase mb-2">Keywords</div>
                <div className="flex flex-wrap gap-2">
                  {area.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider bg-manila-dim border border-ink text-ink"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}